// This file is not used.
const proxy = require('http-proxy-middleware')
const { REACT_APP_API_ADDRESS_LOCAL, REACT_APP_API_ADDRESS_DEV, API_ENV } =
	process.env
module.exports = function (app) {
	const APIAddressMap = {
		local: REACT_APP_API_ADDRESS_LOCAL,
		dev: REACT_APP_API_ADDRESS_DEV,
	}
	app.use(proxy('/auth/google', { target: APIAddressMap[API_ENV || 'local'] }))
	app.use(proxy('/api/', { target: APIAddressMap[API_ENV || 'local'] }))
	app.use(proxy('/apiv0/', { target: APIAddressMap[API_ENV || 'local'] }))
	app.use(proxy('/users/', { target: APIAddressMap[API_ENV || 'local'] }))
}
