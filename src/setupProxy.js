const proxy = require('http-proxy-middleware')

module.exports = function (app) {
	app.use(proxy('/api/', { target: 'http://localhost:5100' }))
	app.use(proxy('/apiv0/', { target: 'http://localhost:5100' }))
}
