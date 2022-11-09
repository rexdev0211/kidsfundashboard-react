//import React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
	Box,
	Card,
	CardContent,
	Container,
	Divider,
	Link,
	//Tooltip,
	Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import Logo from 'src/components/Logo'
import useAuth from 'src/hooks/useAuth'

import FirebaseAuthRegister from './FirebaseAuthRegister'
//import JWTRegister from './JWTRegister'

/* const methodIcons = {
	Auth0: '/static/images/auth0.svg',
	FirebaseAuth: '/static/images/firebase.svg',
	JWT: '/static/images/jwt.svg',
} */

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	banner: {
		backgroundColor: theme.palette.background.paper,
		paddingBottom: theme.spacing(1),
		paddingTop: theme.spacing(1),
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
	logo: {
		paddingRight: '10px',
	},
}))

const RegisterView: FC = (props) => {
	const classes = useStyles()
	const { method } = useAuth() as any

	return (
		<Page className={classes.root} title='Register'>
			<div className={classes.banner}>
				<Container maxWidth='md'>
					<Box alignItems='center' display='flex' justifyContent='center'>
						<RouterLink to='/' className={classes.logo}>
							<Logo />
						</RouterLink>
						<Box alignItems='center' display='flex'>
							<Typography color='textPrimary' variant='h6'>
								<Link component={RouterLink} to='/'>
									www.kidsfuncloud.com
								</Link>{' '}
							</Typography>
						</Box>
					</Box>
				</Container>
			</div>
			<Container className={classes.cardContainer} maxWidth='sm'>
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
									Register
								</Typography>
								<Typography variant='body2' color='textSecondary'>
									Free to join our community.
								</Typography>
							</div>
							<div className={classes.currentMethodIcon}>
								{/* <img alt='Auth method' src={methodIcons[method]} /> */}
							</div>
						</Box>
						<Box flexGrow={1} mt={3}>
							{method === 'FirebaseAuth' && <FirebaseAuthRegister />}
						</Box>
						<Box my={3}>
							<Divider />
						</Box>
						<Link
							component={RouterLink}
							to='/login'
							variant='body2'
							color='textSecondary'
						>
							Having an account? Login Here
						</Link>
					</CardContent>
				</Card>
			</Container>
		</Page>
	)
}

export default RegisterView
