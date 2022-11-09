//import React from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
	Avatar,
	Box,
	//Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material'
import type { Theme } from 'src/theme'
import type { User } from 'src/types/user'
import { makeStyles } from '@mui/styles'
interface ProfileDetailsProps {
	className?: string
	user: User
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	name: {
		marginTop: theme.spacing(1),
	},
	avatar: {
		height: 100,
		width: 100,
	},
}))

const ProfileDetails: FC<ProfileDetailsProps> = ({
	className,
	user,
	...rest
}) => {
	const classes = useStyles()

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Box
					display='flex'
					alignItems='center'
					flexDirection='column'
					textAlign='center'
				>
					<Avatar className={classes.avatar} src={user.avatar} />
					<Typography
						className={classes.name}
						color='textPrimary'
						gutterBottom
						variant='h3'
					>
						{user.name}
					</Typography>
				</Box>
			</CardContent>
			<CardActions>
				{/* <Button fullWidth variant='text'>
					Remove picture
				</Button> */}
			</CardActions>
		</Card>
	)
}

ProfileDetails.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	//user: PropTypes.object.isRequired,
}

export default ProfileDetails
