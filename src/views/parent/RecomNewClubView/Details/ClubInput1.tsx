import { useState, useEffect } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import {
	Box,
	Button,
	Card,
	CardHeader,
	Divider,
	Grid,
	//InputLabel,
	InputAdornment,
	//FormControl,
	//OutlinedInput,
	FormHelperText,
	Typography,
	TextField,
	MenuItem,
	//FormControlLabel,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
//import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
//import PersonIcon from '@mui/icons-material/PersonOutline'
//import Checkbox from '@mui/material/Checkbox'
import type { Theme } from 'src/theme'
//import Label from 'src/components/Label'
//import type { Customer } from 'src/types/customer'
import CheckOptions from './CheckOptions'
import { useDispatch, useSelector } from 'src/store'
import {
	//saveClubInfoData,
	updateClubInfoData,
	selectClubInfo,
} from 'src/slices/clubinfoSlice'
interface ClubInput1Props {
	className?: string
	onNext?: () => void
	onBack?: (clubid: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),

			marginLeft: '0px',
		},
	},
	textRow: {
		alignItems: 'center',
		'& .MuiFormLabel-root': {
			color: 'black',
		},
	},
	note: {},
	box: {
		paddingTop: '10px',
		paddingBottom: '20px',
		paddingLeft: '10px',
		paddingRight: '20px',
		gap: '15px',
	},
	button: {
		paddingTop: '20px',
		paddingBottom: '20px',
		paddingLeft: '10px',
		paddingRight: '20px',
	},
	priceUnit: {
		width: '15ch',
	},
	fontWeightMedium: {
		fontWeight: theme.typography.fontWeightMedium,
	},
}))

/* const classInfo = {
	studentAge: {
		ageMin: 3,
		ageMax: 99,
	},
	gender: { boy: false, girl: false },
	onelineClass: false,
	freetrialClass: false,
	classLevelOffered: {
		beginnerClass: false,
		IntermediateClass: false,
		advancedClass: false,
	},
	privateClass: false,
	classSize: {
		classSizeMin: 1, // main contact person name
		classSizeMax: 1,
	},
	tuituionRange: {
		priceMin: 0,
		priceMax: 0,
		priceUnit: 'per class', // 'per month' 'per week' or 'per year'
	},
	otherCost: '',
} */

const priceUnit = [
	{
		value: 'once',
		label: 'per class',
	},
	{
		value: 'hour',
		label: 'per hour',
	},
	{
		value: 'week',
		label: 'per week',
	},
	{
		value: 'month',
		label: 'per month',
	},
	{
		value: 'year',
		label: 'per year',
	},
]

const ClubInput1: FC<ClubInput1Props> = ({
	onBack,
	onNext,
	className,
	...rest
}) => {
	const classes = useStyles()
	let clubInfo = useSelector(selectClubInfo)
	const [clubid, setClubid] = useState('')
	const dispatch = useDispatch()
	useEffect(() => {
		setClubid(clubInfo.clubid)
	}, [clubInfo.clubid])
	return (
		<Formik
			initialValues={{
				ageMin: clubInfo.ageMin,
				ageMax: clubInfo.ageMin,
				boy: clubInfo.boy,
				girl: clubInfo.girl,
				onlineClass: clubInfo.onlineClass,
				freetrialClass: clubInfo.freetrialClass,
				beginnerClass: clubInfo.beginnerClass,
				intermediateClass: clubInfo.intermediateClass,
				advancedClass: clubInfo.advancedClass,
				privateClass: clubInfo.privateClass,
				classSizeMin: clubInfo.classSizeMin, // main contact person name
				classSizeMax: clubInfo.classSizeMax,
				priceMin: clubInfo.priceMin,
				priceMax: clubInfo.priceMax,
				currency: clubInfo.priceCurrency,
				priceUnit: clubInfo.priceUnit, // 'per month' 'per week' or 'per year'
				otherCost: clubInfo.otherCost,

				submit: null,
			}}
			validationSchema={Yup.object().shape({
				ageMin: Yup.number()
					.min(3, 'Must be at least 3 ')
					.max(99)
					.required('Required'),
				ageMax: Yup.number().min(3, 'Must be at least 3 ').max(99),
				//.required('Required'),
				priceMin: Yup.number().min(0).required('Required'),
				priceMax: Yup.number().min(0),
				priceUnit: Yup.string().min(4).required('Required'),
			})}
			onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
				try {
					// Call API to store step data in server session
					// It is important to have it on server to be able to reuse it if user
					// decides to continue later.

					dispatch(updateClubInfoData({ ...values, clubid }))
					//alert(JSON.stringify(values, null, 2))
					setStatus({ success: true })
					setSubmitting(false)

					if (onNext) {
						onNext()
					}
				} catch (err) {
					console.error(err)
					setStatus({ success: false })
					setErrors({ submit: err.message })
					setSubmitting(false)
				}
			}}
		>
			{({
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting,
				setFieldValue,
				setFieldTouched,
				touched,
				values,
			}) => (
				<Card className={clsx(classes.root, className)} {...rest}>
					<CardHeader title='Offered Classes' />

					<form
						onSubmit={handleSubmit}
						className={clsx(classes.root, className)}
						{...rest}
					>
						<Grid
							container
							className={clsx(classes.box, className)}
							spacing={1}
						>
							<Grid item md={12}>
								<Typography
									variant='body1'
									color='inherit'
									className={classes.note}
								>
									Field with * is required. Please select options that apply and
									help parents to find your club easily.
								</Typography>
							</Grid>
						</Grid>
						{/* 				<FormControlLabel
					control={
						<Checkbox
							checked={state.boy}
							onChange={handleChange}
							name='boy'
							color='primary'
						/>
					}
					label='Primary'
				/> */}

						<Box className={clsx(classes.box, className)}>
							<Grid container className={classes.textRow}>
								<Grid item sm={3} xs={12}>
									<Typography
										variant='body1'
										color='inherit'
										className={classes.root}
									>
										Student Age Preference (years)
									</Typography>
								</Grid>

								<Grid item sm={9} xs={12}>
									<TextField
										error={Boolean(touched.ageMin && errors.ageMin)}
										helperText={touched.ageMin && errors.ageMin}
										label='Minimum Age*'
										name='ageMin'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.ageMin}
										variant='outlined'
										margin='dense'
									/>
									<TextField
										error={Boolean(touched.ageMax && errors.ageMax)}
										helperText={touched.ageMax && errors.ageMax}
										label='Maximum Age'
										name='ageMax'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.ageMax}
										variant='outlined'
										margin='dense'
									/>
								</Grid>
							</Grid>
							<CheckOptions
								checklist={[
									{ checked: values.boy, name: 'boy', label: 'Boy' },
									{ checked: values.girl, name: 'girl', label: 'Girl' },
								]}
								handleChange={handleChange}
								label='Student Gender'
							/>

							<CheckOptions
								checklist={[
									{
										checked: values.onlineClass,
										name: 'onlineClass',
										label: 'Yes',
									},
								]}
								handleChange={handleChange}
								label='If online class offered'
							/>
							<CheckOptions
								checklist={[
									{
										checked: values.beginnerClass,
										name: 'beginnerClass',
										label: 'Beginner Class',
									},
									{
										checked: values.intermediateClass,
										name: 'intermediateClass',
										label: 'Intermediate Class',
									},
									{
										checked: values.advancedClass,
										name: 'advancedClass',
										label: 'Advanced Class',
									},
								]}
								handleChange={handleChange}
								label='Class Level Offered'
							/>
							<CheckOptions
								checklist={[
									{
										checked: values.privateClass,
										name: 'privateClass',
										label: 'Yes',
									},
								]}
								handleChange={handleChange}
								label='If private class offered'
							/>
							<CheckOptions
								checklist={[
									{
										checked: values.freetrialClass,
										name: 'freetrialClass',
										label: 'Yes',
									},
								]}
								handleChange={handleChange}
								label='If free trial class offered'
							/>

							<Grid container className={classes.textRow}>
								<Grid item sm={3} xs={12}>
									<Typography
										variant='body1'
										color='inherit'
										className={classes.root}
									>
										price Range *
									</Typography>
								</Grid>

								<Grid item sm={9} xs={12}>
									<TextField
										error={Boolean(touched.priceMin && errors.priceMin)}
										helperText={
											touched.priceMin && errors.priceMin && 'Numbers only'
										}
										label='From*'
										name='priceMin'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.priceMin}
										variant='outlined'
										margin='dense'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>$</InputAdornment>
											),
										}}
									/>
									<TextField
										error={Boolean(touched.priceMax && errors.priceMax)}
										helperText={
											touched.priceMax && errors.priceMax && 'Numbers only'
										}
										label='To'
										name='priceMax'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.priceMax}
										variant='outlined'
										margin='dense'
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>$</InputAdornment>
											),
										}}
									/>
									<TextField
										name='priceUnit'
										select
										label='price unit*'
										value={values.priceUnit}
										onChange={handleChange}
										error={Boolean(touched.priceUnit && errors.priceUnit)}
										helperText={
											touched.priceUnit &&
											errors.priceUnit &&
											'Please select your price unit'
										}
										variant='outlined'
										margin='dense'
										className={classes.priceUnit}
									>
										{priceUnit.map((option) => (
											<MenuItem key={option.value} value={option.label}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								</Grid>
							</Grid>
						</Box>
						{null && (
							<Box mt={2}>
								<FormHelperText error>{errors}</FormHelperText>
							</Box>
						)}
						<Divider variant='middle' />
						<Box display='flex' flexDirection='row' className={classes.button}>
							{onBack && (
								<Button
									onClick={() => {
										onBack(clubid)
									}}
									color='secondary'
									variant='contained'
									size='medium'
								>
									Previous
								</Button>
							)}
							<Box flexGrow={1} />
							<div>
								<Button
									color='secondary'
									disabled={isSubmitting}
									type='submit'
									variant='contained'
									size='large'
								>
									Next
								</Button>
							</div>
						</Box>
					</form>
				</Card>
			)}
		</Formik>
	)
}

ClubInput1.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	//customer: PropTypes.object.isRequired,
}

export default ClubInput1
