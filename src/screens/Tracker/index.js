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
  }
  async checkPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
   
        Alert.alert("Location Permission Granted.");
        this.startTracking.bind(this)
      }
      else {
   
        Alert.alert("Location Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  };
  startTracking() {
    const { coordinate } = this.state;
    this.setState({ routeCoordinates: [] })
    console.log('started tracking')
    this.watchID = Geolocation.watchPosition(
      position => {
        console.log('position', position)
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };   
        coordinate.timing(newCoordinate).start();
        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),

          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 1,
        fastestInterval: 2000,
        interval: 2000
        
      }
    )
  };

  StopTracking() {
    console.log('stoped tracking')
    Geolocation.clearWatch(this.watchID)
    Geolocation.stopObserving(this.watchID)
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
    console.log('this.state.routeCoordinates', this.state.routeCoordinates.length)
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
            <Arrows up={true} />
            <Button title={`${parseFloat(this.state.distanceTravelled).toFixed(2)} km`} onPress={this.StopTracking.bind(this)}/>
            <Button title={'Pradėti'}  onPress={this.startTracking.bind(this)}/>              
        </View>
      </View>
    );
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
export default Tracker;