import type { FC } from 'react'
import PropTypes from 'prop-types'
//import toast from 'react-hot-toast';
import { addMinutes, format } from 'date-fns'
import * as Yup from 'yup'
import { Formik } from 'formik'

import {
	Box,
	Button,
	Divider,
	FormControlLabel,
	FormHelperText,
	IconButton,
	Switch,
	TextField,
	Typography,
} from '@mui/material'
import TrashIcon from 'src/icons/Trash'
import { createEvent, deleteEvent, updateEvent } from 'src/slices/calendarSlice'
import { useDispatch } from 'src/store'
import type { CalendarEvent } from 'src/types/calendar'
import { toast } from 'react-toastify'
interface CalendarEventFormProps {
	event?: CalendarEvent
	onAddComplete?: () => void
	onCancel?: () => void
	onDeleteComplete?: () => void
	onEditComplete?: () => void
	range?: { start: number; end: number }
}

interface FormValues {
	allDay: boolean
	color: string
	description: string
	resourceId: string
	end: Date
	start: Date
	nativestart: string
	nativeend: string
	title: string
	submit: any
}

const getInitialValues = (
	event?: CalendarEvent,
	range?: { start: number; end: number }
): FormValues => {
	if (event) {
		console.log('start', event.start)
		return {
			allDay: event.allDay || false,
			color: event.color || '',
			resourceId: event.resourceId || '',
			description: event.description || '',
			end: event.end ? new Date(event.end) : addMinutes(new Date(), 30),
			start: event.start ? new Date(event.start) : new Date(),
			nativestart: event.start
				? format(new Date(event.start), "yyyy-MM-dd'T'HH:mm")
				: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
			nativeend: event.start
				? format(new Date(event.end), "yyyy-MM-dd'T'HH:mm")
				: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
			title: event.title || '',
			submit: null,
		}
	}

	if (range) {
		return {
			allDay: false,
			color: '',
			description: '',
			resourceId: '',
			end: new Date(range.end),
			start: new Date(range.start),
			nativestart: format(new Date(range.start), "yyyy-MM-dd'T'HH:mm"),
			nativeend: format(new Date(range.end), "yyyy-MM-dd'T'HH:mm"),
			title: '',
			submit: null,
		}
	}

	return {
		allDay: false,
		color: '',
		description: '',
		resourceId: '',
		end: addMinutes(new Date(), 30),
		start: new Date(),
		nativestart: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
		nativeend: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
		title: '',
		submit: null,
	}
}

const CalendarEventForm: FC<CalendarEventFormProps> = (props) => {
	const {
		event,
		onAddComplete,
		onCancel,
		onDeleteComplete,
		onEditComplete,
		range,
	} = props
	const dispatch = useDispatch()

	const handleDelete = async (): Promise<void> => {
		try {
			await dispatch(deleteEvent(event.id))

			onDeleteComplete?.()
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<Formik
			initialValues={getInitialValues(event, range)}
			validationSchema={Yup.object().shape({
				allDay: Yup.bool(),
				description: Yup.string().max(5000),
				end: Yup.date().when(
					'start',
					(start, schema) =>
						start && schema.min(start, 'End date must be later than start date')
				),
				start: Yup.date(),
				title: Yup.string().max(255).required('Title is required'),
			})}
			onSubmit={async (
				values,
				{ resetForm, setErrors, setStatus, setSubmitting }
			): Promise<void> => {
				try {
					const data = {
						allDay: values.allDay,
						resourceId: values.resourceId,
						description: values.description,
						end: new Date(values.nativeend).getTime(), // convert string to Date obj
						start: new Date(values.nativestart).getTime(), // convert string to Date obj
						title: values.title,
					}

					if (event) {
						await dispatch(updateEvent(event.id, data))
					} else {
						await dispatch(createEvent(data))
					}

					resetForm()
					setStatus({ success: true })
					setSubmitting(false)
					//alert('Calendar updated!')
					toast.info('Calendar updated!')
					if (!event && onAddComplete) {
						onAddComplete()
					}

					if (event && onEditComplete) {
						onEditComplete()
					}
				} catch (err) {
					console.error(err)
					//alert('Something went wrong!')
					toast.error('Something went wrong!')
					setStatus({ success: false })
					setErrors({ submit: err.message })
					setSubmitting(false)
				}
			}}
		>
			{({
				errors,
				handleBlur,
				handleChange,
				handleSubmit,
				isSubmitting,
				setFieldValue,
				touched,
				values,
			}): JSX.Element => (
				<form onSubmit={handleSubmit}>
					<Box sx={{ p: 3 }}>
						<Typography
							align='center'
							color='textPrimary'
							gutterBottom
							variant='h5'
						>
							{event ? 'Edit Event' : 'Add Event'}
						</Typography>
					</Box>
					<Box sx={{ p: 3 }}>
						<TextField
							error={Boolean(touched.title && errors.title)}
							fullWidth
							helperText={touched.title && errors.title}
							label='Title'
							name='title'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.title}
							variant='outlined'
						/>
						<Box sx={{ mt: 2 }}>
							<TextField
								error={Boolean(touched.resourceId && errors.resourceId)}
								fullWidth
								helperText={touched.resourceId && errors.resourceId}
								label='resourceId'
								name='resourceId'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.resourceId}
								variant='outlined'
							/>
						</Box>
						<Box sx={{ mt: 2 }}>
							<TextField
								error={Boolean(touched.description && errors.description)}
								fullWidth
								helperText={touched.description && errors.description}
								label='Description'
								name='description'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.description}
								variant='outlined'
							/>
						</Box>
						<Box sx={{ mt: 2 }}>
							<FormControlLabel
								control={
									<Switch
										checked={values.allDay}
										color='primary'
										name='allDay'
										onChange={handleChange}
									/>
								}
								label='All day'
							/>
						</Box>
						<Box sx={{ mt: 2 }}>
							<TextField
								id='datetime-start'
								label='Start Date'
								type='datetime-local'
								//defaultValue='2017-05-24T10:30'
								onChange={(event) => {
									setFieldValue('nativestart', event.target.value)
								}}
								value={values.nativestart}
								sx={{ width: 250 }}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							{/* 							<MobileDateTimePicker
								label='Start date'
								onChange={(date) => setFieldValue('start', date)}
								renderInput={(inputProps) => (
									<TextField fullWidth variant='outlined' {...inputProps} />
								)}
								value={values.start}
							/> */}
						</Box>
						<Box sx={{ mt: 2 }}>
							<TextField
								id='datetime-end'
								label='End Date'
								type='datetime-local'
								//defaultValue='2017-05-24T10:30'
								onChange={(event) => {
									setFieldValue('nativeend', event.target.value)
								}}
								value={values.nativeend}
								sx={{ width: 250 }}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							{/* 							<MobileDateTimePicker
								label='End date'
								onChange={(date) => setFieldValue('end', date)}
								renderInput={(inputProps) => (
									<TextField fullWidth variant='outlined' {...inputProps} />
								)}
								value={values.end}
							/> */}
						</Box>
						{Boolean(touched.end && errors.end) && (
							<Box sx={{ mt: 2 }}>
								<FormHelperText error>{errors.end}</FormHelperText>
							</Box>
						)}
					</Box>
					<Divider />
					<Box
						sx={{
							alignItems: 'center',
							display: 'flex',
							p: 2,
						}}
					>
						{event && (
							<IconButton onClick={(): Promise<void> => handleDelete()}>
								<TrashIcon fontSize='small' />
							</IconButton>
						)}
						<Box sx={{ flexGrow: 1 }} />
						<Button color='primary' onClick={onCancel} variant='text'>
							Cancel
						</Button>
						<Button
							color='primary'
							disabled={isSubmitting}
							sx={{ ml: 1 }}
							type='submit'
							variant='contained'
						>
							Confirm
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	)
}

CalendarEventForm.propTypes = {
	// @ts-ignore
	event: PropTypes.object,
	onAddComplete: PropTypes.func,
	onCancel: PropTypes.func,
	onDeleteComplete: PropTypes.func,
	onEditComplete: PropTypes.func,
	// @ts-ignore
	range: PropTypes.object,
}

export default CalendarEventForm
