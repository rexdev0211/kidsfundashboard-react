import AxiosMockAdapter from 'axios-mock-adapter'
import axios from './axios_mock'

const axiosMockAdapter = new AxiosMockAdapter(axios, { delayResponse: 0 })

export default axiosMockAdapter
