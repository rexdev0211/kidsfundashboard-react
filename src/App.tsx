//import React from 'react'
import type { FC } from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

//import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@mui/material/styles'
import { StyledEngineProvider } from '@mui/material/styles'
import GlobalStyles from 'src/components/GlobalStyles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CookiesNotification from 'src/components/CookiesNotification'
import GoogleAnalytics from 'src/components/GoogleAnalytics'
import { AuthProvider } from 'src/contexts/FirebaseAuthContext'
import { createTheme } from 'src/theme'
import routes, { renderRoutes } from 'src/routes'
//import { GlobalToastContainer } from 'src/components/GlobalToastContainer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { THEMES } from 'src/constants'

const history = createBrowserHistory()

const App: FC = () => {
	const theme = createTheme({
		responsiveFontSizes: true,
		theme: THEMES.LIGHT,
	})

	return (
		<StyledEngineProvider injectFirst>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ThemeProvider theme={theme}>
					<Router history={history}>
						<AuthProvider>
							<GlobalStyles />
							<GoogleAnalytics />
							<CookiesNotification />
							{renderRoutes(routes)}
						</AuthProvider>
					</Router>
					<ToastContainer position='top-center' />
				</ThemeProvider>
			</LocalizationProvider>
		</StyledEngineProvider>
	)
}

export default App
