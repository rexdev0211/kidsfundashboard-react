//import React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Typography, Breadcrumbs, Link } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { makeStyles } from '@mui/styles'

interface HeaderProps {
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
}))

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				<Link color='inherit' to='/app' component={RouterLink}>
					Dashboard
				</Link>
				<Typography color='textPrimary'>Account</Typography>
			</Breadcrumbs>
			<Typography variant='h3' color='textPrimary'>
				Settings
			</Typography>
		</div>
	)
}

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
