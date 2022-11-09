//import React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import {
	AppBar,
	Box,
	Button,
	Divider,
	Toolbar,
	Typography,
	IconButton,
	Link,
} from '@mui/material'
import useAuth from 'src/hooks/useAuth'
import { makeStyles } from '@mui/styles'
//import { APP_VERSION } from 'src/constants'
import MenuIcon from 'src/icons/Menu'
import Logo from 'src/components/Logo'
import Account from 'src/layouts/DashboardLayout/TopBar/Account'
import Notifications from 'src/layouts/DashboardLayout/TopBar//Notifications'
//import Search from 'src/layouts/DashboardLayout/TopBar/Search'
import { selectUser } from 'src/slices/userprofileSlice'
import { useSelector } from 'src/store'
import { User } from 'src/types/user'
import type { Theme } from 'src/theme'
interface TopBarProps {
	className?: string
	onSidebarMobileOpen?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: 46,
	},
	toolbar: {
		minHeight: 48,
	},
	logo: {
		marginRight: theme.spacing(2),
	},
	link: {
		fontWeight: theme.typography.fontWeightMedium,
		'& + &': {
			marginLeft: theme.spacing(2),
		},
	},
	divider: {
		width: 1,
		height: 32,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
}))

const MainHeader: FC<TopBarProps> = ({ className, ...rest }) => {
	const { isAuthenticated } = useAuth()
	const classes = useStyles()
	const { onSidebarMobileOpen } = rest
	const user: User = useSelector(selectUser)
	//console.log(isAuthenticated)
	return (
		<AppBar className={clsx(classes.root, className)} color='default' {...rest}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color='inherit'
					onClick={onSidebarMobileOpen}
					sx={{
						display: {
							md: 'none',
						},
					}}
				>
					<MenuIcon fontSize='small' />
				</IconButton>
				<Box sx={{ display: { xs: 'none', md: 'block' } }}>
					<RouterLink to='/'>
						<Logo className={classes.logo} />
					</RouterLink>
				</Box>
				<Typography
					sx={{ display: { xs: 'none', md: 'block' } }}
					variant='caption'
					color='textSecondary'
				>
					Kidsfuncloud.com
				</Typography>

				<Box flexGrow={1} />
				<Button
					sx={{ marginRight: '10px', display: { xs: 'none', md: 'block' } }}
					color='primary'
					component='a'
					href='/app/host/confirm'
					variant='contained'
					size='small'
				>
					Post Your Club
				</Button>
				{user && user.role && user.role === 'Parent' && (
					<Button
						sx={{ display: { xs: 'none', md: 'block' } }}
						color='primary'
						component='a'
						href='/app/parent/recommendclub'
						variant='contained'
						size='small'
					>
						Recommend A Club
					</Button>
				)}
				<Box flexGrow={1} />
				{!isAuthenticated && (
					<Link
						sx={{ display: { xs: 'none', md: 'block' } }}
						className={classes.link}
						color='textPrimary'
						component={RouterLink}
						to='/login'
						underline='none'
						variant='body2'
					>
						Sign In
					</Link>
				)}
				<Divider className={classes.divider} />
				{!isAuthenticated && (
					<Button
						sx={{ display: { xs: 'none', md: 'block' } }}
						color='secondary'
						component='a'
						href='/register'
						variant='contained'
						size='small'
					>
						Sign Up
					</Button>
				)}

				{isAuthenticated && (
					<Box ml={2}>
						<Notifications />
					</Box>
				)}

				{isAuthenticated && (
					<Box ml={2}>
						<Account />
					</Box>
				)}
			</Toolbar>
		</AppBar>
	)
}

MainHeader.propTypes = {
	className: PropTypes.string,
}

export default MainHeader
