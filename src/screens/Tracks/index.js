import React from 'react'
import { View, Text, StyleSheet, TextInput,  } from 'react-native'
import Button from '../../components/Button'
import axios from 'axios'
import { Navigation } from 'react-native-navigation'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
import API from '../../utils/API'
import { authentication } from '../../redux/models'
class Tracks extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName:'',
            userName:'',
            email:'',
            password:'',
            errorse: '',
        }
        this.changefullName = this.changefullName.bind(this)
        this.changeUsername = this.changeUsername.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.navigateToLogin = this.navigateToLogin.bind(this)
        this.navigateToHome = this.navigateToHome.bind(this)

    }

    //  componentDidMount() {
    //      API.get('/account')
    //  }

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
        event.preventDefault()

        const registered = {
            fullName:this.state.fullName,
            userName:this.state.userName,
            email:this.state.email,
            password:this.state.password,
        }

    }

    navigateToLogin() {
        Navigation.push(this.props.componentId, { component: { name: 'LogIn' } })
    }

    navigateToHome() {
        Navigation.push(this.props.componentId, { component: { name: 'Tracker' } })
    }
    render() {

        return (
            <View style={styles.container}>
                <Header title="RUNNI" componentId={this.props.componentId}></Header>
                <View style={styles.header}>
                    <Text style={styles.textGlowing}>YOU RAN TOTAL <Text style={styles.textGlowing2}>{console.log('aaa', this.props.aaa), this.props.totalDistance}</Text><Icon name="running" size={50}></Icon> KILOMETERS</Text>
                    <Text style={styles.textGlowing}>YOU RAN TOTAL <Text style={styles.textGlowing2}>{this.props.totalTime}</Text><Icon name="stopwatch" size={50}></Icon> HOURS</Text>
                    <Text style={styles.textGlowing}>YOU COMPLETED <Text style={styles.textGlowing2}>{this.props.totalWorkouts}</Text><Icon name="dumbbell" size={50}></Icon> WORKOUTS</Text>
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
        height: 260,
        backgroundColor: '#9291E8',
        alignItems:'flex-start',
        justifyContent: 'space-around',
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
        fontSize: 15,
        textAlign: 'center'
    },
    textGlowing: {
        textShadowColor: 'rgba(0, 0, 86, 1)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 15,
        fontSize:15,
    },
    textGlowing2: {
        textShadowColor: 'rgba(0, 0, 86, 1)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 15,
        fontSize:50,
    },
});

Tracks.options = {
    topBar: {
        visible: false,
    }
}
const mapState = ({ authentication }) => ({
    aaa: authentication,
    totalDistance:authentication.profile,
    totalTime:authentication.runtime,
    totalWorkouts:authentication.workouts,
 })
 
 const mapDispatch = ({ authentication }) => ({
     login: authentication.login
 })
 
 const TracksContainer = connect(
     mapState,
     mapDispatch
 )(Tracks)
 
export default TracksContainer;