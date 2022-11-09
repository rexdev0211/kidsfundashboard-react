// This componet is to allow user to Create or Edit current club info data.
import { useState, useEffect } from 'react'
import type { FC } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Paper,
	Step,
	StepConnector,
	StepLabel,
	Stepper,
	Typography,
	colors,
} from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'
import {
	User as UserIcon,
	Star as StarIcon,
	//Briefcase as BriefcaseIcon,
	File as FileIcon,
} from 'react-feather'

import { useSelector } from 'src/store'
import type { Theme } from 'src/theme'
import {
	selectClubInfo,
	selectClubLoadingStatus,
	//getClubInfoData,
	resetClubInfo,
} from 'src/slices/clubinfoSlice'
import ClubInput0 from './ClubInput0'
//import ClubInput1 from './ClubInput1'
import ClubInput2 from './ClubInput2'
import { useDispatch } from 'src/store'
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
		label: 'Club Pictures',
		icon: FileIcon,
	},
	{
		label: 'Done',
		icon: FileIcon,
	},
]

const CustomStepConnector = withStyles((theme: Theme) => ({
	vertical: {
		marginLeft: 19,
		padding: 0,
	},
	line: {
		borderColor: theme.palette.divider,
	},
}))(StepConnector)

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
	const [activeStep, setActiveStep] = useState<number>(0)
	const [onbackTrue, setOnbackTrue] = useState<boolean>(false)
	const [completed, setCompleted] = useState<boolean>(false)
	const [clubName, setclubName] = useState<string>('')
	const clubInfo = useSelector(selectClubInfo)
	const isClubLoading = useSelector(selectClubLoadingStatus)
	const dispatch = useDispatch()
	const newClub = title === 'Create A Club'

	/* Reset  is done  in  NavBar directly   to  avoid unexpected reset. 	
	useEffect(() => {
		if (newClub && !onbackTrue) {
			//dispatch(resetClubInfo())
			console.log('reset?')
		}
	}, [newClub, onbackTrue, dispatch]) */
	useEffect(() => {
		if (clubInfo) {
			setclubName(clubInfo.clubName)
		}
	}, [clubInfo])

	const handleNext = (): void => {
		setOnbackTrue(false)
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = (clubid: string): void => {
		setOnbackTrue(true)
		title = 'Edit A Club'
		// console.log('clubid is :', clubid, 'step:', activeStep)
		//dispatch(getClubInfoData({ clubid }))
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}
	const onClickHandle = (): void => {
		dispatch(resetClubInfo())
	}
	const handleComplete = (): void => {
		setCompleted(true)
	}
	if (isClubLoading)
		return (
			<div>
				<Paper>Loading ...</Paper>
			</div>
		)
	return (
		<div className={classes.root}>
			{!completed ? (
				<Paper>
					<Grid container>
						<Grid item xs={12} md={12}>
							<Stepper
								activeStep={activeStep}
								className={classes.stepper}
								connector={<CustomStepConnector />}
								//orientation='vertical'
							>
								{steps.map((step) => (
									<Step key={step.label}>
										<StepLabel StepIconComponent={CustomStepIcon}>
											{step.label}
										</StepLabel>
									</Step>
								))}
							</Stepper>
						</Grid>
						<Grid item xs={12} md={12}>
							<Box p={3}>
								{activeStep === 0 && (
									<ClubInput0
										onNext={handleNext}
										title={title}
										isNewclub={newClub && !onbackTrue}
									/>
								)}
								{activeStep === 1 && (
									<ClubInput2 onBack={handleBack} onComplete={handleComplete} />
								)}
								{/* 								{activeStep === 2 && (
									<ClubInput2 onBack={handleBack} onComplete={handleComplete} />
								)} */}
							</Box>
						</Grid>
					</Grid>
				</Paper>
			) : (
				<Card>
					<CardContent>
						<Box maxWidth={450} mx='auto'>
							<Box display='flex' justifyContent='center'>
								<Avatar className={classes.avatar}>
									<StarIcon />
								</Avatar>
							</Box>
							<Box mt={2}>
								<Typography variant='h3' color='textPrimary' align='center'>
									Your club {clubName} is{' '}
									{title === 'Create A Club' ? 'created' : 'updated'}.
								</Typography>
							</Box>
							<Box mt={2}>
								<Typography
									variant='subtitle1'
									color='textSecondary'
									align='center'
								>
									Congratulations!
								</Typography>
							</Box>
							<Box mt={2} display='flex' justifyContent='center'>
								<Button
									variant='contained'
									color='secondary'
									component={RouterLink}
									onClick={onClickHandle}
									to='/app/parent/myrecommendations'
								>
									View your club
								</Button>
							</Box>
						</Box>
					</CardContent>
				</Card>
			)}
		</div>
	)
}

export default CreateClubSteps
