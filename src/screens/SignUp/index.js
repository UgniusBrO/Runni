import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Button from '../../components/Button'
import { Navigation } from 'react-native-navigation'
import API from '../../utils/API'

class SignUp extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName:'',
            userName:'',
            email:'',
            password:'',
            errorse: '',
            isConfirmed:false,
            totalDistance:0,
            totalTracks:0,
            totalTimeRun:0,
            totalsessions:0,
        }
        this.changefullName = this.changefullName.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.navigateToLogin = this.navigateToLogin.bind(this)
        this.navigateToHome = this.navigateToHome.bind(this)

    }

    changefullName = (text) =>{
        this.setState({
            fullName:text
        })
    }
    changeUsername = (text) =>{
        this.setState({
            userName:text
        })
    }
    changeEmail = (text) =>{
        this.setState({
            email:text
        })
    }
    changePassword = (text) =>{
        this.setState({
            password:text
        })
    }
    onSubmit = async (event) =>{
        // event.preventDefault()

        const registered = {
            fullName:this.state.fullName,
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password,
            isConfirmed:this.state.isConfirmed,
            totalDistance:this.state.totalDistance,
            totalTracks:this.state.totalTracks,
            totalTimeRun:this.state.totalTimeRun,
            totalsessions:this.state.totalsessions,
        }

        const response = await API.post('/signup', registered)
        console.log('response', response)
        this.setState({ errors: response.data.errors })
        if(response.data.code === 11000)
        {
            console.log('user already exists')
            this.setState({
                errorse:'user already exists'
            })
        }
        if (response.data.__v === 0) {
            console.log('User created succesfully')
            this.setState({
                errorse: null
            })
            this.navigateToHome()
        }
        console.log(`response.data._message === 'accounts validation failed'`, response.data._message === 'accounts validation failed')
        console.log(`response.data._message === 'accounts validation failed'`, response.data)
        console.log(`response.data._message === 'accounts validation failed'`, 'accounts validation failed')
        if(response.data._message === 'accounts validation failed')
        {
            console.log('Please enter in all of the required data')
            this.setState({
                errorse:'Please enter in all of the required data'
            })
        }
    }

    navigateToLogin() {
        Navigation.push(this.props.componentId, { component: { name: 'LogIn' } })
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
                            onChangeText={this.changefullName}
                            value={this.state.fullName}
                            placeholder={'Full Name'}>
                </TextInput>
                <TextInput  style={styles.input}
                            onChangeText={this.changeUsername}
                            value={this.state.userName}
                            placeholder={'Username'}>
                </TextInput>
                <TextInput  style={styles.input}
                            onChangeText={this.changeEmail}
                            value={this.state.email}
                            placeholder={'Email'}>
                </TextInput>
                <TextInput  style={styles.input}
                            onChangeText={this.changePassword}
                            value={this.state.password}
                            placeholder={'Password'}>
                </TextInput>
                <Button title={'SignUp'} onPress={this.onSubmit}>
                </Button>
                <Text onPress={this.navigateToLogin}>Already have an account?</Text>
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

SignUp.options = {
    topBar: {
        visible: false,
    }
}

export default SignUp;