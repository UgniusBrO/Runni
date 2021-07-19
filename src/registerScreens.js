import Home from './screens/Home/index'
import Tracker from './screens/Tracker/index'
import Tracks from './screens/Tracks/index'
import SignUp from './screens/SignUp/index'
import Header from './components/Header'
import {Navigation} from 'react-native-navigation'
import React from 'react'
import Button from './components/Button'
import LogIn from './screens/LogIn'
import Workouts from './screens/Workouts/index'
import { Provider } from 'react-redux'
import store from './redux/store'
import TrackerCompetitive from './screens/TrackerCompetitive/index'
import Chest from './screens/UserWorkouts/chest'
import Back from './screens/UserWorkouts/back'
import Legs from './screens/UserWorkouts/legs'

function registerScreenComponent({name, component:Component}){
    Navigation.registerComponent(name, ()=> (props)=>(
        <Provider store={store}>
            <Component {...props}/>
        </Provider>
    ),
    () => Component)
}

const screens = [
    { 
        name: "Home", component: Home
    },
    {
        name: "Tracker", component: Tracker
    },
    {
        name: "SignUp", component: SignUp
    },
    {
        name: "LogIn", component: LogIn
    },
    {
        name: "Tracks", component: Tracks
    },
    {
        name: "Workouts", component: Workouts
    },
    {
        name: "TrackerCompetitive", component: TrackerCompetitive
    },
    {
        name: "Chest", component: Chest
    },
    {
        name: "Legs", component: Legs
    },
    {
        name: "Back", component: Back
    },
]

const components = [
    {
        name: 'Header', component: Header
    },
    {
        name: 'Button', component: Button
    },
    
]

function registerScreens(){
    [...screens, ...components].forEach(registerScreenComponent)
}

export default registerScreens