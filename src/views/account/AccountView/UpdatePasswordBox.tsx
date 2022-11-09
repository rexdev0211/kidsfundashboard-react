//import React from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
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
	TextField,
} from '@mui/material'
//import wait from 'src/utils/wait'
import { makeStyles } from '@mui/styles'

interface UpdatePasswordBoxProps {
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
	topbox: { paddingBottom: '20px' },
}))

const UpdatePasswordBox: FC<UpdatePasswordBoxProps> = ({
	className,
	...rest
}) => {
	const classes = useStyles()
	//const { enqueueSnackbar } = useSnackbar()
	const { updatePassword } = useAuth() as any
	return (
		<Formik
			initialValues={{
				cur_password: '',
				password: '',
				passwordConfirm: '',
				submit: null,
			}}
			validationSchema={Yup.object().shape({
				cur_password: Yup.string().required('Required'),
				password: Yup.string()
					.min(7, 'Must be at least 7 characters')
					.max(255)
					.required('Required'),
				passwordConfirm: Yup.string()
					.oneOf([Yup.ref('password'), null], 'Passwords must match')
					.required('Required'),
			})}
			onSubmit={async (
				values,
				{ resetForm, setErrors, setStatus, setSubmitting }
			) => {
				try {
					// NOTE: Make API request
					await updatePassword(values.cur_password, values.password)

					resetForm()
					setStatus({ success: true })
					setSubmitting(false)
					alert('Password updated')
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
						<CardHeader title='Password Update' />

						<Divider />
						<CardContent>
							<Grid container spacing={3} className={classes.topbox}>
								<Grid item md={4} sm={6} xs={12}>
									<TextField
										error={Boolean(touched.cur_password && errors.cur_password)}
										fullWidth
										helperText={touched.cur_password && errors.password}
										label='Current Password'
										name='cur_password'
										onBlur={handleBlur}
										onChange={handleChange}
										type='password'
										value={values.cur_password}
										variant='outlined'
									/>
								</Grid>
							</Grid>
							<Grid container spacing={3}>
								<Grid item md={4} sm={6} xs={12}>
									<TextField
										error={Boolean(touched.password && errors.password)}
										fullWidth
										helperText={touched.password && errors.password}
										label='New Password'
										name='password'
										onBlur={handleBlur}
										onChange={handleChange}
										type='password'
										value={values.password}
										variant='outlined'
									/>
								</Grid>
								<Grid item md={4} sm={6} xs={12}>
									<TextField
										error={Boolean(
											touched.passwordConfirm && errors.passwordConfirm
										)}
										fullWidth
										helperText={
											touched.passwordConfirm && errors.passwordConfirm
										}
										label='New Password Confirmation'
										name='passwordConfirm'
										onBlur={handleBlur}
										onChange={handleChange}
										type='password'
										value={values.passwordConfirm}
										variant='outlined'
									/>
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
							>
								Change Password
							</Button>
						</Box>
					</Card>
				</form>
			)}
		</Formik>
	)
}

UpdatePasswordBox.propTypes = {
	className: PropTypes.string,
}

export default UpdatePasswordBox
