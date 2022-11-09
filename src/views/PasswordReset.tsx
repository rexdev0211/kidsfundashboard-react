//import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { FC } from 'react'
import {
	Box,
	Card,
	CardContent,
	//Chip,
	Button,
	Container,
	Divider,
	TextField,
	//Tooltip,
	FormHelperText,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import Logo from 'src/components/Logo'
import clsx from 'clsx'
import * as Yup from 'yup'
import { Formik } from 'formik'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
	},
	banner: {
		backgroundColor: theme.palette.background.paper,
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	bannerChip: {
		marginRight: theme.spacing(2),
	},
	methodIcon: {
		height: 30,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
	cardContainer: {
		paddingBottom: 80,
		paddingTop: 80,
	},
	cardContent: {
		padding: theme.spacing(4),
		display: 'flex',
		flexDirection: 'column',
		minHeight: 400,
	},
	currentMethodIcon: {
		height: 40,
		'& > img': {
			width: 'auto',
			maxHeight: '100%',
		},
	},
}))

const PasswordReset: FC = () => {
	const classes = useStyles()
	const { sendPasswordResetEmail } = useAuth() as any
	const isMountedRef = useIsMountedRef()
	return (
		<Page className={classes.root} title='Password Reset'>
			<Container className={classes.cardContainer} maxWidth='sm'>
				<Box mb={8} display='flex' justifyContent='center'>
					<RouterLink to='/'>
						<Logo />
					</RouterLink>
				</Box>
				<Card>
					<CardContent className={classes.cardContent}>
						<Box
							alignItems='center'
							display='flex'
							justifyContent='space-between'
							mb={3}
						>
							<div>
								<Typography color='textPrimary' gutterBottom variant='h2'>
									Password Reset
								</Typography>
								<Typography variant='body1' color='textSecondary'>
									Please enter your email address below:
								</Typography>
							</div>
						</Box>
						<Formik
							initialValues={{
								email: '',
								submit: null,
							}}
							validationSchema={Yup.object().shape({
								email: Yup.string()
									.email('Must be a valid email')
									.max(255)
									.required('Email is required'),
							})}
							onSubmit={async (
								values,
								{ setErrors, setStatus, setSubmitting }
							) => {
								try {
									await sendPasswordResetEmail(values.email)

									if (isMountedRef.current) {
										setStatus({ success: true })
										setSubmitting(false)
									}
								} catch (err) {
									//console.error(err)
									if (isMountedRef.current) {
										setStatus({ success: true })
										setErrors({ submit: err.message })
										setSubmitting(false)
									}
								}
							}}
						>
							{({
								errors,
								setStatus,
								status,
								handleBlur,
								handleChange,
								handleSubmit,
								isSubmitting,
								touched,
								values,
							}) => (
								<form
									noValidate
									onSubmit={handleSubmit}
									className={clsx(classes.root)}
								>
									<TextField
										error={Boolean(touched.email && errors.email)}
										fullWidth
										helperText={touched.email && errors.email}
										label='Email Address'
										margin='normal'
										name='email'
										onBlur={handleBlur}
										onChange={(e) => {
											setStatus(null)
											handleChange(e)
										}}
										type='email'
										value={values.email}
										variant='outlined'
									/>
									{status && status.success && (
										<Box mt={3}>
											<FormHelperText>
												{
													'Password reset email has been sent if the email address is in our database. Please check your email. If the email is not received, please request again in a few minutes.'
												}
											</FormHelperText>
										</Box>
									)}
									<Box mt={2}>
										<Button
											color='secondary'
											disabled={isSubmitting}
											size='small'
											type='submit'
											variant='contained'
										>
											Submit
										</Button>
									</Box>
								</form>
							)}
						</Formik>

						<Box my={3}>
							<Divider />
						</Box>
					</CardContent>
				</Card>
			</Container>
		</Page>
	)
}

export default PasswordReset
