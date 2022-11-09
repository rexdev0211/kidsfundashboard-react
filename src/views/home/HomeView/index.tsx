//import React from 'react'
import type { FC } from 'react'
import { makeStyles } from '@mui/styles'
import Page from 'src/components/Page'
import FrontPage from './FrontPage'
//import Features from './Features';
//import Testimonials from './Testimonials';
//import CTA from './CTA';
//import FAQS from './FAQS';

const useStyles = makeStyles(() => ({
	root: {},
}))

const HomeView: FC = () => {
	const classes = useStyles()

	return (
		<Page className={classes.root} title='KIDSFUNCLOUD.COM'>
			<FrontPage />
		</Page>
	)
}

export default HomeView
