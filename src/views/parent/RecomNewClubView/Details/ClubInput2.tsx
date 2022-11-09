import { useState, useEffect } from 'react'
import type { FC, FormEvent } from 'react'
import PropTypes from 'prop-types'

import clsx from 'clsx'
import {
	Box,
	Button,
	Card,
	CardHeader,
	CardContent,
	Divider,
	FormHelperText,
	Typography,
	//Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
//import LockOpenIcon from '@mui/icons-material/LockOpenOutlined'
//import PersonIcon from '@mui/icons-material/PersonOutline'
import type { Theme } from 'src/theme'
//import Label from 'src/components/Label'

import FileDropzone from 'src/components/FileDropzone'
import {
	//saveClubInfoData,
	//updateClubInfoData,
	selectClubInfo,
	//uploadThumbFiles,
	uploadFiles,
} from 'src/slices/clubinfoSlice'
import { useDispatch, useSelector } from 'src/store'

interface ClubInput2Props {
	className?: string
	onComplete?(): void
	onBack?: (clubid: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	button: {
		paddingTop: '20px',
		paddingBottom: '20px',
		paddingLeft: '10px',
		paddingRight: '20px',
	},
	fontWeightMedium: {
		fontWeight: theme.typography.fontWeightMedium,
	},
	img: {
		display: 'block',
		width: 'auto',
		height: '100%',
	},
	thumb: {
		display: 'inline-flex',
		borderRadius: 2,
		border: '1px solid #eaeaea',
		marginBottom: 8,
		marginRight: 8,
		width: 100,
		height: 100,
		padding: 4,
	},
	thumbsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 16,
	},
	thumbInner: {
		display: 'flex',
		minWidth: 0,
		overflow: 'hidden',
	},
}))

function ImageThumbs(props: { photoUrls: string[] }) {
	const classes = useStyles()
	const { photoUrls } = props
	const thumbs = photoUrls.map((photoUrl, key) => (
		<Box className={classes.thumb} key={key}>
			<div className={classes.thumbInner}>
				<img alt={key.toString()} src={photoUrl} className={classes.img} />
			</div>
		</Box>
	))

	return <Box className={classes.thumbsContainer}>{thumbs}</Box>
}

const ClubInput2: FC<ClubInput2Props> = ({
	onBack,
	onComplete,
	className,
	...rest
}) => {
	const classes = useStyles()
	const [files, setFiles] = useState<any[]>([])
	const [isSubmitting, setSubmitting] = useState<boolean>(false)
	let clubInfo = useSelector(selectClubInfo)
	const [clubid, setClubid] = useState('')
	const [error, setError] = useState<string | null>(null)
	const dispatch = useDispatch()
	//const photoUrls = clubInfo.photoUrls
	const photoThumbUrls = clubInfo.photoThumbUrls

	const handleDrop = async (newFiles: File[]) => {
		console.log(newFiles)

		setFiles((prevFiles) => {
			const filesWithPreview = newFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
			return [...prevFiles, ...filesWithPreview]
		})
	}
	const handleUpload = async () => {
		dispatch(uploadFiles(files, clubInfo.clubid)) // upload original files to AWS S3
		//dispatch(uploadThumbFiles(files, clubInfo.clubid)) // create thumb images and upload them to AWS  S3.
		//dispatch(updateClubInfoData({ photoThumbUrls, photoUrls, clubid }))
		setFiles([])
	}
	const handleRemove = (file): void => {
		console.log(file, typeof file)
		setFiles((prevFiles) =>
			prevFiles.filter((_file) => _file.path !== file.path)
		)
	}

	const handleRemoveAll = (): void => {
		setFiles([])
	}

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()

		try {
			setSubmitting(true)

			// NOTE: Make API request
			// dispatch(updateClubInfoData({ photoUrls, clubid }))
			if (onComplete) {
				onComplete()
			}
		} catch (err) {
			console.error(err)
			setError(err.message)
		} finally {
			setSubmitting(false)
		}
	}

	useEffect(() => {
		setClubid(clubInfo.clubid)
	}, [clubInfo.clubid])

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardHeader title='Upload Pictures' />
			<Divider variant='middle' />
			<Typography variant='body1' color='inherit'>
				Current Photos
			</Typography>
			<ImageThumbs photoUrls={photoThumbUrls} />
			<form
				onSubmit={handleSubmit}
				className={clsx(classes.root, className)}
				{...rest}
			>
				{error && (
					<Box mt={2}>
						<FormHelperText error>{error}</FormHelperText>
					</Box>
				)}
				<CardContent>
					<FileDropzone
						accept='image/*'
						files={files}
						onDrop={handleDrop}
						onUpload={handleUpload}
						onRemove={handleRemove}
						onRemoveAll={handleRemoveAll}
						maxFiles={8}
					/>
				</CardContent>
				<Box display='flex' flexDirection='row' className={classes.button}>
					{onBack && (
						<Button
							onClick={() => {
								onBack(clubid)
							}}
							size='medium'
							color='secondary'
							variant='contained'
						>
							Previous
						</Button>
					)}
					<Box flexGrow={1} />
					<Button
						color='secondary'
						disabled={isSubmitting}
						type='submit'
						variant='contained'
						size='large'
					>
						Skip
					</Button>
					<Button
						color='secondary'
						disabled={isSubmitting}
						type='submit'
						variant='contained'
						size='large'
					>
						Finish
					</Button>
				</Box>
			</form>
		</Card>
	)
}

ClubInput2.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
	//customer: PropTypes.object.isRequired,
}

export default ClubInput2
