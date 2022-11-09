//import React from 'react'
import type { FC } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Formik } from 'formik'
import useAuth from 'src/hooks/useAuth'
//import { useSnackbar } from 'notistack'
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	FormHelperText,
	Grid,
	//Switch,
	TextField,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import Autocomplete from '@mui/lab/Autocomplete'
import type { User } from 'src/types/user'
//import wait from 'src/utils/wait'
import countries from './countries'

interface GeneralSettingsProps {
	className?: string
	user: User
}

const useStyles = makeStyles(() => ({
	root: {},
}))

const GeneralSettings: FC<GeneralSettingsProps> = ({
	className,
	user,
	...rest
}) => {
	const classes = useStyles()
	const { sendVerificationEmail, updateUserProfile } = useAuth() as any
	return (
		<Formik
			enableReinitialize
			initialValues={{
				city: user.city || '',
				country: user.country || '',
				email: user.email || '',
				isPublic: user.isPublic || false,
				name: user.name || '',
				phone: user.phoneNumber || '',
				state: user.state || '',
				submit: null,
			}}
			validationSchema={Yup.object().shape({
				city: Yup.string().max(255),
				country: Yup.string().max(255),
				email: Yup.string()
					.email('Must be a valid email')
					.max(255)
					.required('Email is required'),
				isPublic: Yup.bool(),
				name: Yup.string().max(255).required('Name is required'),
				phone: Yup.string(),
				state: Yup.string(),
			})}
			onSubmit={async (
				values,
				{ resetForm, setErrors, setStatus, setSubmitting }
			) => {
				try {
					// NOTE: Make API request
					var message
					if ((window.event as any).submitter.name === 'Save') {
						await updateUserProfile(values)
						message = 'Change is saved. Only Name can be changed.'
					} else {
						await sendVerificationEmail()
						message = 'Verification email is sent. Please check your email box'
					}
					resetForm()
					setStatus({ success: true })
					setSubmitting(false)
					alert(message)
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
				touched,
				values,
			}) => (
				<form onSubmit={handleSubmit}>
					<Card className={clsx(classes.root, className)} {...rest}>
						<CardHeader title='Profile' />
						<Divider />
						<CardContent>
							<Grid container spacing={4}>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.name && errors.name)}
										fullWidth
										helperText={touched.name && errors.name}
										label='Name'
										name='name'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.name}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={
											Boolean(touched.email && errors.email) ||
											!user.emailVerified
										}
										fullWidth
										helperText={
											touched.email && errors.email
												? errors.email
												: 'We will use this email to contact you'
										}
										label='Email Address'
										name='email'
										onBlur={handleBlur}
										onChange={handleChange}
										required
										type='email'
										value={values.email}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.phone && errors.phone)}
										fullWidth
										helperText={touched.phone && errors.phone}
										label='Phone Number'
										name='phone'
										onBlur={handleBlur}
										onChange={handleChange}
										disabled={true}
										value={values.phone}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<Autocomplete
										getOptionLabel={(option) =>
											typeof option === 'string' ? option : option.text
										}
										options={countries}
										renderInput={(params) => (
											<TextField
												fullWidth
												label='Country'
												name='country'
												//onChange={handleChange}
												variant='outlined'
												disabled={true}
												value={values.country}
												{...params}
											/>
										)}
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.state && errors.state)}
										fullWidth
										helperText={touched.state && errors.state}
										label='State/Region'
										name='state'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.state}
										disabled={true}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={Boolean(touched.city && errors.city)}
										fullWidth
										helperText={touched.city && errors.city}
										label='City'
										name='city'
										onBlur={handleBlur}
										onChange={handleChange}
										value={values.city}
										disabled={true}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									{user.emailVerified ? (
										<Typography variant='button'> Email Verified</Typography>
									) : (
										<Typography variant='button' color='error'>
											Email Not Verified
										</Typography>
									)}
								</Grid>
								<Grid item md={6} xs={12}>
									{!user.emailVerified && (
										<Button
											color='secondary'
											disabled={isSubmitting}
											type='submit'
											variant='contained'
											name='SendEmail'
										>
											<Typography variant='button'>
												Send Verification Email
											</Typography>
										</Button>
									)}
								</Grid>
							</Grid>
							{errors.submit && (
								<Box mt={3}>
									<FormHelperText error>{errors.submit}</FormHelperText>
								</Box>
							)}
						</CardContent>
						<Divider />
						<Box p={2} display='flex' justifyContent='flex-end'>
							<Button
								color='secondary'
								disabled={isSubmitting}
								type='submit'
								variant='contained'
								name='Save'
							>
								Save
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	)
}

GeneralSettings.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	user: PropTypes.object.isRequired,
}

export default GeneralSettings
