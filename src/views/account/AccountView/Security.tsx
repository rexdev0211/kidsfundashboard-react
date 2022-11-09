//import React from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import type { Theme } from 'src/theme'
import clsx from 'clsx'
import useAuth from 'src/hooks/useAuth'
import UpdatePasswordBox from 'src/views/account/AccountView/UpdatePasswordBox'
import {
	//Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	//Typography,
	//TextField,
} from '@mui/material'
//import wait from 'src/utils/wait'
import { makeStyles } from '@mui/styles'

interface SecurityPageProps {
	className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	topbox: { paddingBottom: '20px' },
	googleButton: {
		backgroundColor: theme.palette.common.white,
		color: theme.palette.common.black,
		'&:hover': {
			color: theme.palette.common.white,
		},
	},
	providerIcon: {
		marginRight: theme.spacing(2),
	},
}))
const isPasswordSignInUsed = (providerData: Array<any>) => {
	const passwordSignin = providerData.find(
		(item) => item.providerId === 'password'
	)
	if (passwordSignin === undefined) return false
	return true
}
const isGoogleSignInUsed = (providerData: Array<any>) => {
	const passwordSignin = providerData.find(
		(item) => item.providerId === 'google.com'
	)
	if (passwordSignin === undefined) return false

	return true
}
const SecurityPage: FC<SecurityPageProps> = ({ className, ...rest }) => {
	const classes = useStyles()
	const { user } = useAuth() as any
	console.log('security user:', user)
	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title='Login' />
			{isPasswordSignInUsed(user.providerData) && <UpdatePasswordBox />}
			<Divider />
			<CardContent>
				<Grid container spacing={3} className={classes.topbox}>
					<Grid item md={12} sm={12} xs={12}>
						{isGoogleSignInUsed(user.providerData) && (
							<Button
								className={classes.googleButton}
								size='small'
								variant='contained'
							>
								<img
									alt='Google'
									className={classes.providerIcon}
									src='/static/images/google.svg'
								/>
								Google
							</Button>
						)}
					</Grid>
				</Grid>
			</CardContent>
			<Divider />
		</Card>
	)
}

SecurityPage.propTypes = {
	className: PropTypes.string,
}

export default SecurityPage
