import React, { FunctionComponent } from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
//import clsx from 'clsx'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import type { Theme } from 'src/theme'

type optionTypes = {
	checklist: Array<checkObj>
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

const CheckOptions: FunctionComponent<optionTypes> = (props) => {
	const { checklist, handleChange, label } = props
	const classes = useStyles()
	return (
		<div>
			<FormGroup row>
				<Grid container className={classes.root}>
					<Grid item sm={3} xs={12}>
						<FormLabel component='legend'> {label + ' ' || ''} </FormLabel>
					</Grid>
					<Grid item sm={9} xs={12}>
						{checklist.map((checkItem: checkObj, i: any) => {
							return (
								<FormControlLabel
									control={
										<Checkbox
											checked={checkItem.checked}
											onChange={handleChange}
											name={checkItem.name}
										/>
									}
									label={checkItem.label}
									labelPlacement='end'
									key={i}
								/>
							)
						})}
					</Grid>
				</Grid>
			</FormGroup>
		</div>
	)
}
export default CheckOptions
