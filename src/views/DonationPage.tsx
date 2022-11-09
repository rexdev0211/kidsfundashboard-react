import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CheckoutForm from 'src/components/CheckoutForm'
import axios from 'src/utils/axios'
import { stripKey } from 'src/config'
import './DonationPage.css'
import { Box, Typography } from '@mui/material'
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(stripKey.pubkey)

const ButtonArray = ({ value, onClick }) => {
	const buttons = [10, 20, 50, 100]
	//console.log('button:', value, typeof value)
	//useEffect(() => {}, [value])
	return (
		<ButtonGroup
			sx={{ padding: '20px' }}
			size='large'
			aria-label='large button group'
		>
			{buttons.map((number) => (
				<Button
					variant={value === number ? 'contained' : 'outlined'}
					value={number}
					onClick={onClick}
					color='primary'
				>
					${number}
				</Button>
			))}
		</ButtonGroup>
	)
}
export default function DonationPage() {
	const [clientSecret, setClientSecret] = useState('')
	const [amount, setAmount] = useState(10)
	const [id, setIntentID] = useState('')
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		if (!clientSecret) {
			axios
				.post('/api/create-stripe-payment-intent', {
					amount: amount * 100,
				})
				.then((res) => {
					setClientSecret(res.data.clientSecret)
					setIntentID(res.data.id)
					//console.log(res.data.clientSecret)
				})
		}
	}, [amount, clientSecret])

	const appearance = {
		theme: 'stripe',
	}
	const options = {
		clientSecret,
		appearance,
	}

	const onClick = (evt) => {
		//console.log('clicked', evt.target.value)
		setAmount(Number(evt.target.value))
		axios
			.post('/api/create-stripe-payment-intent/update', {
				amount: evt.target.value * 100,
				id,
			})
			.catch(() => console.log('Backend error!'))
	}
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
			}}
			title='Donate to kidsfuncloud.com'
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<Typography variant='h3'> Choose donation amount</Typography>
				<ButtonArray onClick={onClick} value={amount} />
				{clientSecret && (
					<Elements options={options as any} stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				)}
			</Box>
		</Box>
	)
}
