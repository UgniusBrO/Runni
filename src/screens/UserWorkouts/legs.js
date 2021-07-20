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
 } from "react-native";
 import Buttons from '../../components/Button'
 import { connect } from 'react-redux'
 var polyline = require('@mapbox/polyline');
 import KeepAwake from 'react-native-keep-awake';
 import Header from '../../components/Header'
 import CCC from '../../sendModule';
 class Legs extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       bigweights:5,
       smallweights:1,
       increment:1,
       workingout:false,
       errorse: null,
       sessionsCompleted:'',
       quadsReps:'',
       quadsRepsWeight:'',
       squatReps:'',
       squatRepsWeight:'',
       hamstringReps:'',
       hamstringRepsWeight:'',
       glutesReps:'',
       glutesRepsWeight:'',
       calvesReps:'',
       calvesRepsWeight:'',
       count:0,
       timercount:5,
       resttimer:5,
       isworkingout:false,
       isresting:false,
       currentworkout:'QUADS',
      //  currentweight:0,
      //  currentreps:0,
       currentweight:this.props.legs[0].quadsRepsWeight,
       currentreps:this.props.legs[0].quadsReps,
       workoutnr:0,
       sets:4
     };
     this.SubmitWorkout = this.SubmitWorkout.bind(this)
     this.startworkout = this.startworkout.bind(this)

   }
    componentDidMount()
   {
    this.props.getLegs();
   }
   componentWillUnmount() {
    clearInterval(this._interval);
  }
   startworkout()
   {
    this.setState({ isworkingout:true, isresting:false})
    this._interval = setInterval(() => {
      this.setState({ timercount:this.state.timercount - 1})
      try {
        CCC.startworkout(this.state.currentworkout, this.state.currentweight, this.state.currentreps, this.state.timercount, this.state.sets)
      } catch (error) {
        
      }
      if(this.state.timercount < 1)
      {
        clearInterval(this._interval);
        this.setState({ resttimer:5, sets:this.state.sets - 1})
        this.startrest()
      }
      console.log("timer", this.state.timercount)
    }, 1000);
   } 
   startrest()
   {
     if(this.state.sets == 0)
     {
        this.setState({workoutnr:this.state.workoutnr + 1, sets:4})
       if(this.state.workoutnr == 1)
       {
        this.setState({currentworkout:'SQUATS', currentweight:this.props.legs[0].squatRepsWeight, currentreps:this.props.legs[0].squatReps})
       }
       if(this.state.workoutnr == 2)
       {
        this.setState({currentworkout:'HAMSTRINGS', currentweight:this.props.legs[0].hamstringRepsWeight, currentreps:this.props.legs[0].hamstringReps})
       }
       if(this.state.workoutnr == 3)
       {
        this.setState({currentworkout:'GLUTES', currentweight:this.props.legs[0].glutesRepsWeight, currentreps:this.props.legs[0].glutesReps})
       }
       if(this.state.workoutnr == 4)
       {
        this.setState({currentworkout:'CALVES', currentweight:this.props.legs[0].calvesRepsWeight, currentreps:this.props.legs[0].calvesReps})
       }
       if(this.state.workoutnr == 5)
       {
        this.setState({currentworkout:'DONE', currentweight:'DONE', currentreps:"DONE"})
       }
     }
    this.setState({isworkingout:true, isresting:true})
    if(this.state.currentworkout != 'DONE')
    {
    this._interval = setInterval(() => {
      this.setState({ resttimer:this.state.resttimer - 1})
      try {
        CCC.resting(this.state.resttimer, this.state.currentworkout)
      } catch (error) {
        
      }
      if(this.state.resttimer < 1)
      {
        clearInterval(this._interval);
        this.setState({ timercount:5})
        this.startworkout()
      }
      console.log("resttimer", this.state.resttimer)
    }, 1000);
   } 
  }
   SubmitWorkout = async (event) =>{
     console.log('submited workout')
     console.log('legs', this.props.legs[0])
     const registered = {
        sessionsCompleted:this.props.legs[0].sessionsCompleted + 1,
        quadsRepsWeight:this.props.legs[0].quadsRepsWeight + (this.state.bigweights * (this.props.legs[0].sessionsCompleted / 8)),
        quadsReps:this.props.legs[0].quadsReps,
        squatReps:this.props.legs[0].squatReps,
        squatRepsWeight:this.props.legs[0].squatRepsWeight + (this.state.bigweights * (this.props.legs[0].sessionsCompleted / 8)),
        hamstringRepsWeight:this.props.legs[0].hamstringRepsWeight + (this.state.bigweights * (this.props.legs[0].sessionsCompleted / 8)),
        hamstringReps:this.props.legs[0].hamstringReps,
        glutesRepsWeight:this.props.legs[0].glutesRepsWeight + (this.state.bigweights * (this.props.legs[0].sessionsCompleted / 8)),
        glutesReps:this.props.legs[0].glutesReps,
        calvesRepsWeight:this.props.legs[0].calvesRepsWeight + (this.state.bigweights * (this.props.legs[0].sessionsCompleted / 8)),
        calvesReps:this.props.legs[0].calvesReps,
   }
   const registered2 = {
    sessionsCompleted:this.props.legs[0].sessionsCompleted + 1,
    quadsRepsWeight:this.props.legs[0].quadsRepsWeight,
    quadsReps:this.props.legs[0].quadsReps,
    squatReps:this.props.legs[0].squatReps,
    squatRepsWeight:this.props.legs[0].squatRepsWeight,
    legsflyReps:this.props.legs[0].legsflyReps,
    hamstringRepsWeight:this.props.legs[0].hamstringRepsWeight,
    hamstringReps:this.props.legs[0].hamstringReps,
    glutesRepsWeight:this.props.legs[0].glutesRepsWeight,
    glutesReps:this.props.legs[0].glutesReps,
    calvesRepsWeight:this.props.legs[0].calvesRepsWeight,
    calvesReps:this.props.legs[0].calvesReps,
}
   if(this.props.legs[0].sessionsCompleted % 8 == 0){
   const legsinfo = {registered: registered, id: this.props.legs[0]._id}
     this.setState({ errorse: null }, async() => {
       try {
           
           const legs = await this.props.updateLegs(legsinfo)
       } catch (error) {
           this.setState({ errorse: error?.message })
       }
   })
    }
    if(this.props.legs[0].sessionsCompleted % 8 !== 0){
        const legsinfo = {registered: registered2, id: this.props.legs[0]._id}
          this.setState({ errorse: null }, async() => {
            try {
                
                const legs = await this.props.updateLegs(legsinfo)
                console.log('aaaaa',legs)
            } catch (error) {
                this.setState({ errorse: error?.message })
            }
        })
         }
   };
 
 
   render() {
    KeepAwake.activate();
    if(!this.state.isworkingout)
    {
    return (
      <View style={styles.container}>
         <Header title="RUNNI" componentId={this.props.componentId} />
         <View style={styles.header}>
                <Text style={styles.textGlowing}>YOUR LEGS PLAN:  {this.props.legs[0].userName}</Text>
                <Text style={styles.textGlowing}>YOU HAVE COMPLETED :  {this.props.legs[0].sessionsCompleted} SESSIONS SO FAR</Text>
                <Text style={styles.textGlowing}>QUADS: REPETITIONS: {this.props.legs[0].quadsReps} WORKING WEIGHT: {this.props.legs[0].quadsRepsWeight}</Text>  
                <Text style={styles.textGlowing}>SQUATS: REPETITIONS: {this.props.legs[0].squatReps} WORKING WEIGHT: {this.props.legs[0].squatRepsWeight}</Text>
                <Text style={styles.textGlowing}>HAMSTRINGS: REPETITIONS: {this.props.legs[0].hamstringReps} WORKING WEIGHT: {this.props.legs[0].hamstringRepsWeight}</Text>
                <Text style={styles.textGlowing}>GLUTES: REPETITIONS: {this.props.legs[0].glutesReps} WORKING WEIGHT: {this.props.legs[0].glutesRepsWeight}</Text>
                <Text style={styles.textGlowing}>CALVES: REPETITIONS: {this.props.legs[0].calvesReps} WORKING WEIGHT: {this.props.legs[0].calvesRepsWeight}</Text>                   
                <Buttons color={this.state.buttoncolor} title={'Start legs workout'} onPress={this.startworkout}></Buttons>
               <Buttons title={'Submit completed legs workout'} onPress={this.SubmitWorkout}/>
               </View>
         </View>
       );
        }
       if(this.state.isworkingout && !this.state.isresting)
       {
       return (
         <View style={styles.container}>
            <Header title="RUNNI" componentId={this.props.componentId} />
            <View style={styles.header2}>
                <Text style={styles.textGlowing2}>CURRENT WORKOUT</Text>
                <Text style={styles.textGlowing2}>{this.state.currentworkout}</Text>
                <Text style={styles.textGlowing2}>REPETITIONS: {this.state.currentreps}</Text>
                <Text style={styles.textGlowing2}>WORKING WEIGHT: {this.state.currentweight} KG</Text>
                <Text style={styles.textGlowing2}>SETS REMAINING: {this.state.sets}</Text> 
                <Text style={styles.textGlowing2}>Time Left: {this.state.timercount} Sec</Text>                 
           </View>
         </View>
       );
    }
    if(this.state.isworkingout && this.state.isresting)
    {
    return (
      <View style={styles.container}>
         <Header title="RUNNI" componentId={this.props.componentId} />
         <View style={styles.header2}>
             <Text style={styles.textGlowing2}>CURRENT WORKOUT</Text>
             <Text style={styles.textGlowing2}>RESTING</Text>
             <Text style={styles.textGlowing2}>NEXT WORKOUT:</Text>
             <Text style={styles.textGlowing2}>{this.state.currentworkout}</Text>
             <Text style={styles.textGlowing2}>Resting Time Left: {this.state.resttimer} Sec</Text>                 
        </View>
      </View>
    );
   }
  }
 }
 
 const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#9291E8',
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
    alignSelf:'center',
    justifyContent:'center',
    fontSize:25,
},
header: {
height: 500,
backgroundColor: '#9291E8',
alignItems:'flex-start',
justifyContent: 'space-around',
},
header2: {
height: 500,
backgroundColor: '#9291E8',
alignItems:'center',
justifyContent: 'space-around',
},
 });
 Legs.options = {
    topBar: {
        visible: false,
    }
}
 const mapState = ({ authentication }) => ({
   userName: authentication.userName,
   legs: authentication.legs,
   totalDistance:authentication.profile,
   totalTime:authentication.runtime,
   totalWorkouts:authentication.workouts,
 })

 const mapDispatch = ({ authentication: { login, getLegs, updateLegs } }) => ({
    login,
    getLegs,
    updateLegs
 })
 
 const LegsContainer = connect(
    mapState,
    mapDispatch
 )(Legs)
 
 export default LegsContainer;