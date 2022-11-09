import { useEffect } from 'react'
import type { FC } from 'react'
import NProgress from 'nprogress'
import { Box, LinearProgress, Typography } from '@mui/material'
import type { Theme } from 'src/theme'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		alignItems: 'center',
		backgroundColor: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
		minHeight: '100%',
		padding: theme.spacing(3),
	},
}))

const LoadingScreen: FC = () => {
	const classes = useStyles()

	useEffect(() => {
		NProgress.start()

		return () => {
			NProgress.done()
		}
	}, [])

	return (
		<div className={classes.root}>
			<Box width={400}>
				<Typography>Kidsfuncloud.com</Typography>
				<LinearProgress />
			</Box>
		</div>
	)
}

export default LoadingScreen
