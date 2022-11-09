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

const PrivactyView: FC = () => {
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
					Welcome to kidsfuncloud.com, the online and mobile service of
					kidsfuncloud.com. (“kidsfuncloud.com,” “we,” “our,” or “us”). We are
					committed to protecting your privacy and to treating your personal
					information as you would want it to be treated. This Privacy Policy
					explains how we collect, use, share and protect your personal
					information. It applies to all kidsfuncloud.com websites,
					applications, services and tools (collectively, our “Service”). Please
					remember that we provide our Service to businesses, teachers, or
					others who use our Service to advertise or enroll children in a
					program, class, camp, team, league, or other group or event (“Service
					Providers”) who have their own privacy practices. This Privacy Policy
					applies only to our own data practices, and not to the practices of
					third parties that we do not control. By using our Service, you agree
					to the terms of this Privacy Policy and our Terms of Use. 1. WHAT
					INFORMATION DO WE COLLECT AND FOR WHAT PURPOSE? We collect a variety
					of personal information about our users so that we can provide our
					Service. We do our best to be as transparent as possible about our
					data practices and to provide you choices about how your data is used
					when possible. The categories of information we collect can include:
					Registration and profile information collected when you join the
					Service. We may collect personal information such as a email address,
					username, and password when you register for a kidsfuncloud.com
					account, participate in a kidsfuncloud.com promotion or contest, or if
					you correspond with us. We may collect billing information if you sign
					up for premium services or if you make a payment to a Service
					Provider. If you are a Service Provider, we may collect additional
					personal information when you join kidsfuncloud.com so that we may
					provide the Services to you.
				</Typography>

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

export default PrivactyView
