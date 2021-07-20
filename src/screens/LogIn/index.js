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
        this.navigateToLogIn = this.navigateToLogIn.bind(this)
        this.navigateToWorkouts = this.navigateToWorkouts.bind(this)
    }
    componentDidMount()
    {
     this.props.getBack();
     this.props.getChest();
     this.props.getLegs();
     console.log("mount", this.props)
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
                    this.navigateToHome()
            } catch (error) {
                this.setState({ errorse: error?.message })
            }
        })

    } 
    navigateToSignUp() {
        Navigation.push(this.props.componentId, { component: { name: 'SignUp' } })
    }

    navigateToLogIn() {
        this.props.setToken("")
        Navigation.push(this.props.componentId, { component: { name: 'LogIn' } })
    }

    navigateToHome() {
        Navigation.push(this.props.componentId, { component: { name: 'Home' } })
    }
    navigateToWorkouts() {
        Navigation.push(this.props.componentId, { component: { name: 'Workouts' } })
    }
    render() {
        if(this.props.token?.length > 0)
        {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                <Button style={styles.text} title={'HomeScreen'} onPress={this.navigateToHome}>
                </Button>
                <Button style={styles.text} title={'Log Out'} onPress={this.navigateToLogIn}>
                </Button>
                <View style ={styles.middleshape}></View>
                </View>
            </View>
        )
        }
        if(this.props.token?.length == 0)
        {
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
}


const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 397,
        backgroundColor: '#9291E8',
        alignItems:'center',
        alignContent:'center',
        justifyContent:"space-around"
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
   back: authentication.back,
   legs: authentication.legs,
   chest: authentication.chest,
})

const mapDispatch = ({ authentication }) => ({
    login: authentication.login,
    setToken: authentication.setToken,
    getBack: authentication.getBack,
    getLegs: authentication.getLegs,
    getChest: authentication.getChest
})

const LoginContainer = connect(
    mapState,
    mapDispatch
)(LogIn)

export default LoginContainer;