import { useState } from 'react'
//import { paramCase } from 'change-case'
//import eyeFill from '@iconify/icons-eva/eye-fill'
import { Link as RouterLink } from 'react-router-dom'
//import shareFill from '@iconify/icons-eva/share-fill'
//import messageCircleFill from '@iconify/icons-eva/message-circle-fill'
// material
import { styled } from '@mui/material/styles'
import {
	Box,
	Card,
	Grid,
	//Avatar,
	Typography,
	CardContent,
} from '@mui/material'
import { useDispatch } from 'src/store'
import { incClubRecom, decClubRecom } from 'src/slices/clubListSlice'
// utils
//import { fDateTimeShort } from 'src/utils/formatTime'
//import { fShortenNumber } from '../../../utils/formatNumber'

//import SvgIconStyle from 'src/components/SvgIconStyle'
//import { Link as linkIcon } from 'react-feather'
import { ClubSimInfo } from 'src/types/clubinfo'
import { useHistory } from 'react-router-dom'
//import { Star as StarIcon } from 'react-feather'
//import SvgIcon from '@mui/material/SvgIcon'
//import StarIcon from '@mui/icons-material/Star'
import EyeIcon from '@mui/icons-material/Visibility'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
// ----------------------------------------------------------------------

type ClubPostCardProps = {
	club: ClubSimInfo
	index: number
}
const CardMediaStyle = styled('div')(({ theme }) => ({
	position: 'relative',
	paddingTop: 'calc(100% * 3 / 4)',
}))

const TitleStyle = styled(RouterLink)(({ theme }) => ({
	...theme.typography.h5,
	height: 24,
	color: 'inherit',
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	textDecoration: 'none',
	textTransform: 'capitalize',
	'&:hover': {
		cursor: 'underline',
	},
}))
const CategoryStyle = styled('div')(({ theme }) => ({
	...theme.typography.subtitle2,
	height: 24,
	color: 'inherit',
	overflow: 'hidden',
	WebkitLineClamp: 2,
	display: '-webkit-box',
	WebkitBoxOrient: 'vertical',
	textDecoration: 'none',
	textTransform: 'capitalize',
}))

/* const AvatarStyle = styled(Avatar)(({ theme }) => ({
	zIndex: 9,
	width: 32,
	height: 32,
	position: 'absolute',
	left: theme.spacing(3),
	bottom: theme.spacing(-2),
})) */

const InfoStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-end',
	marginTop: theme.spacing(1),
	color: theme.palette.text.disabled,
}))

const CoverImgStyle = styled('img')(({ theme }) => ({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	'&:hover': {
		cursor: 'pointer',
	},
}))

// ----------------------------------------------------------------------

export default function ClubCard({ club, index }: ClubPostCardProps) {
	const {
		photoUrls,
		photoURL,
		clubName,
		clubCategories,
		clubid,
		//createdAt,
		city,
		state,
		country,
		recommendations,
		views,
	} = club
	//const { cover, clubName, view, comment, share, author, createdAt } = club
	//const linkTo = `${PATH_DASHBOARD.blog.root}/post/${paramCase(title)}`
	//const latestPostLarge = false
	//const latestPost = index === 1 || index === 2
	/* 	const commentNum = 100
	const viewNum = 200
	const shareNum = 300 */
	//const author = 'someone'
	const dispatch = useDispatch()
	const history = useHistory()
	const onClick = () => {
		history.push('/club/' + clubid)
	}
	const [favor, setFavor] = useState(false)
	const CLUB_INFO = [
		{ name: 'favorite', number: recommendations, icon: FavoriteOutlinedIcon },
		{ name: 'view', number: views, icon: EyeIcon },
		//{ number: shareNum, icon: linkIcon },
	]
	const onClickIcon = (event, index: number, clubid: string) => {
		if (CLUB_INFO[index].name === 'favorite') {
			if (!favor) {
				setFavor(true)
				try {
					dispatch(incClubRecom({ clubid }))
				} catch (err) {
					alert(err)
				}
			} else {
				setFavor(false)
				dispatch(decClubRecom({ clubid }))
			}
		}
		console.log(index)
	}
	return (
		<Grid item>
			<Card sx={{ position: 'relative', padding: '0', width: '200px' }}>
				<CardMediaStyle onClick={onClick}>
					{/* 					<SvgIconStyle
						color='paper'
						src='/static/icons/shape-avatar.svg'
						sx={{
							width: 80,
							height: 36,
							zIndex: 9,
							bottom: -15,
							position: 'absolute',
						}}
					/> */}
					{/* 					<AvatarStyle
						alt={'author.name'}
						src={'/static/images/avatars/avatar_6.png'}
					/> */}

					<CoverImgStyle
						alt={'title'}
						src={
							photoURL || photoUrls[0] || '/static/images/covers/cover_23.jpg'
						}
					/>
				</CardMediaStyle>

				<CardContent
					sx={{
						pt: 2,
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'row' }}>
						{/* 						<Typography
							gutterBottom
							variant='caption'
							sx={{ color: 'text.disabled', display: 'block' }}
						>
							Joined At {fDateTimeShort(createdAt)}
						</Typography> */}
						<Typography
							gutterBottom
							variant='caption'
							sx={{ display: 'block', textTransform: 'capitalize' }}
						>
							{city || state || country
								? (city || state || country).toLowerCase()
								: 'Unknown'}
						</Typography>
					</Box>
					<TitleStyle to={'/club/' + clubid}>{clubName}</TitleStyle>
					<CategoryStyle>{clubCategories.join(', ')}</CategoryStyle>
					<InfoStyle>
						{CLUB_INFO.map((info, index) => (
							<Box
								key={index}
								sx={{
									display: 'flex',
									alignItems: 'center',
									ml: 1.0,
								}}
							>
								<Box
									sx={{ width: 12, height: 12, mr: 1.5, mb: 1 }}
									onClick={(event) => onClickIcon(event, index, clubid)}
								>
									<info.icon fontSize='small' />
								</Box>
								<Typography variant='caption'>{info.number || 0}</Typography>
							</Box>
						))}
					</InfoStyle>
				</CardContent>
			</Card>
		</Grid>
	)
}
