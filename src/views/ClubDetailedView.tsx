import { useEffect } from 'react'
import type { FC } from 'react'
import { Box, Grid, Container } from '@mui/material'
import type { Theme } from 'src/theme'
import Page from 'src/components/Page'
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'
import Header from './ClubDetailedHeader'
import {
	getClubInfoData,
	selectClubLoadingStatus,
} from 'src/slices/clubinfoSlice'
import { selectUserApiToken } from 'src/slices/userprofileSlice'
import { useDispatch, useSelector } from 'src/store'
import { selectClubInfo } from 'src/slices/clubinfoSlice'
import ClubDetailBox from './ClubDetailBox'
import useAuth from 'src/hooks/useAuth'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}))

const ClubDetailedView: FC<{ match }> = ({ match }) => {
	const classes = useStyles()
	const clubid = match.params.clubid
	const dispatch = useDispatch()
	const { user } = useAuth() as any
	const userApiToken = useSelector(selectUserApiToken)
	const isClubLoading = useSelector(selectClubLoadingStatus)
	const clubInfo = useSelector(selectClubInfo)
	useEffect(() => {
		if (userApiToken) {
			// make sure token is ready before loading club info from server
			dispatch(getClubInfoData({ clubid: clubid }))
		}
	}, [dispatch, clubid, userApiToken])
	//console.log('View Club Details')
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
		<Page className={classes.root} title='Club Details'>
			<Container maxWidth={'xl'}>
				<Header title={clubInfo.clubName} role={user.Role} />
				<Grid className={clsx(classes.root)} container spacing={1}>
					<Grid item lg={10} xl={10} xs={12}>
						<ClubDetailBox club={clubInfo} edit={true} />
					</Grid>
				</Grid>
			</Container>
		</Page>
	)
}

export default ClubDetailedView
