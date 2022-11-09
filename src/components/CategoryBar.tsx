import { useState } from 'react'
import type { FC } from 'react'
import type { Theme } from 'src/theme'
import createStyles from '@mui/styles/createStyles'
import {
	Box,
	Chip,
	//Container,
	Button,
	FormControl,
	//TextField,
	Grid,
	Select,
	//Input,
	MenuItem,
	Checkbox,
	IconButton,
	ListItemText,
	InputLabel,
	Tooltip,
	//Typography,
	SvgIcon,
} from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'

import { SPORTSCate, ARTCate, STEMCate } from 'src/types/Category'
import { Plus as PlusIcon } from 'react-feather'
import { useDispatch, useSelector } from 'src/store'
import InputBase from '@mui/material/InputBase'
import { setQuery, selectQuery } from 'src/slices/clubListSlice'
import { QueryState } from 'src/types/querystate'
const BootstrapInput = withStyles((theme: Theme) =>
	createStyles({
		root: {
			'label + &': {
				marginTop: theme.spacing(3),
			},
		},
		input: {
			borderRadius: 4,
			position: 'relative',
			backgroundColor: theme.palette.background.paper,
			border: '1px solid #ced4da',
			fontSize: 16,
			padding: '6px 26px 6px 12px',
			transition: theme.transitions.create(['border-color', 'box-shadow']),
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'sans-serif',
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(','),
			'&:focus': {
				borderRadius: 4,
				borderColor: '#80bdff',
				boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
			},
		},
	})
)(InputBase)
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	/* 	subtitle: {
		marginTop: theme.spacing(2),
	}, */
	formControl: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(2),
		//marginBottom: theme.spacing(2),
		minWidth: 200,
		maxWidth: 250,
	},
	fontWeightMedium: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	input: {
		borderRadius: 8,
		position: 'relative',
		border: '1px solid #ced4da',
		fontSize: '16',
		padding: '10px 26px 10px 12px',
	},
	inputlabel: {
		marginTop: '15px',
		marginLeft: '5px',
	},
	tag: {
		'& + &': {
			marginLeft: theme.spacing(1),
			marginBottom: theme.spacing(1),
		},
		fontWeight: 'bold',
	},
	chips: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'baseline',
		flexWrap: 'wrap',
		marginLeft: '5px',
	},
	addTab: {},
	addMore: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(2),
		//marginBottom: theme.spacing(2),
		minWidth: 200,
		maxWidth: 250,
	},
	active: {
		width: '20px',
		height: '20px',
		borderRadius: '50%',
		backgroundColor: theme.palette.secondary.main,
		boxShadow: theme.shadows[10],
		color: theme.palette.secondary.contrastText,
	},
}))
type CateBarProp = {
	search: () => void
}
const CategoryBar: FC<CateBarProp> = (props: CateBarProp) => {
	const { search } = props
	const classes = useStyles()
	const query: QueryState = useSelector(selectQuery)
	const dispatch = useDispatch()
	const [allCate, setAllCate] = useState(query.clubCategories || [])
	const [sportsCate, setSportsCate] = useState(query.sportsCate || [])
	const [artCate, setArtCate] = useState(query.artCate || [])
	const [stemCate, setStemCate] = useState(query.stemCate || [])
	const [inputcate, setInputcate] = useState('')
	const [moreCate, setMoreCate] = useState(query.moreCate || [])
	//const dispatch = useDispatch()
	const handleSearch = () => {
		search()
	}

	return (
		<div>
			<Grid container direction='column'>
				<Grid item md={12}>
					<Box
						style={{
							display: 'flex',
							flexWrap: 'wrap',
							alignItems: 'baseline',
						}}
					>
						<FormControl className={classes.formControl}>
							<InputLabel
								id='demo-mutiple-checkbox-label'
								className={classes.inputlabel}
							>
								Sports Categories
							</InputLabel>
							<Select
								labelId='category-mutiple-checkbox-label'
								id='category-mutiple-checkbox'
								name='sportsCate'
								multiple
								value={sportsCate}
								onChange={(event) => {
									//console.log(event.target.value, values.category0)
									setSportsCate(event.target.value as Array<string>)
									setAllCate([
										...(event.target.value as Array<string>),
										...artCate,
										...stemCate,
										...moreCate,
									])
									dispatch(
										setQuery({
											clubCategories: [
												...(event.target.value as Array<string>),
												...artCate,
												...stemCate,
												...moreCate,
											],
											sportsCate: [...(event.target.value as Array<string>)],
										})
									)
								}}
								input={<BootstrapInput />}
								renderValue={(selected) => (selected as string[]).join(', ')}
								//MenuProps={MenuProps}
							>
								{SPORTSCate.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={sportsCate.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel
								id='demo-mutiple-checkbox-label'
								className={classes.inputlabel}
							>
								Art and Music
							</InputLabel>
							<Select
								labelId='category-mutiple-checkbox-label1'
								id='category-mutiple-checkbox1'
								name='artCate'
								multiple
								value={artCate}
								onChange={(event) => {
									//console.log(event.target.value, values.category)
									setArtCate(event.target.value as Array<string>)
									setAllCate([
										...sportsCate,
										...(event.target.value as Array<string>),
										...stemCate,
										...moreCate,
									])
									dispatch(
										setQuery({
											clubCategories: [
												...sportsCate,
												...(event.target.value as Array<string>),
												...stemCate,
												...moreCate,
											],
											artCate: [...(event.target.value as Array<string>)],
										})
									)
								}}
								input={<BootstrapInput />}
								renderValue={(selected) => (selected as string[]).join(', ')}
								MenuProps={MenuProps}
							>
								{ARTCate.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={artCate.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel
								id='demo-mutiple-checkbox-label'
								className={classes.inputlabel}
							>
								Science and Tech
							</InputLabel>
							<Select
								labelId='category-mutiple-checkbox-label2'
								id='category-mutiple-checkbox2'
								name='stemCate'
								multiple
								value={stemCate}
								onChange={(event) => {
									//console.log(event.target.value, values.category1)
									setStemCate(event.target.value as Array<string>)
									setAllCate([
										...sportsCate,
										...(event.target.value as Array<string>),

										...artCate,
										...moreCate,
									])
									dispatch(
										setQuery({
											clubCategories: [
												...sportsCate,
												...(event.target.value as Array<string>),

												...artCate,
												...moreCate,
											],
											stemCate: [...(event.target.value as Array<string>)],
										})
									)
								}}
								input={<BootstrapInput />}
								renderValue={(selected) => (selected as string[]).join(', ')}
								MenuProps={MenuProps}
							>
								{STEMCate.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={stemCate.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl className={classes.addMore}>
							<InputLabel
								id='demo-mutiple-checkbox-label3'
								className={classes.inputlabel}
							>
								Add more category
							</InputLabel>
							<BootstrapInput
								name='moreCate'
								//label='Or Add More Category'
								//variant='outlined'
								value={inputcate}
								onChange={(event) => {
									setInputcate(event.target.value)
								}}
							/>
							<Tooltip title='Add More'>
								<IconButton
									className={classes.addTab}
									onClick={() => {
										if (!inputcate) {
											return
										}

										setAllCate([
											...sportsCate,
											...artCate,
											...stemCate,
											...moreCate.concat(inputcate),
										])
										setMoreCate(moreCate.concat(inputcate))
										dispatch(
											setQuery({
												clubCategories: [
													...sportsCate,
													...artCate,
													...stemCate,
													...moreCate.concat(inputcate),
												],
												moreCate: [...moreCate.concat(inputcate)],
											})
										)
										setInputcate('')
									}}
								>
									<SvgIcon className={classes.active}>
										<PlusIcon />
									</SvgIcon>
								</IconButton>
							</Tooltip>
						</FormControl>

						<Button
							color='secondary'
							//disabled={isSubmitting}
							type='submit'
							sx={{ width: '100px', marginRight: '10px' }}
							variant='contained'
							size='medium'
							onClick={handleSearch}
						>
							SEARCH
						</Button>
					</Box>
					<Box mt={2} className={classes.chips}>
						{allCate && allCate.length > 0 && (
							<Button
								className={classes.addTab}
								variant='outlined'
								size='medium'
								sx={{ width: '100px', marginRight: '10px' }}
								onClick={() => {
									setAllCate([])
									setSportsCate([])
									setArtCate([])
									setStemCate([])
									setMoreCate([])
									setInputcate('')
									dispatch(
										setQuery({
											clubCategories: [],
											artCate: [],
											sportsCate: [],
											stemCate: [],
											moreCate: [],
										})
									)
								}}
							>
								CLEAR
							</Button>
						)}
						{allCate.map((tag, i) => (
							<Chip
								variant='outlined'
								key={i}
								label={tag}
								className={classes.tag}
								onDelete={() => {
									// rmeoving item from 5 cate states
									const newTags = allCate.filter((t) => t !== tag)
									const newartCate = artCate.filter((t) => t !== tag)
									const newsportsCate = sportsCate.filter((t) => t !== tag)
									const newstemCate = stemCate.filter((t) => t !== tag)
									const newmoreCate = moreCate.filter((t) => t !== tag)
									setArtCate(newartCate)
									setSportsCate(newsportsCate)
									setStemCate(newstemCate)
									setMoreCate(newmoreCate)
									setAllCate(newTags)
								}}
							/>
						))}
					</Box>
				</Grid>
			</Grid>
		</div>
	)
}
export default CategoryBar
