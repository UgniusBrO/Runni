/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import Button from '../../components/Button'
import Geolocation from 'react-native-geolocation-service';
import Arrows from "./components/Arrows";
import { CommandsObserver } from "react-native-navigation/lib/dist/events/CommandsObserver";
import * as geolib from 'geolib';
import API from '../../utils/API'
import { connect } from 'react-redux'
var polyline = require('@mapbox/polyline');
import KeepAwake from 'react-native-keep-awake';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 54.921263;
const LONGITUDE = 23.955638;


class Tracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      trackowner:'',
      trackrunner:'',
      startcoords:'',
      endcoords:'',
      recordtime:'',
      tracksdistance:'',
      speed:0,
      polyline:'',
      errorse: null,
      firsttime:'',
      lasttime:'',
      firstset:false,
      done:false,
      h:0,
      m:0,
      s:0,

      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
    this.watchID = null
    this.startTracking = this.startTracking.bind(this)
    this.watchPosition = this.watchPosition.bind(this)
    this.stopTracking = this.StopTracking.bind(this)
  }

  async checkPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        
        this.startTracking()
      }
      else {
   
        Alert.alert("Location Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  };

  startTracking = () => {
    const { coordinate } = this.state;
    this.setState({ routeCoordinates: [], distanceTravelled: 0 }, () => {
      console.log('aaa', this.watchID)
    })
    console.log('started tracking')
    this.watchID = Geolocation.watchPosition(this.watchPosition,
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        distanceFilter: 5,
        fastestInterval: 1000,
        interval: 1000,
      },
    )
  };

  watchPosition(position) {
    console.log('position', position)
    const { coordinate, routeCoordinates, distanceTravelled } = this.state;
    const { latitude, longitude } = position.coords;
    if(this.state.routeCoordinates.length > 0){
      console.log('speed', this.state.speed)
      this.setState({speed: (this.state.distanceTravelled / this.state.routeCoordinates.length)})
      console.log('speedafteradd', position.coords.speed)
    if(this.state.firstset == false){
     this.setState({ firsttime: position.timestamp, firstset: true })
    }
    this.setState({ lasttime: position.timestamp })
    }
    const newCoordinate = {
      latitude,
      longitude
    };   

    this.setState({
      latitude,
      longitude,
      routeCoordinates: routeCoordinates.concat([newCoordinate]),
      distanceTravelled:
        distanceTravelled + this.calcDistance(newCoordinate),
      prevLatLng: newCoordinate
      
    });
  }

  StopTracking = async (event) =>{
    console.log('stoped tracking')
    Geolocation.clearWatch(this.watchID)

    const totaltime = (this.state.lasttime - this.state.firsttime) / 1000
    console.log('totaltime', totaltime)
    const h = Math.floor(totaltime / 3600);
    const m = Math.floor((totaltime - (h * 3600)) / 60);
    const s = totaltime - (h * 3600) - (m * 60);
    this.setState({ done: true, h: h, m: m, s: s})
    const registered = {
      ownerOftrack:this.props.userName,
      runner:"Testuojam",
      startCoordinates:this.state.routeCoordinates[0],
      endCoordinates:this.state.routeCoordinates[this.state.routeCoordinates.length - 1],
      recordTime:totaltime,
      tracksDistance:this.state.distanceTravelled,
      userSpeed:this.state.speed * 3600,
      polyline:this.state.routeCoordinates,

  }
    this.setState({ errorse: null }, async() => {
      try {
          await this.props.tracks(registered)
      } catch (error) {
          this.setState({ errorse: error?.message })
      }
  })
    //console.log('full coordinates', this.state.routeCoordinates)
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };
  render() {
    if(this.state.distanceTravelled >= 0.5 && this.state.done == false){
      KeepAwake.activate();
      return (
        <View style={styles.container}>
          
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Polyline coordinates={this.state.routeCoordinates} strokeWidth={7} />
            <Marker.Animated
            
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
              
            />
          </MapView>
          <View style={styles.buttonContainer}>
              <Button title={`${parseFloat(this.state.distanceTravelled).toFixed(2)} km`}/>
              <Button title={'Finish running'}  onPress={this.stopTracking}/>              
          </View>
        </View>
      );
    }
    if(this.state.distanceTravelled == 0 && this.state.done == false){
      KeepAwake.deactivate();
    return (
      <View style={styles.container}>
        
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={7} />
          <Marker.Animated
          
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
            
          />
        </MapView>
        <View style={styles.buttonContainer}>
           
            <Button title={`${parseFloat(this.state.distanceTravelled).toFixed(2)} km`}/>
            <Button title={'Start'}  onPress={this.checkPermissions.bind(this)}/>              
        </View>
      </View>
    );
    }
    if(this.state.distanceTravelled < 0.5 && this.state.distanceTravelled > 0 && this.state.done == false){
      KeepAwake.activate();
      return (
        
        <View style={styles.container}>
          
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
          >
            <Polyline coordinates={this.state.routeCoordinates} strokeWidth={7} />
            <Marker.Animated
            
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
              
            />
          </MapView>
          <View style={styles.buttonContainer}>
              <Button title={`${parseFloat(this.state.distanceTravelled).toFixed(2)} km`}/>
              <Button title={'You can finish track after you ran 0.5 km'} />              
          </View>
        </View>
      );     
      }
      if(this.state.done == true){
        KeepAwake.activate();
        return (
          
          <View style={styles.container}>
            
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              showUserLocation
              followUserLocation
              loadingEnabled
              region={this.getMapRegion()}
            >
              <Polyline coordinates={this.state.routeCoordinates} strokeWidth={7} />
              <Marker.Animated
              
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
                
              />
            </MapView>
            <View style={styles.buttonContainer}>
                <Button title={`Your stats:\nDistance: ${parseFloat(this.state.distanceTravelled).toFixed(2)} km\n\nTotal run time\nHours: ${parseFloat(this.state.h).toFixed(0)}\nMinutes: ${parseFloat(this.state.m).toFixed(0)}\nSeconds: ${parseFloat(this.state.s).toFixed(0)}\nAvarage Speed: ${parseFloat(this.state.speed * 3600).toFixed(2)} Km/h`}/>
            
            </View>
          </View>
        );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});

const mapState = ({ authentication }) => ({
  userName: authentication.userName,
})

const mapDispatch = ({ authentication: { login, tracks } }) => ({
   login,
   tracks
})

const TrackerContainer = connect(
   mapState,
   mapDispatch
)(Tracker)

export default TrackerContainer;