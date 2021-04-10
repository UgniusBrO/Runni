import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Button from '../../components/Button'
import axios from 'axios'
import { Navigation } from 'react-native-navigation'

class LogIn extends React.Component {
    constructor() {
        super()
        this.state = {
            userName:'',
            password:'',
            errorse: null,
        }
        this.changeUsername = this.changeUsername.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.navigateToSignUp = this.navigateToSignUp.bind(this)
        this.navigateToHome = this.navigateToHome.bind(this)
    }

    changeUsername = (text) =>{
        this.setState({
            userName:text
        })
    }
    changePassword = (text) =>{
        this.setState({
            password:text
        })
    }
    onSubmit = async (event) =>{
        event.preventDefault()

        const registered = {
            userName:this.state.userName,
            password:this.state.password
        }

        const response = await axios.post('http://10.0.2.2:4000/app/login', registered)
        if(response.data.status === 'error')
        {
            console.log(response.data.error)
            this.setState({
                errorse:'Failed to login, check your password and username'
            })
        }
        if(response.data.status === 'ok')
        {
            console.log('succesfully logged in')
            this.setState({
                errorse: null
            })
            this.navigateToHome()
        }
    } 
    navigateToSignUp() {
        Navigation.push(this.props.componentId, { component: { name: 'SignUp' } })
    }

    navigateToHome() {
        Navigation.push(this.props.componentId, { component: { name: 'Home' } })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Text  style={styles.text}> {this.state.errorse} </Text>
                <TextInput  style={styles.input}
                            onChangeText={this.changeUsername}
                            value={this.state.userName}
                            placeholder={'Username'}>
                </TextInput>
                <TextInput  style={styles.input}
                            onChangeText={this.changePassword}
                            value={this.state.password}
                            placeholder={'Password'}>
                </TextInput>
                <Button title={'LogIn'} onPress={this.onSubmit}>
                </Button>
                <Text onPress={this.navigateToSignUp}>Don't have an account?</Text>
                <View style ={styles.middleshape}></View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 397,
        backgroundColor: '#9291E8',
        alignItems:'center'
    },
    middleshape:{
        position: 'absolute',
        backgroundColor: '#9291E8',
        alignItems: 'center',
        justifyContent: 'center',
        height:20,
        width:200,
        top:387,
        borderRadius: 20
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        color: '#8A959E',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    text: {
        color: 'red',
        fontSize: 20,
        textAlign: 'center'
    },
});

LogIn.options = {
    topBar: {
        visible: false,
    }
}

export default LogIn;