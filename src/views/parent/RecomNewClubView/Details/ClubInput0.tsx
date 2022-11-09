import { useState } from 'react'
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
	TextField,
	Divider,
	Grid,
	Select,
	Chip,
	FormControl,
	InputLabel,
	Input,
	MenuItem,
	Checkbox,
	ListItemText,
	IconButton,
	SvgIcon,
	FormHelperText,
	InputAdornment,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'src/store'
import {
	registerClubInfoData,
	selectClubInfo,
	updateClubInfoData,
} from 'src/slices/clubinfoSlice'
import RadioOptions from './RadioOptions'
import {
	selectUser,
	selectUserProfileStatus,
} from 'src/slices/userprofileSlice'
import { ARTCate, SPORTSCate, STEMCate } from 'src/types/Category'
//https://stackoverflow.com/questions/49522347/yup-validation-with-two-fields-related

//import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
//import PersonIcon from '@mui/icons-material/PersonOutline'
import type { Theme } from 'src/theme'
//import Label from 'src/components/Label'
//import type { Customer } from 'src/types/customer'

import {
	Plus as PlusIcon,
	Instagram as InstaIcon,
	Facebook,
} from 'react-feather'
interface ClubInput0Props {
	className?: string
	title?: string // 'create' or 'edit'. ediit will use patch
	onNext?: () => void
	onBack?: () => void
	isNewclub?: boolean
}
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
const category = SPORTSCate
const category0 = ARTCate
const category1 = STEMCate
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
		fontSize: '12px',
	},
	subtitle: {
		marginTop: theme.spacing(2),
	},
	note: {},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
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
	formControl: {
		marginTop: theme.spacing(1),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(2),
		marginBottom: theme.spacing(1),
		minWidth: 200,
		maxWidth: 300,
		//fontSize: '12px',
	},
	fontWeightMedium: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
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
	},
	addTab: {},
	addMore: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: theme.spacing(1),
		marginBottom: theme.spacing(2),
		minWidth: 300,
		maxWidth: 300,
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

const ClubInput0: FC<ClubInput0Props> = ({
	onBack,
	onNext,
	title,
	className,
	isNewclub,
	...rest
}) => {
	let clubInfo = useSelector(selectClubInfo)

	const user = useSelector(selectUser)
	const isLoading = useSelector(selectUserProfileStatus)
	var userRole = user.role
	console.log('user role:', user.role)

	const InitialValue = {
		clubName: '',
		registerRole: userRole, // user.role || 'Parent',
		clubCategories: [],
		category: [],
		category0: [],
		category1: [],
		category2: [],
		streetAddress: '',
		city: '',
		state: '',
		postalCode: '',
		country: 'United States',
		description: '',
		clubContactName: '', // main contact person name
		clubEmail: userRole === 'Owner' ? user.email : '',
		clubPhone: '',
		socialLink1: '',
		socialLink2: '',
		socialLink3: '',
		clubid: '',
		submit: null,
	}
	const classes = useStyles()

	const clubid = clubInfo.clubid || ''
	const dispatch = useDispatch()
	const [activity, setActivity] = useState<string>('')
	const initValues = isNewclub ? InitialValue : null
	return !isLoading && user.role ? (
		<Formik
			initialValues={
				initValues || {
					clubName: clubInfo.clubName || '',
					registerRole: clubInfo.registerRole || user.role,
					clubCategories: clubInfo.clubCategories || [],
					category: clubInfo.category || [],
					category0: clubInfo.category0 || [],
					category1: clubInfo.category1 || [],
					category2: clubInfo.category2 || [],
					streetAddress: clubInfo.streetAddress || '',
					city: clubInfo.city || '',
					state: clubInfo.state || '',
					postalCode: clubInfo.postalCode || '',
					country: clubInfo.country || 'United States',
					description: clubInfo.description || '',
					clubContactName: clubInfo.clubContactName || '', // main contact person name
					clubEmail: clubInfo.clubEmail || '',
					clubPhone: clubInfo.clubPhone || '',
					socialLink1: clubInfo.socialLink1 || '',
					socialLink2: clubInfo.socialLink2 || '',
					socialLink3: clubInfo.socialLink3 || '',
					clubid: clubInfo.clubid || '',
					submit: null,
				}
			}
			validationSchema={Yup.object().shape({
				clubName: Yup.string().min(3, 'Must be at least 3 characters').max(255),
				//.required('Required'),
				clubEmail: Yup.string().email().required('Required'),
				city: Yup.string().required('Required'),
				state: Yup.string().required('Required'),
				postalCode: Yup.string().required('Required'),
				clubCategories: Yup.array().of(Yup.string()).required('required'), // Yup.lazy(val=> (Array.isArray(val) ? Yup.array().of(Yup.string()): Yup.string())),
			})}
			onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
				try {
					// Call API to store step data in server session
					// It is important to have it on server to be able to reuse it if user
					// decides to continue later.

					if (title === 'Create A Club') {
						await dispatch(registerClubInfoData(values))

						//console.log(result)
						//throw new Error('Server response failed')
					} else {
						await dispatch(updateClubInfoData({ ...values, clubid }))
					}

					//alert(JSON.stringify(values, null, 2))
					setStatus({ success: true })
					setSubmitting(false)

					if (onNext) {
						onNext()
					}
				} catch (err) {
					console.error('caught an error!', err)
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
					<CardHeader title='Club Info' />

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
									variant='subtitle2'
									color='inherit'
									className={classes.note}
								>
									Field with * is required. Please select options that apply and
									help parents to find your club easily.
								</Typography>
							</Grid>
							<Grid item md={12}>
								<RadioOptions
									radiolist={[
										{
											checked: true,
											name: 'registerRole',
											label: values.registerRole,
										},
									]}
									handleChange={handleChange}
									label='Recommend As'
								/>

								<TextField
									error={Boolean(touched.clubName && errors.clubName)}
									fullWidth
									helperText={touched.clubName && errors.clubName}
									label='Club Name*'
									name='clubName'
									size='small'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.clubName}
									variant='outlined'
									margin='dense'
								/>
								{/* 								<TextField
									error={Boolean(touched.category && errors.category)}
									fullWidth
									helperText={touched.category && errors.category}
									label='Class Offered by Club *'
									name='category'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.category}
									variant='outlined'
									margin='dense'
									disabled={true}
								/> */}
								<Typography
									variant='h6'
									color='inherit'
									className={clsx(classes.root, classes.subtitle)}
								>
									Classes Offered*
								</Typography>
								{(touched.category ||
									touched.category0 ||
									touched.category1 ||
									touched.category2) &&
									errors.clubCategories && (
										<Typography
											variant='caption'
											color='error'
											className={classes.note}
										>
											Choose one of the catetegories or add your own category.
											This field is required.
										</Typography>
									)}
								<Box>
									<FormControl className={classes.formControl}>
										<InputLabel id='demo-mutiple-checkbox-label'>
											Sports Category
										</InputLabel>
										<Select
											labelId='category-mutiple-checkbox-label'
											id='category-mutiple-checkbox'
											name='category'
											multiple
											value={values.category}
											onChange={(event) => {
												//console.log(event.target.value, values.category0)
												setFieldValue(
													'clubCategories',
													(event.target.value as Array<string>).concat(
														values.category0,
														values.category1,
														values.category2
													)
												)
												handleChange(event)
											}}
											input={<Input />}
											renderValue={(selected) =>
												(selected as string[]).join(', ')
											}
											//MenuProps={MenuProps}
										>
											{category.map((name) => (
												<MenuItem key={name} value={name}>
													<Checkbox
														checked={values.category.indexOf(name) > -1}
													/>
													<ListItemText primary={name} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel id='demo-mutiple-checkbox-label'>
											Art and Music
										</InputLabel>
										<Select
											labelId='category-mutiple-checkbox-label1'
											id='category-mutiple-checkbox1'
											name='category0'
											multiple
											value={values.category0}
											onChange={(event) => {
												//console.log(event.target.value, values.category)
												setFieldValue(
													'clubCategories',
													(event.target.value as Array<string>).concat(
														values.category,
														values.category1,
														values.category2
													)
												)
												handleChange(event)
											}}
											input={<Input />}
											renderValue={(selected) =>
												(selected as string[]).join(', ')
											}
											MenuProps={MenuProps}
										>
											{category0.map((name) => (
												<MenuItem key={name} value={name}>
													<Checkbox
														checked={values.category0.indexOf(name) > -1}
													/>
													<ListItemText primary={name} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<FormControl className={classes.formControl}>
										<InputLabel id='demo-mutiple-checkbox-label'>
											Science and Tech
										</InputLabel>
										<Select
											labelId='category-mutiple-checkbox-label2'
											id='category-mutiple-checkbox2'
											name='category1'
											multiple
											value={values.category1}
											onChange={(event) => {
												console.log(event.target.value, values.category1)
												setFieldValue(
													'clubCategories',
													(event.target.value as Array<string>).concat(
														values.category2,
														values.category0,
														values.category
													)
												)
												handleChange(event)
											}}
											input={<Input />}
											renderValue={(selected) =>
												(selected as string[]).join(', ')
											}
											MenuProps={MenuProps}
										>
											{category1.map((name) => (
												<MenuItem key={name} value={name}>
													<Checkbox
														checked={values.category1.indexOf(name) > -1}
													/>
													<ListItemText primary={name} />
												</MenuItem>
											))}
										</Select>
									</FormControl>
									<FormControl className={classes.addMore}>
										<TextField
											name='category2'
											label='Or Add More Category'
											variant='standard'
											size='small'
											value={activity}
											onChange={(event) => setActivity(event.target.value)}
										/>
										<IconButton
											className={classes.addTab}
											onClick={() => {
												if (!activity) {
													return
												}

												setFieldValue('category2', [
													...values.category2,
													activity,
												])
												setFieldValue('clubCategories', [
													...values.clubCategories,
													activity,
												])
												setActivity('')
											}}
										>
											<SvgIcon className={classes.active}>
												<PlusIcon />
											</SvgIcon>
										</IconButton>
									</FormControl>
								</Box>
								<Box mt={2} className={classes.chips}>
									{values.clubCategories.map((tag, i) => (
										<Chip
											variant='outlined'
											key={i}
											label={tag}
											className={classes.tag}
											onDelete={() => {
												const newTags = values.clubCategories.filter(
													(t) => t !== tag
												)
												const newCategory = values.category.filter(
													(t) => t !== tag
												)
												const newCategory0 = values.category0.filter(
													(t) => t !== tag
												)
												const newCategory1 = values.category1.filter(
													(t) => t !== tag
												)
												const newCategory2 = values.category2.filter(
													(t) => t !== tag
												)
												setFieldValue('category', newCategory)
												setFieldValue('category0', newCategory0)
												setFieldValue('category1', newCategory1)
												setFieldValue('category2', newCategory2)
												setFieldValue('clubCategories', newTags)
											}}
										/>
									))}
								</Box>
							</Grid>
							<Grid item md={12}>
								<Typography
									variant='h6'
									color='inherit'
									className={classes.root}
								>
									Club Contact
								</Typography>
								<TextField
									error={Boolean(touched.clubEmail && errors.clubEmail)}
									fullWidth
									helperText={touched.clubEmail && errors.clubEmail}
									label='Club Email *'
									name='clubEmail'
									size='small'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.clubEmail}
									variant='outlined'
									margin='dense'
								/>
								<TextField
									error={Boolean(touched.clubPhone && errors.clubPhone)}
									fullWidth
									helperText={touched.clubPhone && errors.clubPhone}
									label='Club Phone'
									name='clubPhone'
									size='small'
									onBlur={handleBlur}
									onChange={handleChange}
									value={values.clubPhone}
									variant='outlined'
									margin='dense'
								/>
								<Typography
									variant='h6'
									color='inherit'
									className={clsx(classes.root, classes.subtitle)}
								>
									Club Address
								</Typography>

								<Grid
									container
									className={clsx(classes.row, className)}
									spacing={1}
								>
									<Grid item md={8} xs={12}>
										<TextField
											error={Boolean(
												touched.streetAddress && errors.streetAddress
											)}
											fullWidth
											helperText={touched.streetAddress && errors.streetAddress}
											label='Street Address'
											name='streetAddress'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.streetAddress}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<TextField
											error={Boolean(touched.city && errors.city)}
											fullWidth
											helperText={touched.city && errors.city}
											label='City *'
											name='city'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.city}
											variant='outlined'
											margin='dense'
										/>
									</Grid>

									<Grid item md={4} xs={12}>
										<TextField
											error={Boolean(touched.state && errors.state)}
											fullWidth
											helperText={touched.state && errors.state}
											label='State *'
											name='state'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.state}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<TextField
											error={Boolean(touched.postalCode && errors.postalCode)}
											fullWidth
											helperText={touched.postalCode && errors.postalCode}
											label='Zip Code / Postal Code *'
											name='postalCode'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.postalCode}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={4} xs={12}>
										<TextField
											error={Boolean(touched.country && errors.country)}
											fullWidth
											helperText={touched.country && errors.country}
											label='Country *'
											name='country'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.country}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={12}>
										<Divider />
									</Grid>
									<Grid item md={12} xs={12}>
										<TextField
											error={Boolean(touched.description && errors.description)}
											fullWidth
											helperText={touched.description && errors.description}
											label='Why I recommend this club'
											name='description'
											size='small'
											multiline
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.description}
											variant='outlined'
											rows={5}
											margin='dense'
										/>
									</Grid>
									<Typography
										variant='h6'
										color='inherit'
										className={clsx(classes.root, classes.subtitle)}
									>
										Web Links
									</Typography>
									<Grid item md={12} xs={12}>
										<TextField
											error={Boolean(touched.socialLink1 && errors.socialLink1)}
											fullWidth
											helperText={touched.socialLink1 && errors.socialLink1}
											label='Club Web Site'
											name='socialLink1'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.socialLink1}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={12} xs={12}>
										<TextField
											error={Boolean(touched.socialLink2 && errors.socialLink2)}
											fullWidth
											helperText={touched.socialLink2 && errors.socialLink2}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<InstaIcon />
													</InputAdornment>
												),
											}}
											label='Instgram Link'
											name='socialLink2'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.socialLink2}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
									<Grid item md={12} xs={12}>
										<TextField
											error={Boolean(touched.socialLink3 && errors.socialLink3)}
											fullWidth
											helperText={touched.socialLink3 && errors.socialLink3}
											InputProps={{
												startAdornment: (
													<InputAdornment position='start'>
														<Facebook />
													</InputAdornment>
												),
											}}
											label='Facebook link'
											name='socialLink3'
											size='small'
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.socialLink3}
											variant='outlined'
											margin='dense'
										/>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{errors.submit && (
							<Box mt={3}>
								<FormHelperText error>{errors.submit}</FormHelperText>
							</Box>
						)}
						<Divider variant='middle' />

						<Box display='flex'>
							<Box flexGrow={1} />
							<div className={classes.button}>
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
	) : (
		<div>Loading ...</div>
	)
}

ClubInput0.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	//customer: PropTypes.object.isRequired,
}

export default ClubInput0
