//import React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { AppBar, Box, IconButton, Toolbar, SvgIcon } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Menu as MenuIcon } from 'react-feather'
import Logo from 'src/components/Logo'
import './TopBar.css'
//import { THEMES } from 'src/constants'
import type { Theme } from 'src/theme'
import Account from './Account'

import Notifications from './Notifications'
import Search from './Search'

interface TopBarProps {
	className?: string
	onMobileNavOpen?: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		zIndex: theme.zIndex.drawer + 100,
		...{ boxShadow: 'none', backgroundColor: theme.palette.primary.main },
	},
	toolbar: {
		minHeight: 64,
	},
}))

const TopBar: FC<TopBarProps> = ({ className, onMobileNavOpen, ...rest }) => {
	const classes = useStyles()

	return (
		<AppBar className={clsx(classes.root, className)} {...rest}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					sx={{ display: { lg: 'none', md: 'block' } }}
					color='inherit'
					onClick={onMobileNavOpen}
				>
					<SvgIcon fontSize='small'>
						<MenuIcon />
					</SvgIcon>
				</IconButton>

				<Box
					sx={{ display: { lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}
				>
					<RouterLink to='/' className='filter-white'>
						<Logo />
					</RouterLink>
				</Box>
				<Box ml={2} flexGrow={1} />
				<Search />
				<Notifications />
				<Box ml={2}>
					<Account />
				</Box>
			</Toolbar>
		</AppBar>
	)
}

TopBar.propTypes = {
	className: PropTypes.string,
	onMobileNavOpen: PropTypes.func,
}

TopBar.defaultProps = {
	onMobileNavOpen: () => {},
}

export default TopBar
