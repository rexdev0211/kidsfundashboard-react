import React, { FunctionComponent } from 'react'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
//import clsx from 'clsx'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'

type optionTypes = {
	radiolist: Array<checkObj>
	handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
	label?: String
}
type checkObj = {
	checked: boolean
	name: string
	label: string
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		alignItems: 'center',
		'& .MuiFormLabel-root': {
			color: 'black',
		},
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}))

const RadioOptions: FunctionComponent<optionTypes> = (props) => {
	const { radiolist, handleChange, label } = props
	const classes = useStyles()
	return (
		<div>
			<FormControl component='fieldset'>
				<Grid container className={classes.root}>
					<Grid item md={6} xs={12}>
						<FormLabel component='legend'> {label + ' ' || ''} </FormLabel>
					</Grid>
					<Grid item md={6} xs={12}>
						<RadioGroup
							row
							aria-label='position'
							name='position'
							defaultValue='left'
						>
							{radiolist.map((checkItem: checkObj, i: any) => {
								return (
									<FormControlLabel
										key={i}
										control={
											<Radio
												checked={checkItem.checked}
												onChange={handleChange}
												name={checkItem.name}
												key={i}
											/>
										}
										label={checkItem.label}
										labelPlacement='end'
									/>
								)
							})}
						</RadioGroup>
					</Grid>
				</Grid>
			</FormControl>
		</div>
	)
}
export default RadioOptions
