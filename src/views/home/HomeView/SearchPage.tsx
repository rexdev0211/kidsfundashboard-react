import { useState } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryBar from 'src/components/CategoryBar'
import ClubCard from 'src/views/parent/ClubCard'
import { makeStyles } from '@mui/styles'
import {
	Pagination,
	Paper,
	Grid,
	Divider,
	Typography,
	SvgIcon,
	InputAdornment,
	IconButton,
	TextField,
} from '@mui/material'
import { Search as SearchIcon } from 'react-feather'
import type { Theme } from 'src/theme'
import type { ClubInfo } from 'src/types/clubinfo'
import { styled } from '@mui/material/styles'
//import type { ClubSimInfo } from 'src/types/clubinfo'
import { fetchClubs, selectClubs } from 'src/slices/clubListSlice'
import { setQuery } from 'src/slices/clubListSlice'
const PAGESIZE = 20 // number of clubs to be displayed
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
		//backgroundColor: theme.palette.background.default,
	},
}))
interface SearchProps {
	className?: string
}

const RoundTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderRadius: '4px',
		},
	},
})
const SearchPage: FC<SearchProps> = (props: SearchProps) => {
	// set default value if it is undefined
	//const { className } = props
	const dispatch = useDispatch()
	const { clubs, totalDocCount }: { clubs: ClubInfo[]; totalDocCount: number } =
		useSelector(selectClubs)
	const [keywords, setKeywords] = useState('')
	const [query, updateQuery] = useState({
		pageSize: PAGESIZE,
		pageNum: 1,
	})
	const classes = useStyles()
	const handleSwitchPage = (event: any, value: number) => {
		event.preventDefault()
		//console.log(value)

		dispatch(fetchClubs({ ...query, pageNum: value }, true))
		updateQuery({ ...query, pageNum: value })
	}
	const handleSearch = (): void => {
		//console.log('searching ...')
		dispatch(fetchClubs({ ...query, pageNum: 1 }, true)) // fetch from public list api
		updateQuery({ pageSize: PAGESIZE, pageNum: 1 })
	}
	const updateKeywords = (keywords): void => {
		//console.log('searching ...', keywords)
		setKeywords(keywords)
	}
	const clearKeywords = (): void => {
		//console.log('clearing ')
		setKeywords('')
	}
	const keywordInput = () => {
		return (
			<div>
				<RoundTextField
					sx={{ minWidth: '360px', ml: '10px', borderRadius: '25px' }}
					id='textsearch'
					label='Search for clubs, and fun classes'
					size='small'
					type='search'
					onChange={(event) => updateKeywords(event.target.value)}
					onClick={() => clearKeywords()}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton
									onClick={() => {
										//console.log(keywords)
										dispatch(
											setQuery({
												text: keywords,
											})
										)
										handleSearch()
									}}
								>
									<SvgIcon fontSize='small' color='primary'>
										<SearchIcon />
									</SvgIcon>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</div>
		)
	}

	const sortedClubs = [...clubs]
	return (
		<Paper className={classes.result}>
			<Grid container direction='column' alignItems='baseline'>
				<Grid item xs={12} sm={12}>
					{keywordInput()}
				</Grid>
				<Grid item xs={12} sm={12} mt={1}>
					<Typography variant='h6'> Or choose </Typography>
					<CategoryBar search={handleSearch} />
				</Grid>
			</Grid>
			<Divider style={{ marginTop: '10px' }} />
			{sortedClubs.length > 0 && (
				<Typography className={classes.subtitle}> Search Result </Typography>
			)}
			<Grid container spacing={2}>
				{sortedClubs.map((club: ClubInfo, index: number) => (
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
						onChange={handleSwitchPage}
					/>
				</div>
			) : (
				<> </>
			)}
		</Paper>
	)
}
export default SearchPage
