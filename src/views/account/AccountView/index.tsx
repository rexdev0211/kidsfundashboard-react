import { useState } from 'react'
import type { FC, ChangeEvent } from 'react'
import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Page from 'src/components/Page'
import type { Theme } from 'src/theme'
import Header from './Header'
import General from './General'
//import Subscription from './Subscription'
import Notifications from './Notifications'
import Security from './Security'
//
import SwitchRolePage from './SwitchRolePage'
const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.default,
		minHeight: '100%',
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}))

const AccountView: FC = () => {
	const classes = useStyles()
	const [currentTab, setCurrentTab] = useState<string>('general')

	const tabs = [
		{ value: 'general', label: 'General' },
		//{ value: 'notifications', label: 'Notifications' },
		{ value: 'security', label: 'Security' },
		{ value: 'role', label: 'Switch Role' },
	]

	const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
		setCurrentTab(value)
	}

	return (
		<Page className={classes.root} title='Settings'>
			<Container maxWidth='lg'>
				<Header />
				<Box mt={3}>
					<Tabs
						onChange={handleTabsChange}
						scrollButtons='auto'
						value={currentTab}
						variant='scrollable'
						textColor='secondary'
					>
						{tabs.map((tab) => (
							<Tab key={tab.value} label={tab.label} value={tab.value} />
						))}
					</Tabs>
				</Box>
				<Divider />
				<Box mt={3}>
					{currentTab === 'general' && <General />}
					{currentTab === 'role' && <SwitchRolePage />}
					{false && currentTab === 'notifications' && <Notifications />}
					{currentTab === 'security' && <Security />}
				</Box>
			</Container>
		</Page>
	)
}

export default AccountView
