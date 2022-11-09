import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import moment from 'moment'
import type { FC } from 'react'
import {
	//Button,
	Paper,
	Container,
	Grid,
	Divider,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
//import Pagination from '@mui/lab/Pagination'
import { Pagination } from '@mui/material'
import Page from 'src/components/Page'
import type { Theme } from 'src/theme'
import Header from './Header'
import { fetchClubs, selectClubs } from 'src/slices/clubListSlice'

//import { ClubInfo } from 'src/__mocks__/clubs'
//import ClubPostCard from 'src/components/ClubPostCard'
import ClubCard from 'src/views/parent/ClubCard'
import CategoryBar from 'src/components/CategoryBar'
//import { QueryState } from 'src/types/querystate'
const PAGESIZE = 10 // number of clubs to be displayed
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	searchbar: {
		display: 'flex',
		flexDirection: 'row',
	},
	clubs: {
		display: 'flex',
		flexDirection: 'row',
	},
	subtitle: {
		marginTop: '10px',
		paddingBottom: '6px',
	},
	pagination: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: '12px',
	},
	result: {
		minHeight: '500px',
	},
}))

const DashboardView: FC = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { clubs, totalDocCount } = useSelector(selectClubs)
	const [query, setQuery] = useState({
		pageSize: PAGESIZE,
		pageNum: 1,
	})

	const handleSwitch = (event: any, value: number) => {
		event.preventDefault()
		dispatch(fetchClubs({ ...query, pageNum: value }))
		setQuery({ ...query, pageNum: value })
	}
	const handleSearch = (): void => {
		dispatch(fetchClubs({ ...query, pageNum: 1 }))
		setQuery({ pageSize: PAGESIZE, pageNum: 1 })
	}
	const sortedClubs = [...clubs]
	return (
		<Page className={classes.root} title='Club Finder'>
			<Container maxWidth={false}>
				<Header />
				<Paper className={classes.result}>
					<Grid container direction='row' alignItems='baseline'>
						<Typography variant='h5'> Choose </Typography>
						<CategoryBar search={handleSearch} />
					</Grid>
					<Divider style={{ marginTop: '10px' }} />
					<Typography className={classes.subtitle}> Search Result </Typography>
					<Grid container spacing={2}>
						{sortedClubs.map((club: any, index: number) => (
							<ClubCard key={club.clubid} club={club} index={1} />
						))}
					</Grid>

					{sortedClubs.length > 0 ? (
						<div className={classes.pagination}>
							<Pagination
								className={classes.pagination}
								count={Math.round(totalDocCount / PAGESIZE + 0.499) || 1}
								variant='outlined'
								shape='rounded'
								onChange={handleSwitch}
							/>
						</div>
					) : (
						<> </>
					)}
				</Paper>
			</Container>
		</Page>
	)
}

export default DashboardView
