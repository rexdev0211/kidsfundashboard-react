//import React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
	Box,
	Button,
	Container,
	Typography,
	useTheme,
	useMediaQuery,
} from '@mui/material'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(3),
		paddingTop: 80,
		paddingBottom: 80,
	},
	image: {
		maxWidth: '100%',
		width: 160,
		maxHeight: 200,
		height: 'auto',
	},
}))

const NotFoundView: FC = () => {
	const classes = useStyles()
	const theme = useTheme()
	const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<Page className={classes.root} title='404: Not found'>
			<Container maxWidth='lg'>
				<Typography
					align='center'
					variant={mobileDevice ? 'h4' : 'h1'}
					color='textPrimary'
				>
					404: The page you are looking for isn’t here
				</Typography>
				<Typography align='center' variant='subtitle2' color='textSecondary'>
					Sorry, please use the navigation menu.
				</Typography>
				<Box mt={6} display='flex' justifyContent='center'>
					<img
						alt='Under development'
						className={classes.image}
						src='/static/images/404.jpg'
					/>
				</Box>
				<Box mt={6} display='flex' justifyContent='center'>
					<Button
						color='secondary'
						component={RouterLink}
						to='/'
						variant='outlined'
					>
						Back to home
					</Button>
				</Box>
			</Container>
		</Page>
	)
}

export default NotFoundView
