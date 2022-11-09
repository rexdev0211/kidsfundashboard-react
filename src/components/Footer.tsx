import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
	Box,
	Container,
	Button,
	// 	Divider,
	// Grid,
	// Link,
	// List,
	// ListItem,
	// ListItemAvatar,
	// ListItemText,
	Typography,
} from '@mui/material'
//import { alpha } from '@mui/material/styles'
//import MinusIcon from '../icons/Minus'

/* const sections = [
	{
		title: 'Discover',
		links: [
			{
				title: 'For club owners/coaches',
				href: '/owners',
			},
			{
				title: 'For parents',
				href: '/parents',
			},
		],
	},
	{
		title: 'About',
		links: [
			{
				title: 'Terms & Conditions',
				href: '#',
			},
			{
				title: 'License',
				href: '#',
			},
			{
				title: 'Contact',
				href: '#',
			},
		],
	},
	{
		title: 'Communities',
		links: [
			{
				title: 'Instagram',
				href: '#',
			},
			{
				title: 'LinkedIn',
				href: 'www.linkedin.com',
			},
		],
	},
] */

const Footer: FC = (props) => (
	<Box
		sx={{
			backgroundColor: 'background.default',
			pb: 6,
			pt: {
				md: 15,
				xs: 6,
			},
		}}
		{...props}
	>
		<Container maxWidth='lg'>
			{/* 			<Grid container spacing={3}>
				<Grid
					item
					md={2}
					sm={4}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						order: {
							md: 1,
							xs: 4,
						},
					}}
					xs={12}
				>
					{''}
				</Grid>
				{sections.map((section, index) => (
					<Grid
						item
						key={section.title}
						md={3}
						sm={4}
						sx={{
							order: {
								md: index + 2,
								xs: index + 1,
							},
						}}
						xs={12}
					>
						<Typography color='textSecondary' variant='overline'>
							{section.title}
						</Typography>
						<List disablePadding>
							{section.links.map((link) => (
								<ListItem
									disableGutters
									key={link.title}
									sx={{
										pb: 0,
										pt: 1,
									}}
								>
									<ListItemAvatar
										sx={{
											alignItems: 'center',
											display: 'flex',
											minWidth: 0,
											mr: 0.5,
										}}
									>
										<MinusIcon color='primary' />
									</ListItemAvatar>
									<ListItemText
										primary={
											<Link
												href={link.href}
												color='textPrimary'
												variant='subtitle2'
											>
												{link.title}
											</Link>
										}
									/>
								</ListItem>
							))}
						</List>
					</Grid>
				))}
			</Grid>
			<Divider
				sx={{
					borderColor: (theme) =>
						alpha(theme.palette.primary.contrastText, 0.12),
					my: 1,
				}}
			/> */}
			<Box sx={{ textAlign: 'center' }}>
				<Typography
					color='textSecondary'
					sx={{ mt: 1, textAlign: 'center' }}
					variant='caption'
				>
					Donate to KIDFUNCLOUD.COM to support platform services.
				</Typography>
				{window.location.pathname !== '/donation' &&
					window.location.pathname !== '/donationsuccess' && (
						<Button
							sx={{ ml: '10px' }}
							size='small'
							variant={'contained'}
							color='primary'
							to='/donation'
							component={RouterLink}
						>
							Donate
						</Button>
					)}
			</Box>

			<Box sx={{ textAlign: 'center' }}>
				<Typography
					color='textSecondary'
					sx={{ mt: 1, textAlign: 'center' }}
					variant='caption'
				>
					© KIDSFUNCLOUD.COM All Rights Reserved.
				</Typography>
			</Box>
		</Container>
	</Box>
)

export default Footer
