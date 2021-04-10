import React from 'react'
import { Navigation } from 'react-native-navigation'
import { TouchableHighlight, View, Text, StyleSheet } from 'react-native'

const Header = ({ componentId }) => {
    return (
        <View style={styles.header}>
            <View style={styles.circleShapeView1}>
                <TouchableHighlight style={styles.oval1} underlayColor='#ccc' onPress={() => Navigation.push(componentId, { component: { name: 'Tracker' } })}>
                    <View style={styles.rectangle}><View style={styles.rectangle2}></View></View>
                    
                </TouchableHighlight>
            </View>
            <View style={styles.circleShapeView}>
                <TouchableHighlight style={styles.oval} underlayColor='#ccc' onPress={() => alert('Padaryti nuejima i profili')}>
                    <Text style={styles.text}> Fotke </Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 397,
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
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleShapeView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 215,
        top: 40,
        width: 65,
        height: 65,
        borderRadius: 65 / 2,
        backgroundColor: '#FFFFFF',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
        elevation: 5,
    },
    circleShapeView1: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        left: 38,
        top: 44,
        width: 52,
        height: 52,
        borderRadius: 52 / 2,
        backgroundColor: '#9A99CA',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1.0,
        shadowRadius: 2,
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

export default Header;