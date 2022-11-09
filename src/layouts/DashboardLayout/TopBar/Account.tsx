import { useRef, useState } from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
//import { useSnackbar } from 'notistack'
import {
	Avatar,
	Box,
	ButtonBase,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material'
import useAuth from 'src/hooks/useAuth'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'
const useStyles = makeStyles((theme: Theme) => ({
	avatar: {
		height: 32,
		width: 32,
		marginRight: 8,
	},
	popover: {
		width: 200,
	},
}))

const Account: FC = () => {
	const classes = useStyles()
	const history = useHistory()
	const ref = useRef<any>(null)
	const { user, logout } = useAuth()

	const [isOpen, setOpen] = useState<boolean>(false)

	const handleOpen = (): void => {
		setOpen(true)
	}

	const handleClose = (): void => {
		setOpen(false)
	}

	const handleLogout = async (): Promise<void> => {
		try {
			handleClose()
			await logout()
			history.push('/')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<>
			<Box
				display='flex'
				alignItems='center'
				component={ButtonBase}
				onClick={handleOpen}
				// @ts-ignore
				ref={ref}
			>
				<Avatar alt='User' className={classes.avatar} src={user.avatar} />

				<Typography
					sx={{ display: { md: 'block', sm: 'none' } }}
					variant='h6'
					color='inherit'
				>
					{user.name}
				</Typography>
			</Box>
			<Menu
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				keepMounted
				PaperProps={{ className: classes.popover }}
				//getContentAnchorEl={null}
				anchorEl={ref.current}
				open={isOpen}
			>
				{/* 				<MenuItem component={RouterLink} to='/app/social/profile'>
					Profile
				</MenuItem> */}
				<MenuItem component={RouterLink} to='/app/account'>
					Account
				</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</>
	)
}

export default Account
