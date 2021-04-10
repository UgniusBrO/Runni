import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header'

const App = ({ componentId }) => {
    return (
        <View style ={styles.container}>
            <Header title="RUNNI" componentId={componentId}></Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#FFFFFF'
    },
});

App.options = {
    topBar: {
        visible: false,
    }
  }

export default App;