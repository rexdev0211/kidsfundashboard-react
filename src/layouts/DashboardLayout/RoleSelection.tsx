import React from 'react'
import type { FC } from 'react'
import {
	Box,
	//Button,
	FormControlLabel,
	Paper,
	Radio,
	RadioGroup,
	Typography,
} from '@mui/material'
import type { Theme } from 'src/theme'
import { selectUser, updateUserRole } from 'src/slices/userprofileSlice'
import { Roletypes } from 'src/types/user'
import { useDispatch, useSelector } from 'src/store'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
		},
	},
	subtitle: {
		marginTop: theme.spacing(2),
	},
	radiogroup: {
		'& > *:not(:last-of-type)': {},
	},
	paper: {
		alignItems: 'flex-start',
		display: 'flex',
	},
	box: {
		ml: 2,
	},
	switch: {
		backgroundColor: 'background.paper',
		minHeight: '100%',
	},
}))

const typeOptions = [
	{
		description: "I'm a club owner or a coach/teacher of a class",
		title: "I'm a club owner",
		value: 'Owner',
	},
	{
		description: "I'm a parent and plan to find a club or recommend a club",
		title: 'I’m a parent',
		value: 'Parent',
	},
]

const RoleformNosave: FC = () => {
	const user = useSelector(selectUser)
	const [value, setValue] = React.useState((user.role as string) || null)
	const dispatch = useDispatch()

	const classes = useStyles()

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		//alert((event.target as HTMLInputElement).value)
		setValue((event.target as HTMLInputElement).value)
		dispatch(
			updateUserRole({
				role: (event.target as HTMLInputElement)
					.value as typeof Roletypes[keyof typeof Roletypes],
			})
		)
	}
	return (
		<Box className={classes.switch}>
			<RadioGroup
				className={classes.radiogroup}
				value={value}
				onChange={handleChange}
			>
				{typeOptions.map((typeOption) => (
					<Paper
						key={typeOption.value}
						variant='outlined'
						className={classes.paper}
					>
						<FormControlLabel
							control={<Radio color='primary' />}
							key={typeOption.value}
							label={
								<Box className={classes.box}>
									<Typography color='textPrimary' variant='subtitle2'>
										{typeOption.title}
									</Typography>
									<Typography color='textSecondary' variant='body2'>
										{typeOption.description}
									</Typography>
								</Box>
							}
							value={typeOption.value}
						/>
					</Paper>
				))}
			</RadioGroup>
		</Box>
	)
}

export default RoleformNosave
