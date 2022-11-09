import { useState } from 'react'
import type { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import type { Theme } from 'src/theme'
import useMediaQuery from '@mui/material/useMediaQuery'
import MainHeader from './MainHeader'
import MainSidebar from 'src/components/MainSidebar'
import Footer from 'src/components/Footer'
import { makeStyles } from '@mui/styles'
interface MainLayoutProps {
	children?: ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		height: '100%',
		width: '100%',
	},
	wrapper: {
		overflow: 'hidden',
		paddingTop: 64,
	},
	contentContainer: {
		display: 'flex',
		flex: '1 1 auto',
		overflow: 'hidden',
	},
	content: {
		flex: '1 1 auto',
		height: '100%',
		overflow: 'auto',
	},
}))

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
	const [openSidebar, setOpenSidebar] = useState(false)
	const classes = useStyles()
	const theme = useTheme()
	const isMd = useMediaQuery(theme.breakpoints.up('md'), {
		defaultMatches: true,
	})
	const open = isMd ? false : openSidebar
	if (process.env.NODE_ENV !== 'production') {
		console.log('open:', open, 'isMd:', isMd)
	}
	//const [isSidebarMobileOpen, setIsSidebarMobileOpen] = useState<boolean>(false)
	return (
		<div className={classes.root}>
			<MainHeader onSidebarMobileOpen={(): void => setOpenSidebar(true)} />
			<MainSidebar
				onMobileClose={(): void => setOpenSidebar(false)}
				openMobile={open}
			/>

			<div className={classes.wrapper}>{children}</div>
			<Footer />
		</div>
	)
}

MainLayout.propTypes = {
	children: PropTypes.node,
}

export default MainLayout
