import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import Button from '../../components/Button'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

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

    changeUsername = (userName) =>{
        this.setState({
            userName
        })
        console.log(userName)
    }
    changePassword = (password) =>{
        this.setState({
            password
        })
    }
    onSubmit = async (event) =>{
        event.preventDefault()
        const registered = {
            userName:this.state.userName,
            password:this.state.password
        }
        this.setState({ errorse: null }, async() => {
            try {
                await this.props.login(registered)
                console.log('va', registered)
                this.navigateToHome()
            } catch (error) {
                this.setState({ errorse: error?.message })
            }
        })

    } 
    navigateToSignUp() {
        Navigation.push(this.props.componentId, { component: { name: 'SignUp' } })
    }

    navigateToHome() {
        Navigation.push(this.props.componentId, { component: { name: 'Home' } })
    }

    render() {
        console.log('auth', this.props)
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

const mapState = ({ authentication }) => ({
   token: authentication.token,
})

const mapDispatch = ({ authentication }) => ({
    login: authentication.login
})

const LoginContainer = connect(
    mapState,
    mapDispatch
)(LogIn)

export default LoginContainer;