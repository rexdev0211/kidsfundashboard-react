import { Suspense, Fragment, lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'

import MainLayout from 'src/layouts/MainLayout'
import HomeView from 'src/views/home/HomeView'
import LoadingScreen from 'src/components/LoadingScreen'
import AuthGuard from 'src/components/AuthGuard'
import GuestGuard from 'src/components/GuestGuard'

type Routes = {
	exact?: boolean
	path?: string | string[]
	guard?: any
	layout?: any
	component?: any
	routes?: Routes
}[]

export const renderRoutes = (routes: Routes = []): JSX.Element => (
	<Suspense fallback={<LoadingScreen />}>
		<Switch>
			{routes.map((route, i) => {
				const Guard = route.guard || Fragment
				const Layout = route.layout || Fragment
				const Component = route.component

				return (
					<Route
						key={i}
						path={route.path}
						exact={route.exact}
						render={(props) => (
							// check each route's routes property first for sub routes. use recursive call to render
							<Guard>
								<Layout>
									{route.routes ? (
										renderRoutes(route.routes)
									) : (
										<Component {...props} />
									)}
								</Layout>
							</Guard>
						)}
					/>
				)
			})}
		</Switch>
	</Suspense>
)

const routes: Routes = [
	{
		exact: true,
		path: '/404',
		component: lazy(() => import('src/views/errors/NotFoundView')),
	},
	{
		exact: true,
		path: '/privacy',
		component: lazy(() => import('src/views/privacy')),
	},

	{
		exact: true,
		guard: GuestGuard,
		path: '/login',
		component: lazy(() => import('src/views/auth/LoginView')),
	},
	{
		exact: true,
		guard: GuestGuard,
		path: '/register',
		component: lazy(() => import('src/views/auth/RegisterView')),
	},
	{
		exact: true,
		guard: GuestGuard,
		path: '/afterregister',
		component: lazy(() => import('src/views/auth/AfterRegister')),
	},

	/* 	{
		exact: true,
		path: '/register-unprotected', // no guard
		component: lazy(() => import('src/views/auth/RegisterView')),
	}, */
	{
		path: '/app',
		guard: AuthGuard,
		layout: DashboardLayout,
		routes: [
			{
				exact: true,
				path: '/app/dashboard',
				component: lazy(() => import('src/views/parent/DashboardView')),
			},
			{
				exact: true,
				path: '/app/account',
				component: lazy(() => import('src/views/account/AccountView')),
			},
			{
				exact: true,
				path: '/app/host/mylist',
				component: lazy(() => import('src/views/host/HostedListView')),
			},
			{
				exact: true,
				path: '/app/host/club/edit/:clubid',
				component: lazy(() => import('src/views/host/EditClubView')),
			},
			{
				exact: true,
				path: '/app/club/:clubid',
				component: lazy(() => import('src/views/ClubDetailedView')),
			},
			{
				exact: true,
				path: '/app/club/:clubid/resource',
				component: lazy(() => import('src/views/resources/ClubResourceView')),
			},
			{
				exact: true,
				path: '/app/host/createclub',
				component: lazy(() => import('src/views/host/CreateClubView')),
			},
			{
				exact: true,
				path: '/app/host/confirm',
				component: lazy(() => import('src/views/host/HostConfirmView')),
			},
			{
				exact: true,
				path: '/app/parent/myrecommendations',
				component: lazy(() => import('src/views/parent/ClublistView')),
			},
			{
				exact: true,
				path: '/app/parent/club/edit/:clubid',
				component: lazy(() => import('src/views/parent/EditClubView')),
			},
			{
				exact: true,
				path: '/app/parent/recommendclub',
				component: lazy(
					() => import('src/views/parent/RecomNewClubView/RecomNewClubView')
				),
			},
			{
				exact: true,
				path: '/app/parent/interestlist',
				component: lazy(() => import('src/views/parent/FavoriteListView')),
			},
			{
				exact: true,
				path: '/app/dashboard/calendar',
				component: lazy(() => import('src/views/Calendar')),
			},
			{
				exact: true,
				path: '/app/club/dashboard/search',
				component: lazy(() => import('src/views/parent/DashboardView')),
			},
			{
				exact: true,
				path: '/app/club/dashboard',
				component: lazy(() => import('src/views/parent/DashboardView')),
			},
			{
				exact: true,
				path: '/app',
				component: () => <Redirect to='/app/dashboard' />,
			},

			{
				component: () => <Redirect to='/404' />,
			},
		],
	},
	{
		path: '*',
		layout: MainLayout,
		routes: [
			{
				exact: true,
				path: '/',
				component: HomeView,
			},
			{
				exact: true,
				path: '/donation',
				component: lazy(() => import('src/views/DonationPage')),
			},
			{
				exact: true,
				path: '/donationsuccess',
				component: lazy(() => import('src/views/DonationSuccess')),
			},
			{
				exact: true,
				guard: GuestGuard,
				path: '/passwordreset',
				component: lazy(() => import('src/views/PasswordReset')),
			},
			{
				exact: true,
				path: '/club/:clubid',
				component: lazy(() => import('src/views/ClubDetailedPubView')),
			},
			{
				component: () => <Redirect to='/404' />,
			},
		],
	},
]

export default routes
