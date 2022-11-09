//import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
//import App from './App'
import store from 'src/store'
import FrontPage from 'src/views/home/HomeView/FrontPage'

test('renders learn react link', () => {
	const { getByText } = render(
		<Provider store={store}>
			<FrontPage />
		</Provider>
	)
	const linkElement = getByText(/kidsfuncloud.com/i)
	expect(linkElement).toBeInTheDocument()
})
