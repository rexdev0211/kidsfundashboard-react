//import React from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { selectUser } from 'src/slices/userprofileSlice'
import Roleform from 'src/components/Roleform'
import { useSelector } from 'src/store'
import { User } from 'src/types/user'
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Typography,
	//FormHelperText,
	//Grid,
	//TextField,
} from '@mui/material'

import { makeStyles } from '@mui/styles'

// interface SecurityProps {
// 	className?: string
// }

const useStyles = makeStyles(() => ({
	root: {},
	role: {
		paddingLeft: '20px',
		paddingBottom: '20px',
	},
}))

const SwitchRolePage: FC = () => {
	const classes = useStyles()
	const user: User = useSelector(selectUser)
	//const { enqueueSnackbar } = useSnackbar()

	return (
		<Card className={clsx(classes.root)}>
			<CardHeader title='Your role' />
			<Box className={classes.role}>
				<Typography variant='h3'>Current Role: {user.role}</Typography>
			</Box>
			<Divider />
			<CardContent>
				<Roleform />
			</CardContent>
			<Divider />
		</Card>
	)
}

SwitchRolePage.propTypes = {
	className: PropTypes.string,
}

export default SwitchRolePage
