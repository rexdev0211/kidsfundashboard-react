import { useEffect } from 'react'
import type { FC } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Box, Button, Drawer } from '@mui/material'
import type { Theme } from 'src/theme'
import useMediaQuery from '@mui/material/useMediaQuery'

import Logo from './Logo'

interface MainSidebarProps {
	onMobileClose: () => void
	openMobile: boolean
}

const MainSidebar: FC<MainSidebarProps> = (props) => {
	const { onMobileClose, openMobile } = props
	const location = useLocation()
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

	useEffect(() => {
		if (openMobile && onMobileClose) {
			onMobileClose()
		}
	}, [location.pathname])

	return (
		<Drawer
			anchor='left'
			onClose={onMobileClose}
			open={!lgUp && openMobile}
			variant='temporary'
			PaperProps={{
				sx: {
					backgroundColor: 'background.default',
					width: 256,
				},
			}}
		>
			<Box
				sx={{
					alignItems: 'flex-start',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					p: 2,
				}}
			>
				<RouterLink to='/'>
					<Logo />
				</RouterLink>
				<Box
					sx={{
						display: 'flex',
						pb: 2,
						pt: 3,
					}}
				></Box>
				<Button
					sx={{ marginRight: '10px', display: { xs: 'block', md: 'none' } }}
					color='primary'
					component='a'
					href='/app/host/confirm'
					variant='outlined'
					size='small'
				>
					Post Your Club
				</Button>
				<Button
					sx={{
						marginRight: '10px',
						mt: 1,
						display: { xs: 'block', md: 'none' },
					}}
					color='primary'
					component='a'
					href='/app/parent/recommendclub'
					variant='outlined'
					size='small'
				>
					Recommend A Club
				</Button>
				<Button
					sx={{
						marginRight: '10px',
						mt: 1,
						display: { xs: 'block', md: 'none' },
					}}
					color='primary'
					component='a'
					href='/login'
					variant='outlined'
					size='small'
				>
					Sign In
				</Button>
				<Button
					color='primary'
					component='a'
					href='/register'
					size='small'
					sx={{ mt: 1 }}
					variant='contained'
				>
					Sign Up
				</Button>
			</Box>
		</Drawer>
	)
}

MainSidebar.propTypes = {
	onMobileClose: PropTypes.func,
	openMobile: PropTypes.bool,
}

export default MainSidebar
