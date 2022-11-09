//import React from 'react'
//import { Icon } from '@iconify/react'
//import { paramCase } from 'change-case'
//import eyeFill from '@iconify/icons-eva/eye-fill'
//import { Link as RouterLink } from 'react-router-dom'
//import shareFill from '@iconify/icons-eva/share-fill'
//import messageCircleFill from '@iconify/icons-eva/message-circle-fill'
// material
import { makeStyles } from '@mui/styles'
import {
	//Box,
	Card,
	CardMedia,
	CardActionArea,
	Grid,
	//Avatar,
	Typography,
	CardContent,
} from '@mui/material'
import { useHistory } from 'react-router-dom'
// routes
//import { PATH_DASHBOARD } from '../../routes/paths'
// utils
//import { fDate } from '../../utils/formatTime'
//import { fShortenNumber } from '../../utils/formatNumber'
// @types
import { ClubSimInfo } from 'src/types/clubinfo'
//
//import SvgIconStyle from './SvgIconStyle'

// ----------------------------------------------------------------------
/* 
const CardMediaStyle = styled('div')(({ theme }) => ({
	position: 'relative',
	paddingTop: 'calc(100% * 3 / 4)',
}))

const TitleStyle = styled(RouterLink)(({ theme }) => ({
	height: 44,
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
	},
})) */
/* 
const AvatarStyle = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: 'absolute',
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
}))

const InfoStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(3),
	color: theme.palette.text.disabled,
})) 

const CoverImgStyle = styled('img')(({ theme }) => ({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
}))
*/
// ----------------------------------------------------------------------

type ClubPostCardProps = {
	club: ClubSimInfo
	index: number
}
const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	card: {
		maxWidth: '200px',
		maxHeight: '300px',
		borderRadius: '20px',
		overflow: 'hidden',
	},
	imgContainer: {
		width: '100%',
		display: 'block',
		height: '200px',
		overflow: 'hidden',
	},
	media: {
		maxWidth: '100%',
		maxHeight: '100%',
		display: 'block',
		//height: '100%',
		//objectFit: 'cover',
		//position: 'absolute',
	},
})

export default function ClubPostCard({ club, index }: ClubPostCardProps) {
	const { photoUrls, photoURL, clubName, clubCategories, clubid } = club
	//const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`
	//console.log('club:', club)
	const history = useHistory()
	const onClick = () => {
		history.push('/app/host/club/' + clubid)
	}
	const classes = useStyles()
	return (
		<Grid item key={'club_' + club.clubid}>
			<Card className={classes.card}>
				<CardActionArea onClick={onClick}>
					<div className={classes.imgContainer}>
						<CardMedia
							component='img'
							className={classes.media}
							image={
								photoURL || photoUrls[0] || '/static/images/covers/cover_23.jpg'
							}
							title='Contemplative Title'
						/>
					</div>
				</CardActionArea>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{clubName}
					</Typography>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
						style={{ textTransform: 'capitalize' }}
					>
						{clubCategories.join(', ')}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	)
}
