import axios from 'axios'
import store from '../redux/store'

console.log('store', store)
const instance = axios.create({ baseURL: 'http://192.168.0.237:6000/app' })
instance.interceptors.request.use(config => {
	const { authentication: { token}} = store.getState()
	console.log('token', token)
	const newConfig = {
		...config,
		headers: {
		  ...config.headers,
		  'Content-Type': 'application/json',
		},
	  }
	newConfig.headers['Authorization'] = `Bearer ${token}` 
	return newConfig
	
})

export default instance