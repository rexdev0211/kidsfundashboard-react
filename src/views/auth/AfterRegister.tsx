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

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
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

const AfterRegisterView: FC = () => {
	const classes = useStyles()

	return (
		<Page className={classes.root} title='Register'>
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
								<Typography color='textPrimary' gutterBottom variant='h3'>
									A verification email has been sent to your email address.
								</Typography>
								<Typography variant='h4' color='textSecondary'>
									<p>
										Please check your emailbox and confirm verification email.
									</p>
								</Typography>
							</div>
							<div className={classes.currentMethodIcon}>
								{/* <img alt='Auth method' src={methodIcons[method]} /> */}
							</div>
						</Box>

						<Box my={3}>
							<Divider />
						</Box>
						<Link
							component={RouterLink}
							to='/login'
							variant='h5'
							color='primary'
						>
							Sign in here.
						</Link>
					</CardContent>
				</Card>
			</Container>
		</Page>
	)
}

export default AfterRegisterView
