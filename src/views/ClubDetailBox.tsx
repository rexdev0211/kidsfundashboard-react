import { useState, useEffect } from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Markdown from 'react-markdown'
//import { Link as RouterLink } from 'react-router-dom'
import {
	Box,
	Chip,
	Card,
	CardContent,
	Grid,
	IconButton,
	Typography,
	FormLabel,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
//import ImageGallery from "react-image-gallery";
//import ImageGallery from 'src/components/image-gallery/ImageGallery'
import { makeStyles } from '@mui/styles'
import CheckOptionDisplay from './host/CheckOptionDisplay'
import type { Theme } from 'src/theme'
import type { ClubInfo } from 'src/types/clubinfo'
//import 'src/components/image-gallery/image-gallery.css'
import Carousel from 'react-gallery-carousel'
import 'react-gallery-carousel/dist/index.css'

//import ImgsViewer from 'react-images-viewer'
interface ClubDetailBoxProps {
	className?: string
	club: ClubInfo
	edit?: Boolean
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {},
	markdown: {
		fontFamily: theme.typography.fontFamily,
		'& p': {
			marginBottom: theme.spacing(2),
		},
		color: theme.palette.text.primary,
		letterSpacing: '0px',
		lineHeight: 1.5,
	},

	CheckOption: {
		lineHeight: 1.5,
		color: theme.palette.text.secondary,
	},
	subtitle: {
		lineHeight: 1.5,
	},
	infoColor: {
		color: theme.palette.text.secondary,
	},
	Prompt: {
		alignItems: 'center',
		'& .MuiFormLabel-root': {
			color: 'black',
		},
		marginTop: '5px',
	},
	galleryContainer: {
		marginTop: '20px',
		marginBottom: '40px',
		display: 'block',
		height: '700px',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			height: '400px',
		},

		//overflow: 'scroll',
		//overflow:'inline-block',
	},
	galleryContainerMobile: {
		marginTop: '20px',
		marginBottom: '20px',
		display: 'block',
		height: '400px',
		width: '100%',
		//overflow: 'scroll',
		//overflow:'inline-block',
	},

	topbox: {
		display: 'block',
		maxHeight: '750px',
	},
	address: {
		textTransform: 'capitalize',
	},
}))

const ClubDetailBox: FC<ClubDetailBoxProps> = ({
	className,
	club,
	...rest
}) => {
	const classes = useStyles()
	const [images, setImages] = useState([])
	const mobile = useMediaQuery('(max-width:600px)')
	const onClick = () => {}

	useEffect(() => {
		setImages(
			club.photoUrls.map((picUrl, index) => {
				return {
					src: picUrl,
					thumbnail: club.photoThumbUrls[index],
					//originalClass: "container",
					//sizes: { maxHeight: "600px" },
				}
			})
		)
	}, [club.photoUrls, club.photoThumbUrls])

	return (
		<Card className={clsx(classes.root, className)} {...rest}>
			<CardContent>
				<Grid container spacing={3}>
					<Grid item xs={12} md={8}>
						<Box className={classes.topbox}>
							<Typography variant='h2' color='textPrimary'>
								{club.clubName}
							</Typography>
							<Box sx={{ display: 'flex', flexDirection: 'row', pt: '3px' }}>
								<Typography
									sx={{ fontWeight: 'bold' }}
									variant='body1'
									color='textPrimary'
								>
									{club.views || 0}
								</Typography>
								<Typography variant='body1' color='textPrimary'>
									&nbsp; Views
								</Typography>
							</Box>
							<Box mt={3}>
								<Typography variant='subtitle2' color='textPrimary'>
									Main Activities
								</Typography>
								<Box mt={1}>
									{club.clubCategories.map((tag) => (
										<Chip key={tag} variant='outlined' label={tag} />
									))}
								</Box>
							</Box>
						</Box>
					</Grid>
					{/* 							<FileDropzone
								accept='image/*'
								files={files}
								onDrop={handleDrop}
								onUpload={handleUpload}
								onRemove={handleRemove}
								onRemoveAll={handleRemoveAll}
								maxFiles={8}
							/> */}
					{Array.isArray(club.photoUrls) && club.photoUrls.length > 0 && (
						<Box className={classes.galleryContainer}>
							<Box className='carousel-container'>
								{/*<ImageGallery
								showIndex={true}
								items={images}
								//useBrowserFullscreen={false}
							/> */}

								<Carousel
									images={images}
									style={
										mobile
											? { height: 400, width: 330 }
											: { height: 750, width: 800 }
									}
									hasIndexBoard={'bottomRight'}
								/>
							</Box>
						</Box>
					)}

					<Grid item xs={12} md={8}>
						<Box mt={3} className={classes.subtitle}>
							<Typography
								variant='subtitle2'
								sx={{ fontWeight: 'bold' }}
								color='textPrimary'
							>
								Description
							</Typography>
							<Markdown
								className={classes.markdown}
								children={
									club.description ||
									'This club has not added any introduction yet.'
								}
							/>
						</Box>

						<Box mt={3} className={classes.CheckOption}>
							<Typography
								variant='subtitle2'
								sx={{ fontWeight: 'bold' }}
								color='textPrimary'
							>
								Class Information
							</Typography>

							<CheckOptionDisplay
								checklist={[
									{
										checked: club.onlineClass,
										name: 'onlineClass',
										label: 'Yes',
									},
								]}
								label='Online class?'
							/>
							<CheckOptionDisplay
								checklist={[
									{
										checked: club.beginnerClass,
										name: 'beginnerClass',
										label: 'Beginner Class',
									},
									{
										checked: club.intermediateClass,
										name: 'intermediateClass',
										label: 'Intermediate Class',
									},
									{
										checked: club.advancedClass,
										name: 'advancedClass',
										label: 'Advanced Class',
									},
								]}
								label='Class level'
							/>
							<CheckOptionDisplay
								checklist={[
									{
										checked: club.privateClass,
										name: 'privateClass',
										label: 'Yes',
									},
								]}
								label='Private class'
							/>
							<CheckOptionDisplay
								checklist={[
									{
										checked: club.freetrialClass,
										name: 'freetrialClass',
										label: 'Yes',
									},
								]}
								label='Free trial class offered'
							/>
							<Grid container className={classes.Prompt}>
								<Grid item sm={3} xs={12}>
									<FormLabel component='legend'> Price Range </FormLabel>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography>
										{' '}
										${club.priceMin}- ${club.priceMax || '?'}{' '}
									</Typography>
								</Grid>
							</Grid>
						</Box>
						<Box mt={3} className={clsx(classes.subtitle, className)}>
							<Typography
								variant='subtitle2'
								sx={{ fontWeight: 'bold' }}
								color='textPrimary'
							>
								Contact Information
							</Typography>
							<Grid container className={clsx(classes.Prompt, className)}>
								<Grid item sm={3} xs={12}>
									<FormLabel component='legend'> Phone </FormLabel>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography className={classes.infoColor}>
										{club.clubPhone || ' '}
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<FormLabel component='legend'> Email Address </FormLabel>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography className={classes.infoColor}>
										{club.clubEmail}
									</Typography>
								</Grid>
								<Grid item sm={3} xs={12}>
									<FormLabel component='legend'> Location </FormLabel>
								</Grid>
								<Grid item sm={9} xs={12}>
									<Typography className={(classes.infoColor, classes.address)}>
										{club.streetAddress}&nbsp; {club.city}&nbsp; {club.state}{' '}
										&nbsp;
										{club.postalCode}
									</Typography>
								</Grid>
							</Grid>
						</Box>
						<Box mt={3} className={clsx(classes.subtitle, className)}>
							<Typography
								variant='subtitle2'
								sx={{ fontWeight: 'bold' }}
								color='textPrimary'
							>
								Links
							</Typography>
							<Grid container className={clsx(classes.Prompt, className)}>
								<Grid item sm={3} xs={12}>
									{club.socialLink1 && (
										<IconButton
											href={club.socialLink1}
											onClick={() => onClick()}
										>
											<img alt='Insta' src='/static/images/globe_link.svg' />
										</IconButton>
									)}
									{club.socialLink2 && club.socialLink2.includes('instagram') && (
										<IconButton href={club.socialLink2}>
											<img alt='Insta' src='/static/images/instagram.svg' />
										</IconButton>
									)}
									{club.socialLink3 && club.socialLink3.includes('facebook') && (
										<IconButton href={club.socialLink3}>
											<img
												alt='facebook'
												src='/static/images/icons8-facebook.svg'
											/>
										</IconButton>
									)}
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}

ClubDetailBox.propTypes = {
	className: PropTypes.string,
	// @ts-ignore
}

export default ClubDetailBox
