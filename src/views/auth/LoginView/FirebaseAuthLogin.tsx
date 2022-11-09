//import React from 'react'
import type { FC } from 'react'
import clsx from 'clsx'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

import {
	Box,
	Button,
	Divider,
	FormHelperText,
	TextField,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'
import useAuth from 'src/hooks/useAuth'
import useIsMountedRef from 'src/hooks/useIsMountedRef'

interface FirebaseAuthLoginProps {
	className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	googleButton: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		'&:hover': {
			color: theme.palette.common.white,
		},
		marginBottom: '5px',
	},
	providerIcon: {
		marginRight: theme.spacing(2),
	},
	divider: {
		flexGrow: 1,
	},
	dividerText: {
		margin: theme.spacing(2),
	},
}))

///// Sign In Page UI Component

const FirebaseAuthLogin: FC<FirebaseAuthLoginProps> = ({
	className,
	...rest
}) => {
	const classes = useStyles()
	const { signInWithEmailAndPassword, signInWithGoogle, signInWithFacebook } =
		useAuth() as any
	const isMountedRef = useIsMountedRef()

	const handleGoogleClick = async () => {
		try {
			await signInWithGoogle()
		} catch (error) {
			//console.error(error)
			var errorCode = error.code
			var errorMessage = error.message
			// The email of the user's account used.
			var email = error.email
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential
			console.error(errorCode, errorMessage, email, credential)
			alert(errorMessage)
		}
	}

	const handleFacebookClick = async () => {
		try {
			await signInWithFacebook()
			console.log('signed in!')
		} catch (error) {
			console.error(error)
			var errorCode = error.code
			var errorMessage = error.message
			// The email of the user's account used.
			var email = error.email
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential
			console.error(errorCode, errorMessage, email, credential)
			alert(errorMessage)
		}
	}
	return (
		<>
			<Button
				className={classes.googleButton}
				fullWidth
				onClick={handleGoogleClick}
				size='large'
				variant='contained'
			>
				<img
					alt='Google'
					className={classes.providerIcon}
					src='/static/images/google.svg'
				/>
				Sign in with Google
			</Button>
			{false && (
				<Button
					className={classes.googleButton}
					fullWidth
					onClick={handleFacebookClick}
					size='large'
					variant='contained'
				>
					<img
						alt='facebook'
						className={classes.providerIcon}
						src='/static/images/icons8-facebook.svg'
					/>
					Sign in with Facebook
				</Button>
			)}
			<Box alignItems='center' display='flex' mt={2}>
				<Divider className={classes.divider} orientation='horizontal' />
				<Typography
					color='textSecondary'
					variant='body1'
					className={classes.dividerText}
				>
					OR
				</Typography>
				<Divider className={classes.divider} orientation='horizontal' />
			</Box>
			<Formik
				initialValues={{
					email: '',
					password: '',
					submit: null,
				}}
				validationSchema={Yup.object().shape({
					email: Yup.string()
						.email('Must be a valid email')
						.max(255)
						.required('Email is required'),
					password: Yup.string().max(255).required('Password is required'),
				})}
				onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
					try {
						const userCredential = await signInWithEmailAndPassword(
							values.email,
							values.password
						)
						if (!userCredential.user.emailVerified) {
							throw new Error(
								'Email address is not verified. Please check your emailbox to verify email.'
							)
						} else {
							if (isMountedRef.current) {
								setStatus({ success: true })
								setSubmitting(false)
							}
						}
					} catch (err) {
						console.error(err)
						if (isMountedRef.current) {
							setStatus({ success: false })
							setErrors({ submit: err.message })
							setSubmitting(false)
						}
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
					<form
						noValidate
						onSubmit={handleSubmit}
						className={clsx(classes.root, className)}
						{...rest}
					>
						<TextField
							error={Boolean(touched.email && errors.email)}
							fullWidth
							helperText={touched.email && errors.email}
							label='Email Address'
							margin='normal'
							name='email'
							onBlur={handleBlur}
							onChange={handleChange}
							type='email'
							value={values.email}
							variant='outlined'
						/>
						<TextField
							error={Boolean(touched.password && errors.password)}
							fullWidth
							helperText={touched.password && errors.password}
							label='Password'
							margin='normal'
							name='password'
							onBlur={handleBlur}
							onChange={handleChange}
							type='password'
							value={values.password}
							variant='outlined'
						/>
						{errors.submit && (
							<Box mt={3}>
								<FormHelperText error>{errors.submit}</FormHelperText>
							</Box>
						)}
						<Box mt={2}>
							<Button
								color='secondary'
								disabled={isSubmitting}
								fullWidth
								size='large'
								type='submit'
								variant='contained'
							>
								Log In
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</>
	)
}

FirebaseAuthLogin.propTypes = {
	className: PropTypes.string,
}

export default FirebaseAuthLogin
