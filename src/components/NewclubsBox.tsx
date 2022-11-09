import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ClubCard from 'src/views/parent/ClubCard'
import { makeStyles } from '@mui/styles'
import {
	Pagination,
	Paper,
	Grid,
	Typography,
	// SvgIcon,
	// InputAdornment,
	// IconButton,
	//TextField,
} from '@mui/material'
//import { Search as SearchIcon } from 'react-feather'
import type { Theme } from 'src/theme'
//import { styled } from '@mui/material/styles'
//import type { ClubSimInfo } from 'src/types/clubinfo'
import {
	//fetchClubs,
	getNewclubs,
	selectNewclubs,
} from 'src/slices/clubListSlice'
//import { setQuery } from 'src/slices/clubListSlice'
const PAGESIZE = 5 // number of clubs to be displayed
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
		marginBottom: '5px',
		//minHeight: '500px',
		//backgroundColor: theme.palette.background.default,
	},
}))
interface Props {
	className?: string
}

/* const RoundTextField = styled(TextField)({
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderRadius: '4px',
		},
	},
}) */
const NewclubsBox: FC<Props> = (props: Props) => {
	// set default value if it is undefined
	//const { className } = props
	const dispatch = useDispatch()
	const newclubs = useSelector(selectNewclubs)

	const [query, updateQuery] = useState({
		pageSize: PAGESIZE,
		pageNum: 1,
	})
	const totalDocCount = 5
	const classes = useStyles()
	const handleSwitchPage = (event: any, value: number) => {
		event.preventDefault()
		//console.log(value)

		dispatch(getNewclubs({ ...query, pageNum: value }, true))
		updateQuery({ ...query, pageNum: value })
	}
	useEffect(() => {
		dispatch(getNewclubs({ ...query, pageNum: query.pageNum }))
	}, [dispatch])

	const sortedClubs = [...newclubs]
	return (
		<Paper className={classes.result}>
			<Typography className={classes.subtitle}> Just Posted Clubs </Typography>
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
						onChange={handleSwitchPage}
					/>
				</div>
			) : (
				<> </>
			)}
		</Paper>
	)
}
export default NewclubsBox
