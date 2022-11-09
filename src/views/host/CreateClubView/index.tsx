//import React from 'react'
import type { FC } from 'react'
import { Box, Container } from '@mui/material'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import { makeStyles } from '@mui/styles'
import Header from './Header'
import CreateClubSteps from './Details/CreateClubSteps'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}))

const CreateClubView: FC = () => {
	const classes = useStyles()

	return (
		<Page className={classes.root} title='Create A Club'>
			<Container maxWidth={false}>
				<Header title='Create A Club' />
				<Box mt={9}>
					<CreateClubSteps title='Create A Club' />
				</Box>
			</Container>
		</Page>
	)
}

export default CreateClubView
