import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { makeStyles } from '@mui/styles'
interface HeaderProps {
	title?: string
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
}))

const Header: FC<HeaderProps> = ({ className, title, ...rest }) => {
	const classes = useStyles()

	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
			>
				<Link variant='body1' color='inherit' to='/app' component={RouterLink}>
					Dashboard
				</Link>
				<Link
					variant='body1'
					color='inherit'
					to='/app/host/mylist'
					component={RouterLink}
				>
					Clubs
				</Link>
				<Typography variant='body1' color='textPrimary'>
					{title}
				</Typography>
			</Breadcrumbs>
			<Typography variant='h3' color='textPrimary'>
				{title}
			</Typography>
		</div>
	)
}

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
