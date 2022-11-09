import moment from 'moment'
import mock from 'src/utils/mock'
//import type { CustomerEmail, Invoice, CustomerLog } from 'src/types/clubinfo'

export interface ClubInfo {
	clubid: string
	clubName: string
	clubEmail: string
	clubEmailVerified: boolean
	photoURL: string
	registerRole: string
	clubCategories: Array<string>
	category?: Array<string> // sports
	category0?: Array<string> // music and art
	category1?: Array<string> // science and coding
	category2?: Array<string> // additonal categories from user
	city: string
	state: string
	country: string
	postalCode: string
	priceCurrency: string
	priceMin: number
	priceMax?: number
	updatedAt: number
	active: boolean
}
mock.onGet('/api/clublist').reply(() => {
	const clublist: ClubInfo[] = [
		{
			clubid: '5e887ac47eed253091be10cb',
			photoURL: '/static/images/avatars/avatar_3.png',
			city: 'Cleveland',
			country: 'United States',
			registerRole: 'parent',
			priceCurrency: '$',
			clubEmail: 'cao.yu@devias.io',
			clubEmailVerified: false,
			clubName: 'New SDR',
			state: 'CA',
			priceMin: 300.0,
			clubCategories: ['fencing'],
			postalCode: '92111',
			active: true,
			updatedAt: moment()
				.subtract(1, 'days')
				.subtract(7, 'hours')
				.toDate()
				.getTime(),
		},
		{
			clubid: '5e887b209c28ac3dd97f6db5',
			photoURL: '/static/images/avatars/avatar_4.png',
			city: 'Atlanta',
			country: 'USA',
			registerRole: 'parent',
			priceCurrency: '$',
			clubEmail: 'alex.richardson@devias.io',
			clubEmailVerified: false,
			clubName: 'Future STAR',
			state: 'Georgia',
			priceMin: 0.0,
			clubCategories: ['fencing'],
			postalCode: '92111',
			active: true,
			updatedAt: moment()
				.subtract(2, 'days')
				.subtract(1, 'hours')
				.toDate()
				.getTime(),
		},
	]

	return [200, { clublist }]
})
