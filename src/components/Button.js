import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const Button = ({title, onPress}) => (
    <TouchableOpacity style={[styles.bubble, styles.button]}
        onPress={onPress}>
        <Text style={styles.title}>
            {title}
        </Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    title: {
        marginVertical: 20,
        fontSize:15,
        color:"white",
        backgroundColor: "transparent"        
    },
    bubble: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: 160,
        backgroundColor: "#003366",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20
    },
    button: {
        textAlign: 'center',
        paddingHorizontal: 12,
        alignItems: "center",
        marginHorizontal: 10
    },
})

export default Button