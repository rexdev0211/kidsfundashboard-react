//import React from 'react'
import type { FC } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
	Box,
	Container,
	//Grid,
} from '@mui/material'
import type { Theme } from 'src/theme'
import { makeStyles } from '@mui/styles'
//import { setAnonymAuthToken } from 'src/utils/axios'
import SearchPage from 'src/views/home/HomeView/SearchPage'
import NewclubsBox from 'src/components/NewclubsBox'
import Hero from './HeroBar'
interface HeroProps {
	className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		paddingTop: 10,
		paddingBottom: 200,
		[theme.breakpoints.down('md')]: {
			paddingTop: 60,
			paddingBottom: 60,
		},
	},
	technologyIcon: {
		height: 40,
		margin: theme.spacing(1),
	},
	image: {
		perspectiveOrigin: 'left center',
		transformStyle: 'preserve-3d',
		perspective: 1500,
		'& > img': {
			maxWidth: '90%',
			height: 'auto',
			transform: 'rotateY(-35deg) rotateX(15deg)',
			backfaceVisibility: 'hidden',
			boxShadow: theme.shadows[16],
		},
	},
	shape: {
		position: 'absolute',
		top: 0,
		left: 0,
		'& > img': {
			maxWidth: '90%',
			height: 'auto',
		},
	},
}))

const FrontPage: FC<HeroProps> = ({ className, ...rest }) => {
	const classes = useStyles()
	//setAnonymAuthToken() // -no longer needed as we don't auth check for club list.
	return (
		<div className={clsx(classes.root, className)} {...rest}>
			<Box
			//sx={{ backgroundImage: 'url("/static/images/tennis_coaching.jpg")' }}
			>
				<Hero />
				<Container sx={{ opacity: 0.95, paddingTop: '10px' }}>
					<NewclubsBox />
					<SearchPage />
				</Container>
			</Box>
		</div>
	)
}

FrontPage.propTypes = {
	className: PropTypes.string,
}

export default FrontPage
