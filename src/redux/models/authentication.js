import API from '../../utils/API'

const initialState = {
    token: '',
    userName: '',
    userId: '',
    totalDistance: '',
    totalWorkouts: '',
    totalTime: '',
    tracks: [],
    chest: [],
    back: [],
    legs: [],
}

export default {
    state: initialState, // initial state
    reducers: {
        setToken(state, token) {
            return {
                ...state,
                token
            }
        },
        setUserdata(state, usersData){
            console.log('state', state)
            console.log('user', usersData)
            return {
                ...state,
                ...usersData
            }
        },
        setUserdatachest(state, usersData){
            console.log('state', state)
            console.log('user', usersData)
            return {
                ...state,
                ...usersData
            }
        },
        setUserdataback(state, usersData){
            console.log('state', state)
            console.log('user', usersData)
            return {
                ...state,
                ...usersData
            }
        },
        setUserdatalegs(state, usersData){
            console.log('state', state)
            console.log('user', usersData)
            return {
                ...state,
                ...usersData
            }
        },
    },
    effects: () => ({
       async login(registered) {
            const response = await API.post('/login', registered)
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to login, check your password and username' })
            }
            if(response.data.status === 'ok')
            {
                console.log('succesfully logged in', response)
                this.setToken(response.data.data)
                const { currentuser, profile, userid, workouts, runtime } = response.data
                this.setUserdata({ userName: currentuser, profile, userid, workouts, runtime })
                this.setUserdatachest({ userName: currentuser, profile, userid, workouts, runtime })
                this.setUserdataback({ userName: currentuser, profile, userid, workouts, runtime })
                this.setUserdatalegs({ userName: currentuser, profile, userid, workouts, runtime })
            }
        },
        async signup(registered) {
             const response = await API.post('/signup', registered)
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to register, check your password and username' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('succesfully logged in', response)
                 this.setToken(response.data.data)
             }
         },
         async workoutlegs(registered) {
             const response = await API.post('/workoutlegs', registered)
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to create leg plan' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('Leg plan created', response)
                 this.setUserdata(response.data.data)
             }
         },
         async workoutback(registered) {
             const response = await API.post('/workoutback', registered)
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to create leg plan' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('Back plan created', response)
                 this.setUserdata(response.data.data)
             }
         },
         async workoutchest(registered) {
             const response = await API.post('/workoutchest', registered)
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to create chest plan' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('Chest plan created', response)
                 this.setUserdata(response.data.data)
             }
         },
         async tracks(registered) {
             const response = await API.post('/tracks', registered)
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to create track' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('track created', response)
                 this.setUserdata(response.data.data)
             }
         },
         async getTracks(_, { authentication: { userName }}) {
             const response = await API.get('/tracks', { params: { userName }})
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to get track' })
             }
             if(response.data.status === 'ok')
             {
                 this.setUserdata({ tracks: response.data.data })
             }
         },
         async updateTracks(registered) {
            try{
             const response = await API.put(`/tracks/${registered.id}`, registered.registered)
            }
            catch(error){
            }
             if(response.data.status === 'error')
             {
                 return Promise.reject({ message: 'Failed to update track' })
             }
             if(response.data.status === 'ok')
             {
                 console.log('track updated', response)
             }
         },
         async getChest(_, { authentication: { userName }}) {
            const response = await API.get('/workoutchest', { params: { userName } })
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to get chestworkout' })
            }
            if(response.data.status === 'ok')
            {
                this.setUserdatachest({ chest: response.data.data })
            }
        },
        async updateChest(registered) {
           try{
            const response = await API.put(`/workoutchest/${registered.id}`, registered.registered)
           }
           catch(error){
           }
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to update chestworkout' })
            }
            if(response.data.status === 'ok')
            {
                console.log('chestworkout updated', response)
            }
        },
        async getBack(_, { authentication: { userName }}) {
            const response = await API.get('/workoutback', { params: { userName } })
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to get backworkout' })
            }
            if(response.data.status === 'ok')
            {
                this.setUserdataback({ back: response.data.data })
            }
        },
        async updateBack(registered) {
           try{
            const response = await API.put(`/workoutback/${registered.id}`, registered.registered)
           }
           catch(error){
           }
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to update chestworkout' })
            }
            if(response.data.status === 'ok')
            {
                console.log('chestworkout updated', response)
            }
        },
        async getLegs(_, { authentication: { userName }}) {
            const response = await API.get('/workoutlegs', { params: { userName } })
            console.log('pararam', response)
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to get legsworkout' })
            }
            if(response.data.status === 'ok')
            {
                this.setUserdatalegs({ legs: response.data.data })
            }
        },
        async updateLegs(registered) {
           try{
            const response = await API.put(`/workoutlegs/${registered.id}`, registered.registered)
           }
           catch(error){
               console.log(error)
           }
            if(response.data.status === 'error')
            {
                return Promise.reject({ message: 'Failed to update legsworkout' })
            }
            if(response.data.status === 'ok')
            {
                console.log('legsworkout updated', response)
            }
        },
    }),
}