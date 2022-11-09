import React, { useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'

import type { Theme } from 'src/theme'
import NavBar from './NavBar'
import TopBar from './TopBar/TopBar'
import { makeStyles } from '@mui/styles'
import {
	selectUser,
	selectUserProfileStatus,
} from 'src/slices/userprofileSlice'
import { useSelector } from 'src/store'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
//import FormControl from '@mui/material/FormControl'
//import FormControlLabel from '@mui/material/FormControlLabel'
import RoleformNosave from 'src/layouts/DashboardLayout/RoleSelection'
interface DashboardLayoutProps {
	children?: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%',
	},
	wrapper: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
		paddingTop: 64,
		[theme.breakpoints.up('lg')]: {
			paddingLeft: 256,
		},
	},
	contentContainer: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
	},
}))

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
	const classes = useStyles()
	const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

	//const dispatch = useDispatch()
	const userLoading = useSelector(selectUserProfileStatus)
	const user = useSelector(selectUser)
	const [open, setOpen] = React.useState<boolean>(false)
	//console.log('open:', open, ' userLoading:', userLoading)
	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		console.log(user.role)
		if (!userLoading && user.role && user.role === 'Unknown') {
			setOpen(true)
		}
	}, [user.role, userLoading])

	return (
		<div className={classes.root}>
			<TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
			<NavBar
				onMobileClose={() => setMobileNavOpen(false)}
				openMobile={isMobileNavOpen}
			/>
			<div className={classes.wrapper}>
				<div className={classes.contentContainer}>
					{!userLoading && user.role ? (
						<Dialog
							fullWidth={true}
							maxWidth={'lg'}
							open={open}
							onClose={handleClose}
						>
							<DialogTitle>Select Your Role</DialogTitle>
							<DialogContent>
								<DialogContentText>Please choose your role.</DialogContentText>
								<Box
									noValidate
									component='form'
									sx={{
										display: 'flex',
										flexDirection: 'column',
										m: 'auto',
										width: 'fit-content',
									}}
								>
									<RoleformNosave />
								</Box>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Save and Close</Button>
							</DialogActions>
						</Dialog>
					) : null}
					<div className={classes.content}>{children}</div>
				</div>
			</div>
		</div>
	)
}

DashboardLayout.propTypes = {
	children: PropTypes.node,
}

export default DashboardLayout
