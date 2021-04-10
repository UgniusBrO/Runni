import Home from './screens/Home/index'
import Tracker from './screens/Tracker/index'
import SignUp from './screens/SignUp/index'
import Header from './components/Header'
import {Navigation} from 'react-native-navigation'
import React from 'react'
import Button from './components/Button'
import LogIn from './screens/LogIn'

function registerScreenComponent({name, component:Component}){
    Navigation.registerComponent(name, ()=> (props)=>(
        <Component {...props}/>
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