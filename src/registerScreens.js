import Home from './screens/Home/index'
import {Navigation} from 'react-native-navigation'
import React from 'react'

function registerScreenComponent({name, component:Component}){
    Navigation.registerComponent(name, ()=> (props)=>(
        <Component {...props}/>
    ),
    () => Component)
}

const screens = [
    { name: "Home", component: Home }
]

function registerScreens(){
    [...screens].forEach(registerScreenComponent)
}

export default registerScreens