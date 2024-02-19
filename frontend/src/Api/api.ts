import axios from 'axios'

const axiosApiClient = axios.create({ baseURL: '/api' })
axiosApiClient.defaults.headers.common.Accept = 'application/json'

export default axiosApiClient
