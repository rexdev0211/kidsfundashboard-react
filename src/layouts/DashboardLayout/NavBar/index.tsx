/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import {
  Avatar,
  Box,
  //Chip,
  Divider,
  Drawer,
  Link,
  List,
  ListSubheader,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import {
  //Lock as LockIcon,
  //UserPlus as UserPlusIcon,
  //AlertCircle as AlertCircleIcon,

  List as ListIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Calendar as CalendarIcon,
  Heart as HearttIcon,
  Folder as FolderIcon,
  //Users as UsersIcon,
} from 'react-feather'
//import Logo from 'src/components/Logo'
import useAuth from 'src/hooks/useAuth'
import NavItem from './NavItem'
import { selectUser } from 'src/slices/userprofileSlice'
import { useSelector } from 'src/store'

interface NavBarProps {
  onMobileClose: () => void
  openMobile: boolean
}

interface Item {
  href?: string
  icon?: ReactNode
  info?: ReactNode
  items?: Item[]
  title: string
}

interface Section {
  items: Item[]
  subheader: string
  displayForRole?: string
}

const sections: Section[] = [
  {
    subheader: 'Manage Clubs',
    items: [
      {
        title: 'Create A Club',
        icon: StarIcon,
        href: '/app/host/createclub',
      },
      {
        title: 'My Club List',
        icon: ListIcon,
        href: '/app/host/mylist',
      },
      // {
      // 	exact: true,
      // 	path: '/app/calendar',
      // 	component: lazy(() => import('src/views/calendar/CalendarView'))
      //     },
    ],
    displayForRole: 'Owner',
  },
  {
    subheader: 'Tools',
    items: [
      {
        title: 'Club Calendar',
        icon: CalendarIcon,
        href: '/app/dashboard/calendar',
      },
    ],
  },
  {
    subheader: 'My Clubs',
    items: [
      {
        title: 'Recommend A Club',
        icon: HearttIcon,
        href: '/app/parent/recommendclub',
      },
      {
        title: 'My Recommendations',
        icon: StarIcon,
        href: '/app/parent/myrecommendations',
      },
      /* 			{
				title: 'My Kids Clubs',
				icon: StarIcon,
				href: '/app/parent/mylist',
			}, */
      {
        title: 'Interest List',
        icon: FolderIcon,
        href: '/app/parent/interestlist',
      },
    ],
    displayForRole: 'Parent',
  },

  {
    subheader: 'Account',
    items: [
      {
        title: 'Settings',
        href: '/app/account',
        icon: SettingsIcon,
      },

      /* 			{
				title: 'Support',
				href: '/pricing',
				icon: helpIcon,
			}, */
    ],
  },
]

function renderNavItems({
  items,
  pathname,
  depth = 0,
}: {
  items: Item[]
  pathname: string
  depth?: number
}) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        [] as any
      )}
    </List>
  )
}

function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
}: {
  acc: any[]
  pathname: string
  item: Item
  depth: number
}) {
  const key = item.title + depth

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    })

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    )
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    )
  }

  return acc
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  logo: { display: 'flex' },
}))

const NavBar: FC<NavBarProps> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles()
  const location = useLocation()
  const { user } = useAuth()

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const savedUser = useSelector(selectUser)
  const filteredSections = sections.filter(
    (value: Section, index: number) =>
      value.displayForRole === undefined ||
      value.displayForRole === savedUser.role ||
      value.displayForRole === 'Owner' // default as owner
  )
  const content = (
    <Box height='100%' display='flex' flexDirection='column'>
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        {/* 				<Box
					sx={{ display: { lg: 'none', md: 'flex' } }}
					p={2}
					display='flex'
					justifyContent='center'
					className={classes.logo}
				>
					<RouterLink to='/'>
						<Logo />
					</RouterLink>
				</Box> */}
        <Box p={2}>
          <Box display='flex' justifyContent='center'>
            <RouterLink to='/app/account'>
              <Avatar
                alt='User'
                className={classes.avatar}
                src={user?.avatar}
              />
            </RouterLink>
          </Box>
          <Box mt={2} textAlign='center'>
            <Link
              component={RouterLink}
              to='/app/account'
              variant='h5'
              color='textPrimary'
              underline='none'
            >
              {user?.name}
            </Link>
            <Typography variant='body2' color='textSecondary'>
              {savedUser.email}
            </Typography>
            <Typography
              variant='body2'
              color='textSecondary'
              sx={{ textTransform: 'capitalize' }}
            >
              Role{': '}
              <Link component={RouterLink} to='/app/account'>
                {savedUser.role || 'Owner'}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box p={2}>
          {filteredSections.map((section) => (
            <List
              key={section.subheader}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {section.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: section.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
        <Divider />
        <Box p={2}>
          <Box p={2} borderRadius='borderRadius' bgcolor='background.dark'>
            <Typography variant='h6' color='textPrimary'>
              Need Help? Email:
            </Typography>
            <a href='mailto:support@kidsfuncloud.com'>
              support@kidsfuncloud.com
            </a>
            {/* 						<Link
							variant='subtitle1'
							color='secondary'
							component={RouterLink}
							to='mailto:email@example.com'
						>
							contact us
						</Link> */}
          </Box>
        </Box>
      </PerfectScrollbar>
    </Box>
  )

  return (
    <>
      <Box sx={{ display: { lg: 'none', md: 'block' } }}>
        <Drawer
          anchor='left'
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant='temporary'
        >
          {content}
        </Drawer>
      </Box>
      <Box
        sx={{ display: { lg: 'block', md: 'none', sm: 'none', xs: 'none' } }}
      >
        <Drawer
          anchor='left'
          classes={{ paper: classes.desktopDrawer }}
          open
          variant='persistent'
        >
          {content}
        </Drawer>
      </Box>
    </>
  )
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func as any,
  openMobile: PropTypes.bool as any,
}

export default NavBar
