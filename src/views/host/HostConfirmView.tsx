//import React from 'react'
import type { FC } from 'react'
import { Button, Container, CardContent } from '@mui/material'
import RoleformNosave from 'src/layouts/DashboardLayout/RoleSelection'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'
import {
	selectUser,
	//selectUserProfileStatus,
} from 'src/slices/userprofileSlice'
import { useSelector } from 'src/store'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}))

const HostConfirmView: FC = () => {
	const classes = useStyles()
	const history = useHistory()
	const user = useSelector(selectUser)
	const onSave = () => {
		if (user.role === 'Parent') {
			history.push('/app/parent/recommendclub')
		} else {
			history.push('/app/host/createclub')
		}
	}
	return (
		<Page className={classes.root} title='Create A Club'>
			<Container maxWidth={false}>
				<CardContent>
					<RoleformNosave />
				</CardContent>
				<Button
					color='secondary'
					variant='contained'
					size='medium'
					onClick={onSave}
				>
					Save and Next
				</Button>
			</Container>
		</Page>
	)
}

export default HostConfirmView
