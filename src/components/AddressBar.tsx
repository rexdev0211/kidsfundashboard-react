import React from 'react'
import TextField from '@mui/material/TextField'
//import Autocomplete from '@mui/lab/Autocomplete'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
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
}))

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
}

export default function GoogleMaps() {
	const classes = useStyles()
	const [value, setValue] = React.useState<PlaceType | null>(null)
	const [inputValue, setInputValue] = React.useState('')
	const [options, setOptions] = React.useState<PlaceType[]>([])
	const loaded = React.useRef(false)

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
					request: { input: string },
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

		fetch({ input: inputValue }, (results?: PlaceType[]) => {
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
		})

		return () => {
			active = false
		}
	}, [value, inputValue, fetch])

	return (
		<Autocomplete
			id='google-map-demo'
			style={{ width: 300 }}
			getOptionLabel={(option) =>
				typeof option === 'string' ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={(event: any, newValue: PlaceType | null) => {
				setOptions(newValue ? [newValue, ...options] : options)
				setValue(newValue)
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue)
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Add a location'
					variant='outlined'
					fullWidth
				/>
			)}
			renderOption={(option) => {
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
				)
			}}
		/>
	)
}
