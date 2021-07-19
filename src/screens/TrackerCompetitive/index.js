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
  Button,
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
import Buttons from '../../components/Button'
import Geolocation from 'react-native-geolocation-service';
import * as geolib from 'geolib';
import { connect } from 'react-redux'
var polyline = require('@mapbox/polyline');
import KeepAwake from 'react-native-keep-awake';
import CCC from '../../sendModule';
// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 54.921263;
const LONGITUDE = 23.955638;


class TrackerCompetitive extends React.Component {
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
      polyline:'',
      errorse: null,
      buttoncolor:'orange',
      atstart:false,
      fromstart:'',
      looking:false,
      speed:0,
      polyline:'',
      errorse: null,
      firsttime:'',
      lasttime:'',
      firstset:false,
      done:false,
      stateofrun:'You Can Start',
      isCompeting:false,
      isDone:false,
      saved:'not saved',
      maxStepout:0,
      oldSpeed:0,
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
    this.watchID2 = null
    this.startTracking = this.startTracking.bind(this)
    this.watchPosition = this.watchPosition.bind(this)
    this.stopTracking = this.StopTracking.bind(this)
    this.lookForStart = this.lookForStart.bind(this)
    this.watchPositionStart = this.watchPositionStart.bind(this)
  }
  async checkPermissionsBefore() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.lookForStart()
      }
      else {
   
        Alert.alert("Location Permission Not Granted");
   
      }
    } catch (err) {
      console.warn(err)
    }
  };
  async checkPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.clearWatch(this.watchID2)
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
    this.setState({ routeCoordinates: [], distanceTravelled: 0, isCompeting: true }, () => {
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
  lookForStart = () => {
    const { coordinate } = this.state;
    console.log('started tracking')
    this.watchID2 = Geolocation.watchPosition(this.watchPositionStart,
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
  watchPositionStart(position) {
    const { latitude, longitude } = position.coords;
    const distancefromstart = geolib.getDistance(position.coords, this.props.prop.startCoordinates[0])
    if(distancefromstart < 10)
    {
      this.setState({atstart: true, fromstart: distancefromstart})
    }
    if(distancefromstart > 10)
    {
      this.setState({atstart: false, fromstart: distancefromstart})
    }
    this.setState({
      latitude,
      longitude,
    });
  };

  watchPosition(position) {
    const { coordinate, routeCoordinates, distanceTravelled } = this.state;
    const { latitude, longitude } = position.coords;
    
    console.log(distanceTravelled)
    if(this.state.routeCoordinates.length > 0){
      this.setState({speed: (this.state.distanceTravelled / this.state.routeCoordinates.length)})
    if(this.state.firstset == false){
     this.setState({ firsttime: position.timestamp, firstset: true })
    }
    this.setState({ lasttime: position.timestamp })
    const nearestcoord = geolib.findNearest({ latitude, longitude }, this.props.prop.polyline);
    const distancefromnearest = geolib.getDistance(nearestcoord, { latitude, longitude })
    const distancefromend = geolib.getDistance(this.props.prop.endCoordinates[0], { latitude, longitude })
    if(distancefromnearest > this.state.maxStepout)
    {
      this.setState({maxStepout: distancefromnearest})
    }
    if(distancefromend > 10)
    {
      this.setState({done: false})
    }
    if(distancefromend < 10)
    {
      this.setState({done: true})
    }
    if((this.state.speed * 3600) < this.props.prop.userSpeed)
    {
      try {
        CCC.competing("Losing")
      } catch (error) {
        
      }
      this.setState({buttoncolor: "red", stateofrun: "Losing"})
    }
    if(this.state.speed * 3600 > this.props.prop.userSpeed)
    {
      try {
        CCC.competing("Winning")
      } catch (error) {
        
      }
      this.setState({buttoncolor: "green", stateofrun: "Winning"})
    }
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
  };
  
  StopTracking = async (event) =>{
    console.log('stoped tracking')
    Geolocation.clearWatch(this.watchID)
    this.setState({isDone:true, oldSpeed:this.props.prop.userSpeed})
    console.log('oldspeed',this.state.oldSpeed)
    const totaltime = (this.state.lasttime - this.state.firsttime) / 1000
    const registered = {
      ownerOftrack:this.props.userName,
      runner:this.props.userName,
      startCoordinates:this.state.routeCoordinates[0],
      endCoordinates:this.state.routeCoordinates[this.state.routeCoordinates.length - 1],
      recordTime:totaltime,
      tracksDistance:this.state.distanceTravelled,
      userSpeed:this.state.speed * 3600,
      polyline:this.state.routeCoordinates,

  }
  const trackinfo = {registered: registered, id: this.props.prop._id}
  if(this.state.stateofrun == 'Winning' && this.state.maxStepout < 15)
  {
    this.setState({ errorse: null , saved:'saved'}, async() => {
      try {
          
          const aa = await this.props.updateTracks(trackinfo)
      } catch (error) {
          this.setState({ errorse: error?.message })
      }
  })
  }
  console.log('newspeed',this.state.userSpeed)


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
    if(this.state.looking == false)
    {
    {this.checkPermissionsBefore()}
    this.setState({looking: true})
    }
    if(this.state.isDone){
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
            <Polyline coordinates={this.props.prop.polyline} strokeWidth={7}  />
            <Polyline coordinates={this.state.routeCoordinates} strokeColor={"#9291E8"} strokeWidth={7} />
            <Marker.Animated
               coordinate={new AnimatedRegion({
                  latitude: this.props.prop.startCoordinates[0].latitude,
                  longitude: this.props.prop.startCoordinates[0].longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0
                })}
            />
          </MapView>
          <View style={styles.buttonContainer}>
              
              <Button color={this.state.buttoncolor} title={this.state.stateofrun}></Button>
              <Buttons title={`Previous speed\n${parseFloat(this.state.oldSpeed).toFixed(2)}\nYour speed\n${parseFloat(this.state.speed * 3600).toFixed(2)}\nTrack was ${this.state.saved}`}/>
          </View>
        </View>
      );
    }
    if(this.state.isCompeting){
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
            <Polyline coordinates={this.props.prop.polyline} strokeWidth={7}  />
            <Polyline coordinates={this.state.routeCoordinates} strokeColor={"#9291E8"} strokeWidth={7} />
            <Marker.Animated
               coordinate={new AnimatedRegion({
                  latitude: this.props.prop.startCoordinates[0].latitude,
                  longitude: this.props.prop.startCoordinates[0].longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0
                })}
            />
          </MapView>
          <View style={styles.buttonContainer}>
              
              <Button color={this.state.buttoncolor} title={this.state.stateofrun}></Button>
              <Buttons title={'Finish button will apear once you reach the end of track'}/>
              {
               this.state.done ? <Buttons title={'You can now Finish'} onPress={this.stopTracking}/> : null   
              }          
          </View>
        </View>
      );
    }
    if(this.state.atstart == true && this.state.isCompeting == false){
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
          <Polyline coordinates={this.props.prop.polyline} strokeWidth={7}  />
          <Polyline coordinates={this.state.routeCoordinates} strokeColor={"#9291E8"} strokeWidth={7} />
          <Marker.Animated
             coordinate={new AnimatedRegion({
                latitude: this.props.prop.startCoordinates[0].latitude,
                longitude: this.props.prop.startCoordinates[0].longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
              })}
          />
        </MapView>
        <View style={styles.buttonContainer}>
            
            <Button color={this.state.buttoncolor} title={this.state.stateofrun}></Button>
            <Buttons  title={`${parseFloat(this.state.distanceTravelled).toFixed(2)} km`}/>
            <Buttons title={'Start'}  onPress={this.checkPermissions.bind(this)}/>              
        </View>
      </View>
    );
    }
    if(this.state.atstart == false){
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
          <Polyline coordinates={this.props.prop.polyline} strokeWidth={7}  />
          <Polyline coordinates={this.state.routeCoordinates} strokeColor={"#9291E8"} strokeWidth={5} />
          <Marker.Animated
             coordinate={new AnimatedRegion({
                latitude: this.props.prop.startCoordinates[0].latitude,
                longitude: this.props.prop.startCoordinates[0].longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
              })}
          />
          <Marker.Animated
             coordinate={new AnimatedRegion({
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0
              })}
          />
        </MapView>
        <View style={styles.buttonContainer}>
            
            <Buttons style={{color:this.state.buttoncolor}} title={`You are  ${parseFloat(this.state.fromstart).toFixed(2)} meters away from start`}/>
            <Buttons title={'Go to marked start position to start'}/>              
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

const mapDispatch = ({ authentication: { login, updateTracks } }) => ({
   login,
   updateTracks
})

const TrackerCompetitiveContainer = connect(
   mapState,
   mapDispatch
)(TrackerCompetitive)

export default TrackerCompetitiveContainer;