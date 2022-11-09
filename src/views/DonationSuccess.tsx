// @mui
import { styled } from '@mui/material/styles'
import { Card, CardMedia, Typography, Stack, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
// components
//import { Page, Image } from '../src/components'
import Page from 'src/components/Page'
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	textAlign: 'center',
	padding: theme.spacing(15, 2.5),
	[theme.breakpoints.up('sm')]: {
		height: '100vh',
	},
}))

// ----------------------------------------------------------------------

export default function DonationSuccess() {
	return (
		<Page title='Donation Success'>
			<RootStyle>
				<Stack alignItems='center' sx={{ maxWidth: 480 }}>
					<Typography variant='h3' paragraph>
						Thanks For Donation.
					</Typography>

					<Typography sx={{ color: 'text.secondary' }}></Typography>

					<Card sx={{ maxWidth: 400 }}>
						<CardMedia
							component='img'
							alt='happykids'
							image='/static/images/covers/happykids.png'
						/>
					</Card>
					<Button
						color='primary'
						variant='contained'
						to='/'
						sx={{ marginLeft: '10px', mt: '10px' }}
						component={RouterLink}
					>
						Home
					</Button>
				</Stack>
			</RootStyle>
		</Page>
	)
}
