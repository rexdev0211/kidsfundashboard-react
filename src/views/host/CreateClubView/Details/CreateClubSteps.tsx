// This componet is to allow user to Create or Edit current club info data.

import type { FC } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Avatar, Paper, Typography, colors } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  User as UserIcon,
  Briefcase as BriefcaseIcon,
  File as FileIcon,
} from 'react-feather'

import type { Theme } from 'src/theme'
//import type { ClubInfo } from 'src/types/clubinfo'
interface CustomStepIconProps {
  active?: boolean
  completed?: boolean
  icon: number
}
interface ClubDetailProp {
  title?: string
}
const steps = [
  {
    label: 'Club Info',
    icon: UserIcon,
  },
  {
    label: 'Offered Classes',
    icon: BriefcaseIcon,
  },
  {
    label: 'Club Pictures',
    icon: FileIcon,
  },
  {
    label: 'Done',
    icon: FileIcon,
  },
]

const useCustomStepIconStyles = makeStyles((theme: Theme) => ({
  root: {},
  active: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[10],
    color: theme.palette.secondary.contrastText,
  },
  completed: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))

const CustomStepIcon: FC<CustomStepIconProps> = ({
  active,
  completed,
  icon,
}) => {
  const classes = useCustomStepIconStyles()

  const Icon = steps[icon - 1].icon

  return (
    <Avatar
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      <Icon size='20' />
    </Avatar>
  )
}

CustomStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      maxWidth: '90%',
    },
  },
  avatar: {
    backgroundColor: colors.blue[100],
  },
  stepper: {
    backgroundColor: 'transparent',
  },
}))

const CreateClubSteps: FC<ClubDetailProp> = ({ title, ...rest }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        <Paper>
          <Typography> Test</Typography>
        </Paper>
      }
    </div>
  )
}

export default CreateClubSteps
