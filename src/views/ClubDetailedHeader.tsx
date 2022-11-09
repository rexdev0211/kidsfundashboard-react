import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'src/store'
import { User } from 'src/types/user'
import { selectUser } from 'src/slices/userprofileSlice'
interface HeaderProps {
	title?: string
	role?: string
	className?: string
}

const useStyles = makeStyles(() => ({
	root: {},
}))

const Header: FC<HeaderProps> = ({ className, title, ...rest }) => {
	const classes = useStyles()
	const user: User = useSelector(selectUser)
	var topath = '/app/host/mylist'
	if (user.role === 'Parent') {
		topath = '/app/parent/myrecommendations'
	}
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
					to={topath}
					component={RouterLink}
				>
					Clubs
				</Link>
				<Typography
					variant='body1'
					color='textPrimary'
					sx={{ textTransform: 'capitalize' }}
				>
					{title}
				</Typography>
			</Breadcrumbs>
		</div>
	)
}

Header.propTypes = {
	className: PropTypes.string,
}

export default Header
