//import React from 'react'
import { useRef } from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
	Breadcrumbs,
	Button,
	Grid,
	Link,
	//Menu,
	//MenuItem,
	//SvgIcon,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
//import { Calendar as CalendarIcon } from 'react-feather'
import LocationBar from 'src/components/LocationBar'
import { selectQuery } from 'src/slices/clubListSlice'
import { useSelector } from 'react-redux'
//import { useEffect } from 'hoist-non-react-statics/node_modules/@types/react'

interface HeaderProps {
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
	topbar: {
		paddingBottom: '30px',
	},
	locationbar: {
		paddingLeft: '50px',
	},
}))

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
	const classes = useStyles()
	//const [location, saveLocation] = useState('')
	const onClear = () => {
		if (inputRef.current) {
			;(inputRef.current as any).clearLocation()
		}
	}
	const locQuery = useSelector(selectQuery)
	const inputRef = useRef()

	return (
		<Grid
			container
			spacing={3}
			justifyContent='flex-start'
			className={clsx(classes.root, className)}
			{...rest}
		>
			<Grid
				container
				alignItems={'flex-end'}
				className={classes.topbar}
				direction='row'
			>
				<Grid item xs={12} sm={12}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize='small' />}
						aria-label='breadcrumb'
					>
						<Link
							variant='body1'
							color='inherit'
							to='/app'
							sx={{ marginLeft: '10px' }}
							component={RouterLink}
						>
							Dashboard
						</Link>
						<Typography variant='body1' color='textPrimary'>
							Search Clubs
						</Typography>
					</Breadcrumbs>
					<Grid
						container
						direction='row'
						alignItems={'flex-end'}
						sx={{ alignItems: 'center' }}
						//justifyContent={'space-evenly'}
					>
						<Grid item xs={12} sm={3}>
							<Typography
								variant='h3'
								color='textPrimary'
								style={{ width: '150px', marginLeft: '10px' }}
							>
								Club List
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}
							style={{
								display: 'flex',
								flexWrap: 'nowrap',
								flexDirection: 'row',
								alignItems: 'flex-end',
								marginLeft: '20px',
							}}
						>
							<LocationBar ref={inputRef} />
						</Grid>
						{locQuery && locQuery.city && locQuery.country && (
							<Grid
								item
								xs={12}
								sm={4}
								style={{
									display: 'flex',
									flexWrap: 'nowrap',
									flexDirection: 'row',
									alignItems: 'flex-end',
									marginLeft: '20px',
								}}
							>
								<Typography
									variant='h4'
									color='textPrimary'
									sx={{ marginLeft: '10px' }}
								>
									Location:{' '}
									{locQuery.state !== undefined
										? locQuery.city +
										  ', ' +
										  locQuery.state +
										  ', ' +
										  locQuery.country
										: locQuery.city + ', ' + locQuery.country}
								</Typography>
								{false && (
									<Button
										color='secondary'
										type='submit'
										variant='contained'
										onClick={onClear}
										sx={{ maxHeight: '40px', marginLeft: '10px' }}
									>
										Save
									</Button>
								)}
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
