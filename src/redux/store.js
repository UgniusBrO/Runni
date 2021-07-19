import { init } from '@rematch/core'
//import { persistStore } from 'redux-persist'
import * as models from './models'

const store = init({ models })
//const persistor = persistStore(store)
console.log('store store', store)
export default store