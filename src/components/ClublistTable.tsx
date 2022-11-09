// This component is used to display hosted club table.
// The content is fetched from backend server through clubinfoSlice.
import { useState } from 'react'
import type { FC, ChangeEvent, MouseEvent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
//import numeral from 'numeral'
//import PropTypes from 'prop-types'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {
	Avatar,
	Box,
	Button,
	Card,
	Checkbox,
	Divider,
	IconButton,
	Link,
	SvgIcon,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Tabs,
	TextField,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Edit as EditIcon } from 'react-feather'
import type { Theme } from 'src/theme'
import getInitials from 'src/utils/getInitials'
import type { ClubSimInfo } from 'src/types/clubinfo'
import { getClubInfoData, deleteClub } from 'src/slices/clubinfoSlice'
import {
	selectUserProfileStatus,
	activateClub,
	deactiveClub,
} from 'src/slices/userprofileSlice'
import { useDispatch, useSelector } from 'src/store'

interface listTableProps {
	className?: string
	userrole?: string
	clublist: ClubSimInfo[]
}

type Sort = 'updatedAt|desc' | 'updatedAt|asc' | 'orders|desc' | 'orders|asc'

interface SortOption {
	value: Sort
	label: string
}

const tabs = [
	{
		value: 'all',
		label: 'All',
	},
]

const sortOptions: SortOption[] = [
	{
		value: 'updatedAt|desc',
		label: 'Last update (newest first)',
	},
	{
		value: 'updatedAt|asc',
		label: 'Last update (oldest first)',
	},
	/* 	{
		value: 'orders|desc',
		label: 'Total orders (high to low)',
	},
	{
		value: 'orders|asc',
		label: 'Total orders (low to high)',
	}, */
]

const applyPagination = (
	clublist: ClubSimInfo[],
	page: number,
	limit: number
): ClubSimInfo[] => {
	return clublist.slice(page * limit, page * limit + limit)
}

const descendingComparator = (
	a: ClubSimInfo,
	b: ClubSimInfo,
	orderBy: string
): number => {
	//console.log('a  is :', a)
	if (b[orderBy] < a[orderBy]) {
		return -1
	}

	if (b[orderBy] > a[orderBy]) {
		return 1
	}

	return 0
}

const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
	return order === 'desc'
		? (a: ClubSimInfo, b: ClubSimInfo) => descendingComparator(a, b, orderBy)
		: (a: ClubSimInfo, b: ClubSimInfo) => -descendingComparator(a, b, orderBy)
}

const applySort = (clublist: ClubSimInfo[], sort: Sort): ClubSimInfo[] => {
	const [orderBy, order] = sort.split('|') as [string, 'asc' | 'desc']
	const comparator = getComparator(order, orderBy)
	const stabilizedThis = clublist.map((el, index) => [el, index])

	stabilizedThis.sort((a, b) => {
		// @ts-ignore
		const order = comparator(a[0], b[0])

		if (order !== 0) return order

		// @ts-ignore
		return a[1] - b[1]
	})

	// @ts-ignore
	return stabilizedThis.map((el) => el[0])
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	queryField: {
		width: 500,
	},
	bulkOperations: {
		position: 'relative',
	},
	bulkActions: {
		paddingLeft: 4,
		paddingRight: 4,
		marginTop: 6,
		position: 'absolute',
		width: '100%',
		zIndex: 2,
		backgroundColor: theme.palette.background.default,
	},
	bulkAction: {
		marginLeft: theme.spacing(2),
	},
	avatar: {
		height: 42,
		width: 42,
		marginRight: theme.spacing(1),
	},
	category: {
		textTransform: 'capitalize',
	},
}))

const ClublistTable: FC<listTableProps> = ({
	className,
	clublist,
	userrole,

	...rest
}) => {
	const classes = useStyles()
	const [currentTab, setCurrentTab] = useState<string>('all')
	const [selectedClubs, setSelectedClubs] = useState<ClubSimInfo[]>([])
	const [page, setPage] = useState<number>(0)
	const [limit, setLimit] = useState<number>(10)
	const profileLoading = useSelector(selectUserProfileStatus)
	//if(userrole==='Parent')
	//const [profileLoading, setProfileLoading] = useState<boolean>(true)
	const dispatch = useDispatch()
	const [sort, setSort] = useState<Sort>(sortOptions[0].value)
	const [filters, setFilters] = useState<any>({
		hasAcceptedMarketing: null,
		isProspect: null,
		isReturning: null,
	})
	const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
		const updatedFilters = {
			...filters,
			hasAcceptedMarketing: null,
			isProspect: null,
			isReturning: null,
		}

		if (value !== 'all') {
			updatedFilters[value] = true
		}

		setFilters(updatedFilters)
		setSelectedClubs([])
		setCurrentTab(value)
	}

	const handleSortChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.persist()
		setSort(event.target.value as Sort)
	}

	const handleSelectAllCustomers = (
		event: ChangeEvent<HTMLInputElement>
	): void => {
		setSelectedClubs(
			[] // clear selection.
			//event.target.checked ? clublist.map((club) => club.clubid) :
		)
	}
	const onclickCancel = (event: MouseEvent<HTMLInputElement>): void => {
		// deselect all clubs.
		setSelectedClubs([])
	}
	const onclickDeactive = (event: MouseEvent<HTMLInputElement>): void => {
		// Deactive selected club
		event.preventDefault()
		//console.log('Deactive club:', selectedClubs)
		if (selectedClubs.length > 0 && selectedClubs[0].active) {
			dispatch(deactiveClub({ clubid: selectedClubs[0].clubid }))
		} else {
			dispatch(activateClub({ clubid: selectedClubs[0].clubid }))
		}
		setSelectedClubs([])
	}
	const onclickDelete = (event: MouseEvent<HTMLInputElement>): void => {
		// Deactive selected club
		event.preventDefault()
		//console.log('Delete club:', selectedClubs)
		if (
			selectedClubs.length > 0 &&
			selectedClubs[0].active &&
			userrole !== 'Parent'
		) {
			alert('Deactive a club first')
		} else {
			dispatch(deleteClub({ clubid: selectedClubs[0].clubid }))
			alert('The club is being deleted. Please refresh list to  see update.')
		}
		setSelectedClubs([])
	}
	const handleSelectOneClub = (
		event: ChangeEvent<HTMLInputElement>,
		club: ClubSimInfo
	): void => {
		if (selectedClubs.length > 0 && selectedClubs[0].clubid === club.clubid) {
			setSelectedClubs([])
		} else {
			setSelectedClubs([club])
		}

		// if (!selectedClubs.includes(club)) {
		// 	setSelectedClubs((prevSelected) => [club])
		// } else {
		// 	setSelectedClubs((prevSelected) =>
		// 		prevSelected.filter((id) => id !== club)
		// 	)
		// }
	}

	const handlePageChange = (event: any, newPage: number): void => {
		setPage(newPage)
	}

	const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setLimit(parseInt(event.target.value))
	}
	const onclickEdit = (clubid: string): void => {
		// get club info from server for edit form
		dispatch(getClubInfoData({ clubid }))
	}

	const sortedClubs = applySort(clublist, sort)
	const paginatedClubs = applyPagination(sortedClubs, page, limit)
	const enableBulkOperations = selectedClubs.length > 0
	const selectedSomeCustomers =
		selectedClubs.length > 0 && selectedClubs.length < clublist.length
	const selectedAllCustomers = selectedClubs.length === clublist.length
	// useEffect(() => {
	// 	if (isLoading) {
	// 		setProfileLoading(true)
	// 	} else {
	// 		setProfileLoading(false)
	// 	}
	// }, [isLoading])
	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<Tabs
				onChange={handleTabsChange}
				scrollButtons='auto'
				textColor='secondary'
				value={currentTab}
				variant='scrollable'
			>
				{tabs.map((tab) => (
					<Tab key={tab.value} value={tab.value} label={tab.label} />
				))}
			</Tabs>
			<Divider />
			<Box p={2} minHeight={56} display='flex' alignItems='center'>
				<Box flexGrow={1} />
				<TextField
					label='Sort By'
					name='sort'
					onChange={handleSortChange}
					select
					SelectProps={{ native: true }}
					value={sort}
					variant='outlined'
				>
					{sortOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</TextField>
			</Box>
			{enableBulkOperations && (
				<div className={classes.bulkOperations}>
					<div className={classes.bulkActions}>
						<Checkbox
							checked={selectedAllCustomers}
							indeterminate={selectedSomeCustomers}
							onChange={handleSelectAllCustomers}
						/>
						{userrole === 'Parent' ? null : (
							<Button
								variant='outlined'
								className={classes.bulkAction}
								onClick={onclickDeactive}
							>
								{selectedClubs.length > 0 && selectedClubs[0].active
									? 'Decctivate'
									: 'Activate'}
							</Button>
						)}
						<Button
							variant='outlined'
							className={classes.bulkAction}
							onClick={onclickDelete}
						>
							{'Delete'}
						</Button>
						<Button
							variant='outlined'
							className={classes.bulkAction}
							onClick={onclickCancel}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
			<PerfectScrollbar>
				<Box minWidth={700}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell padding='checkbox'>
									<Checkbox
										checked={selectedAllCustomers}
										indeterminate={selectedSomeCustomers}
										onChange={handleSelectAllCustomers}
									/>
								</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Location</TableCell>
								<TableCell align='right'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{profileLoading
								? null
								: paginatedClubs.map((club) => {
										const isCustomerSelected =
											selectedClubs.length > 0 &&
											selectedClubs[0].clubid === club.clubid

										return (
											<TableRow
												hover
												key={club.clubid}
												selected={isCustomerSelected}
											>
												<TableCell padding='checkbox'>
													<Checkbox
														checked={isCustomerSelected}
														onChange={(event) =>
															handleSelectOneClub(event, club)
														}
														value={isCustomerSelected}
													/>
												</TableCell>
												<TableCell>
													<Box display='flex' alignItems='center'>
														<Avatar
															className={classes.avatar}
															src={club.photoURL}
														>
															{getInitials(club.clubName)}
														</Avatar>
														<div>
															<Link
																className={classes.category}
																color='inherit'
																component={RouterLink}
																to={'/app/club/' + club.clubid}
																variant='h6'
															>
																{club.clubName}
															</Link>
														</div>
													</Box>
												</TableCell>
												<TableCell>
													{' '}
													<Typography className={classes.category}>
														{club.clubCategories.join(', ')}
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>
														{club.active ? 'Active' : 'Not Active'}
													</Typography>
												</TableCell>
												<TableCell>{`${club.city}, ${club.state}`}</TableCell>
												<TableCell align='right'>
													<IconButton
														component={RouterLink}
														to={
															(userrole === 'Parent'
																? '/app/parent/club/edit/'
																: '/app/host/club/edit/') + club.clubid
														}
														onClick={() => onclickEdit(club.clubid)}
													>
														<SvgIcon fontSize='small'>
															<EditIcon />
														</SvgIcon>
													</IconButton>
												</TableCell>
											</TableRow>
										)
								  })}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<TablePagination
				component='div'
				count={clublist.length}
				onPageChange={handlePageChange}
				onRowsPerPageChange={handleLimitChange}
				page={page}
				rowsPerPage={limit}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	)
}

//ListTable.propTypes = {
//	className: PropTypes.string,
//	customers: PropTypes.array.isRequired,
//}

//ListTable.defaultProps = {
//	customers: [],
//}

export default ClublistTable
