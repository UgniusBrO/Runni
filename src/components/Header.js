import React from 'react'
import { Navigation } from 'react-native-navigation'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'

const Header = ({ componentId, chest, legs, back }) => {

    function navigateToChest() {
        if(legs?.length > 0 && back?.length > 0  && chest?.length > 0 )
        {
            Navigation.push(componentId, { component: { name: 'Chest' } })
        }
        if(legs?.length == 0 && back?.length == 0  && chest?.length == 0 )
        {
            Navigation.push(componentId, { component: { name: 'Workouts' } })
        }
    }
    function navigateToLegs() {
        if(legs?.length > 0 && back?.length > 0  && chest?.length > 0 )
        {
            Navigation.push(componentId, { component: { name: 'Legs' } })
        }
        if(legs?.length == 0 && back?.length == 0  && chest?.length == 0 )
        {
            Navigation.push(componentId, { component: { name: 'Workouts' } })
        }
    }
    function navigateToBack() {
        if(legs?.length > 0 && back?.length > 0  && chest?.length > 0 )
        {
            Navigation.push(componentId, { component: { name: 'Back' } })
        }
        if(legs?.length == 0 && back?.length == 0  && chest?.length == 0 )
        {
            Navigation.push(componentId, { component: { name: 'Workouts' } })
        }
    }
    return (       
        <View style={styles.header}>
            <View style={styles.circleShapeView1}>
                <TouchableHighlight style={styles.oval1} underlayColor='#ccc' onPress={() => Navigation.push(componentId, { component: { name: 'Home' } })}>
                    <View><Icon name="map-marker-alt" size={40}></Icon></View>                
                </TouchableHighlight>
            </View>
            <View style={styles.circleShapeView1}>
                <TouchableHighlight style={styles.oval1} underlayColor='#ccc' onPress={navigateToChest}>
                    <View><Icon name="cuttlefish" size={40}></Icon></View>                
                </TouchableHighlight>
            </View>
            <View style={styles.circleShapeView1}>
                <TouchableHighlight style={styles.oval1} underlayColor='#ccc' onPress={navigateToBack}>
                    <View><Icon name="bold" size={40}></Icon></View>                
                </TouchableHighlight>
            </View>
            <View style={styles.circleShapeView1}>
                <TouchableHighlight style={styles.oval1} underlayColor='#ccc' onPress={navigateToLegs}>
                    <View><Icon name="socks" size={40}></Icon></View>                
                </TouchableHighlight>
            </View>
            <View style={styles.circleShapeView}>
                <TouchableHighlight style={styles.oval} underlayColor='#ccc' onPress={() => Navigation.push(componentId, { component: { name: 'LogIn' } })}>
                                    <Icon name="user-circle" size={60}>
                </Icon>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 137,
        backgroundColor: '#9291E8',
        flexDirection: 'row',
    },
    text: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center'
    },
    oval: {
        width: 61,
        height: 61,
        borderRadius: 61 / 2,
        backgroundColor: '#9291E8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleShapeView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 0,
        top: 40,
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        backgroundColor: '#FFFFFF',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 15,
        elevation: 5,
    },
    circleShapeView1: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 0,
        top: 44,
        width: 52,
        height: 52,
        borderRadius: 52 / 2,
        backgroundColor: '#9A99CA',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1.0,
        shadowRadius: 15,
        elevation: 5,
    },
    oval1: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle:{
        backgroundColor: '#9291E8',
        bottom: 3,
        right: 2,
        width: 17,
        height: 3,
    },
    rectangle2:{
        backgroundColor: '#9291E8',
        top: 10,
        left: 5,
        width: 17,
        height: 3,
    },
});
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
 
 const HeaderContainer = connect(
     mapState,
     mapDispatch
 )(Header)
export default HeaderContainer;