import React, { useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import API from '../../utils/API'
import {connect} from 'react-redux'
import Button from '../../components/Button'
import { Navigation } from 'react-native-navigation'
import MapView, {
    Marker,
    AnimatedRegion,
    Polyline,
    PROVIDER_GOOGLE
  } from "react-native-maps";
  import { useState } from 'react';
  const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 54.921263;
const LONGITUDE = 23.955638;

const App = ({ componentId, getTracks, tracks, getChest, chest, getBack, back, getLegs, legs}) => {
    useEffect(() => {
        getChest()
        getBack()
        getLegs()
        getTracks()
        console.log('pirmas', tracks[0])
    },[])
    getMapRegion = () => ({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
    return (
        
        <View style ={styles.container}>
            <Header title="RUNNI" componentId={componentId} />

            <ScrollView style ={styles.bottom} contentContainerStyle={styles.contentContainer} style={{ }}>
            <View style={styles.buttonContainer}>
                <Button title={'Run a new track'} onPress={() => Navigation.push(componentId, { component: { name: 'Tracker'  } })}></Button>
            </View>
                <View style={styles.mapobjects}>

            {tracks.map((prop, key) => {

            return (
                
                <TouchableOpacity style={styles.trackContainer}  key={key} onPress={() => Navigation.push(componentId, { component: { name: 'TrackerCompetitive', passProps:{prop}} })}>{prop[1]}<MapView
                scrollEnabled={false}
           style={styles.map}
           provider={PROVIDER_GOOGLE}
           showUserLocation
           followUserLocation
           loasdingEnabled
           region={{
            latitude: prop.startCoordinates[0].latitude,
            longitude: prop.startCoordinates[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
            }}
         >
           <Polyline coordinates={prop.polyline} strokeWidth={7} />
           <Marker.Animated
             coordinate={new AnimatedRegion({
                latitude: prop.startCoordinates[0].latitude,
                longitude: prop.startCoordinates[0].longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
              })}
             
           />
         </MapView>
         </TouchableOpacity>
            );
            })}
            </View>
         </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    trackContainer: {
        borderRadius: 30,
        marginBottom: 30,
        overflow: 'hidden'
    },
    container: {
        flex: 6,
        backgroundColor: '#9291E8'
    },
    bottom: {
        height: 420,
        backgroundColor: '#9291E8'
    },
    mapobjects:{
        flexGrow : 1,
        justifyContent:'center',
        marginTop: 30
    },
    map: {
        height: 200,
      },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#9291E8'
    }
});

App.options = {
    topBar: {
        visible: false,
    }
  }

  const mapState = ({ authentication }) => ({
    chest: authentication.chest,
    legs: authentication.legs,
    back: authentication.back,
    tracks: authentication.tracks
 })
 
 const mapDispatch = ({ authentication }) => ({
     getChest: authentication.getChest,
     getBack: authentication.getBack,
     getLegs: authentication.getLegs,
     getTracks: authentication.getTracks
 })
 
 const AppContainer = connect(
     mapState,
     mapDispatch
 )(App)
 
export default AppContainer;