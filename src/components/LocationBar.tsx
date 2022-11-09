import React, { useImperativeHandle } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import { setQuery } from 'src/slices/clubListSlice'

import { useDispatch } from 'src/store'
import './LocationBar.css'
import type { Theme } from 'src/theme'
function loadScript(src: string, position: HTMLElement | null, id: string) {
	if (!position) {
		return
	}

	const script = document.createElement('script')
	script.setAttribute('async', '')
	script.setAttribute('id', id)
	script.src = src
	position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles((theme: Theme) => ({
	icon: {
		color: theme.palette.text.secondary,
		marginRight: theme.spacing(2),
	},
	inputRoot: {
		paddingTop: '0px',
		paddingBottom: '5px',
	},
}))
interface PlaceTerm {
	offset?: number
	value: string
}
interface PlaceType {
	description: string
	structured_formatting: {
		main_text: string
		secondary_text: string
		main_text_matched_substrings: [
			{
				offset: number
				length: number
			}
		]
	}
	terms?: Array<PlaceTerm>
	types?: Array<string>
	place_id: string
}

const LocationBar = React.forwardRef((props, ref) => {
	const dispatch = useDispatch()

	const classes = useStyles()
	const [value, setValue] = React.useState<PlaceType | null>(null)
	const [inputValue, setInputValue] = React.useState('')
	const [options, setOptions] = React.useState<PlaceType[]>([])
	const loaded = React.useRef(false)
	useImperativeHandle(ref, () => ({
		clearLocation: () => {
			setOptions([])
			setValue(null)
			dispatch(
				setQuery({
					city: '',
					state: '',
					country: '',
				})
			)
		},
	}))
	if (typeof window !== 'undefined' && !loaded.current) {
		if (!document.querySelector('#google-maps')) {
			loadScript(
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyBd6aU6B_udm4eWdOfi2JejDvKqRQ-O6gg&libraries=places',
				document.querySelector('head'),
				'google-maps'
			)
		}

		loaded.current = true
	}

	const fetch = React.useMemo(
		() =>
			throttle(
				(
					request: {
						input: string
						types: [string]
						componentRestrictions: {}
					},
					callback: (results?: PlaceType[]) => void
				) => {
					;(autocompleteService.current as any).getPlacePredictions(
						request,
						callback
					)
				},
				200
			),
		[]
	)

	React.useEffect(() => {
		let active = true

		if (!autocompleteService.current && (window as any).google) {
			autocompleteService.current = new (
				window as any
			).google.maps.places.AutocompleteService()
		}
		if (!autocompleteService.current) {
			return undefined
		}

		if (inputValue === '') {
			setOptions(value ? [value] : [])
			return undefined
		}

		fetch(
			{
				input: inputValue,
				types: ['(cities)'],
				componentRestrictions: { country: ['us', 'au', 'uk', 'ca', 'nz'] },
			},
			(results?: PlaceType[]) => {
				if (active) {
					let newOptions = [] as PlaceType[]

					if (value) {
						newOptions = [value]
					}

					if (results) {
						newOptions = [...newOptions, ...results]
					}

					setOptions(newOptions)
				}
			}
		)

		return () => {
			active = false
		}
	}, [value, inputValue, fetch])

	/* 	useEffect(() => {
		const city = query.city|| ''
		const state = query.state || ''
		const country =  query.country|| ''

	}, [query]) */
	return (
		<Autocomplete
			id='google-map-places'
			style={{ width: 225 }}
			className={classes.inputRoot}
			getOptionLabel={(option) =>
				typeof option === 'string' ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={(event: any, newValue: PlaceType | null, reason: string) => {
				setOptions(newValue ? [newValue, ...options] : options)
				setValue(newValue)
				//console.log('onChange:', newValue, 'reason', reason)
				if (reason === 'selectOption' && newValue) {
					if (
						newValue.structured_formatting.secondary_text === 'New Zealand' ||
						newValue.structured_formatting.secondary_text === 'UK'
					) {
						dispatch(
							setQuery({
								city: newValue.structured_formatting.main_text,
								country: newValue.structured_formatting.secondary_text,
							})
						)
						localStorage.city = newValue.structured_formatting.main_text
						localStorage.state = ''
						localStorage.country = newValue.structured_formatting.secondary_text
					} else {
						dispatch(
							setQuery({
								city: newValue.structured_formatting.main_text,
								state: newValue.terms[1].value,
								country: newValue.terms[2].value,
							})
						)

						localStorage.city = newValue.structured_formatting.main_text
						localStorage.state = newValue.terms[1].value
						localStorage.country = newValue.terms[2].value
					}
				}
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue)
			}}
			renderInput={(params) => (
				<TextField
					sx={{ top: '0px', padding: '0px' }}
					{...params}
					label='Type A City'
					variant='outlined'
					size='small'
					fullWidth
				/>
			)}
			renderOption={(props, option) => {
				const matches = (option as PlaceType).structured_formatting
					.main_text_matched_substrings
				const parts = parse(
					(option as PlaceType).structured_formatting.main_text,
					matches.map((match: any) => [
						match.offset,
						match.offset + match.length,
					])
				)

				return (
					<li {...props} key={Math.random().toString()}>
						<Grid container alignItems='center'>
							<Grid item>
								<LocationOnIcon className={classes.icon} />
							</Grid>
							<Grid item xs>
								{parts.map((part, index) => (
									<span
										key={index}
										style={{ fontWeight: part.highlight ? 700 : 400 }}
									>
										{part.text}
									</span>
								))}
								<Typography variant='body2' color='textSecondary'>
									{(option as PlaceType).structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					</li>
				)
			}}
		/>
	)
})

export default LocationBar
