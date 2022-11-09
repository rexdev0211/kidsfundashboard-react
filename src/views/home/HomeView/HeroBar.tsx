//import React from 'react'
import { useRef, useState, useEffect } from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
	Button,
	Grid,
	Box,
	Link,
	//Menu,
	//MenuItem,
	//SvgIcon,
	IconButton,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import XIcon from 'src/icons/X'
//import { Calendar as CalendarIcon } from 'react-feather'
import LocationBar from 'src/components/LocationBar'
import { setQuery, selectQuery } from 'src/slices/clubListSlice'
//import type { QueryState } from 'src/types/querystate'
import { useSelector } from 'react-redux'
//import { toast } from 'react-toastify'
import { useDispatch } from 'src/store'
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
	const dispatch = useDispatch()
	const classes = useStyles()
	const [locQuery, savelocQuery] = useState(null)
	const location = localStorage.city
		? localStorage.state && localStorage.country
			? localStorage.city +
			  ' ' +
			  localStorage.state +
			  ', ' +
			  localStorage.country
			: localStorage.city + ', ' + localStorage.country
		: null

	console.log(location)
	const onSave = () => {
		if (inputRef.current) {
			//;(inputRef.current as any).clearLocation()
			console.log('Save location')
		}
	}
	const getLocation = useSelector(selectQuery)
	const inputRef = useRef()
	const onClear = () => {
		//toast('clearing location')
		//alert('clearing location')
		//savelocQuery()
		localStorage.city = ''
		localStorage.state = ''
		localStorage.country = ''
		dispatch(
			setQuery({
				city: '',
				state: '',
				country: '',
			})
		)
	}
	const onClickLocation = (location: string) => {
		dispatch(
			setQuery({
				city: location,
				state: 'CA',
				country: 'USA',
			})
		)
		localStorage.city = location
		localStorage.state = 'CA'
		localStorage.country = 'USA'
	}
	useEffect(() => {
		savelocQuery(getLocation)
	}, [getLocation, locQuery])
	return (
		<Grid
			container
			sx={{
				mt: '15px',
				boxShadow: '0px 3px 4px -4px #ACACAC',
				alignItems: 'flex-start',
			}}
			justifyContent='flex-start'
			className={clsx(classes.root, className)}
			{...rest}
		>
			<Grid item xs={12} sm={5} sx={{ mb: '50px' }}>
				<Typography
					variant='h3'
					color='textPrimary'
					style={{ marginLeft: '30px' }}
				>
					Find a fun club for your kids
				</Typography>
				<Typography
					variant='body1'
					color='textPrimary'
					style={{ marginLeft: '30px' }}
				>
					Try to find a perfect coach or club for your kid? Use our tool to
					search in your area.
				</Typography>
			</Grid>
			<Grid item xs={12} sm={7}>
				<Grid container>
					<Grid
						item
						xs={12}
						sm={2}
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
					{(location || (locQuery && locQuery.city && locQuery.country)) && (
						<Grid
							item
							xs={12}
							sm={4}
							style={{
								display: 'flex',
								flexWrap: 'nowrap',
								flexDirection: 'row',
								alignItems: 'center',
								marginLeft: '20px',
							}}
						>
							<Typography
								variant='h4'
								color='textPrimary'
								sx={{ marginLeft: '10px' }}
							>
								Location:{' '}
								{location
									? location
									: locQuery.state !== undefined
									? locQuery.city +
									  ', ' +
									  locQuery.state +
									  ', ' +
									  locQuery.country
									: locQuery.city + ', ' + locQuery.country}
							</Typography>

							<IconButton
								edge='end'
								sx={{ mt: '5px' }}
								color='secondary'
								onClick={() => onClear()}
							>
								<XIcon fontSize='small' />
							</IconButton>

							{false && (
								<Button
									color='secondary'
									type='submit'
									variant='contained'
									onClick={onSave}
									sx={{ maxHeight: '40px', marginLeft: '10px' }}
								>
									Save
								</Button>
							)}
						</Grid>
					)}
				</Grid>
				<Box sx={{ display: 'flex' }}>
					<Link
						color='primary'
						sx={{
							color: 'blue',
							marginLeft: '20px',
							textDecoration: 'underline',
							fontSize: '16px',
						}}
						to=''
						onClick={() => {
							onClickLocation('San Diego')
						}}
						component={RouterLink}
					>
						San Diego
					</Link>

					<Link
						color='primary'
						sx={{
							color: 'blue',
							marginLeft: '20px',
							textDecoration: 'underline',
							fontSize: '16px',
						}}
						to=''
						onClick={() => {
							onClickLocation('Los Angeles')
						}}
						component={RouterLink}
					>
						Los Angeles
					</Link>
				</Box>
			</Grid>
		</Grid>
	)
}

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
