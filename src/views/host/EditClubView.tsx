// This component is to edit club info data.
// It needs clubid as parameter which is obtained from url by match.params.clubid.
import { useEffect } from 'react'
import type { FC } from 'react'
import { Box, Container } from '@mui/material'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import { makeStyles } from '@mui/styles'
import Header from './CreateClubView/Header'
import CreateClubSteps from './CreateClubView/Details/CreateClubSteps'
import { selectUserApiToken } from 'src/slices/userprofileSlice'
import { useSelector } from 'src/store'

import {
	getClubInfoData,
	selectClubLoadingStatus,
} from 'src/slices/clubinfoSlice'
import { useDispatch } from 'src/store'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}))

const EditClubView: FC<{ match }> = ({ match }) => {
	const classes = useStyles()
	const clubid = match.params.clubid
	const dispatch = useDispatch()
	const userApiToken = useSelector(selectUserApiToken)
	const isClubLoading = useSelector(selectClubLoadingStatus)

	console.log('Edit Club:', clubid)
	useEffect(() => {
		if (userApiToken) {
			// make sure token is ready before loading club info from server
			dispatch(getClubInfoData({ clubid: clubid }))
		}
	}, [dispatch, clubid, userApiToken])

	if (isClubLoading) {
		return (
			<Page className={classes.root} title='Edit A Club'>
				<Container maxWidth={false}>
					<Header title='Edit' />
					<Box mt={9}>Loading ...</Box>
				</Container>
			</Page>
		)
	}
	return (
		<Page className={classes.root} title='Edit A Club'>
			<Container maxWidth={false}>
				<Header title='Edit A Club' />
				<Box mt={9}>
					<CreateClubSteps title='Edit A Club' />
				</Box>
			</Container>
		</Page>
	)
}

export default EditClubView
