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
 import KeepAwake from 'react-native-keep-awake';
 import Header from '../../components/Header'
 import CCC from '../../sendModule';
 
 class Back extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       bigweights:5,
       smallweights:1,
       increment:1,
       workingout:false,
       errorse: null,
       sessionsCompleted:'',
       pullupReps:'',
       cableRowReps:'',
       cableRowRepsWeight:'',
       dumbbellRowReps:'',
       dumbbellRowRepsWeight:'',
       bicepsReps:'',
       bicepsRepsWeight:'',
       forearmReps:'',
       forearmRepsWeight:'',
       shoulderReps:'',
       shoulderRepsWeight:'',
       count:0,
       timercount:5,
       resttimer:5,
       isworkingout:false,
       isresting:false,
       currentworkout:'PULLUPS',
       currentweight:0,
       currentreps:this.props.back[0].pullupReps,
       workoutnr:0,
       sets:4
     };
     this.SubmitWorkout = this.SubmitWorkout.bind(this)
     this.startworkout = this.startworkout.bind(this)

   }
    componentDidMount()
   {
    this.props.getChest();
    this.props.getBack();
    this.props.getLegs();
    console.log("mount", this.props)
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
        this.setState({currentworkout:'CABLE ROW', currentweight:this.props.back[0].cableRowRepsWeight, currentreps:this.props.back[0].cableRowReps})
       }
       if(this.state.workoutnr == 2)
       {
        this.setState({currentworkout:'DUMBBELL ROW', currentweight:this.props.back[0].dumbbellRowRepsWeight, currentreps:this.props.back[0].dumbbellRowReps})
       }
       if(this.state.workoutnr == 3)
       {
        this.setState({currentworkout:'BICEPS', currentweight:this.props.back[0].bicepsRepsWeight, currentreps:this.props.back[0].bicepsReps})
       }
       if(this.state.workoutnr == 4)
       {
        this.setState({currentworkout:'FOREARMS', currentweight:this.props.back[0].forearmRepsWeight, currentreps:this.props.back[0].forearmRepsWeight})
       }
       if(this.state.workoutnr == 5)
       {
        this.setState({currentworkout:'SHOULDERS', currentweight:this.props.back[0].shoulderRepsWeight, currentreps:this.props.back[0].shoulderReps})
       }
       if(this.state.workoutnr == 6)
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
   componentWillUnmount() {
    clearInterval(this._interval);
  }
   SubmitWorkout = async (event) =>{
     console.log('submited workout')
     console.log('back', this.props.back[0])
     const registered = {
        sessionsCompleted:this.props.back[0].sessionsCompleted + 1,
        cableRowRepsWeight:this.props.back[0].cableRowRepsWeight + (this.state.bigweights * (this.props.back[0].sessionsCompleted / 8)),
        cableRowReps:this.props.back[0].cableRowReps,
        pullupReps:this.props.back[0].pullupReps + 1,
        dumbbellRowRepsWeight:this.props.back[0].dumbbellRowRepsWeight + (this.state.bigweights * (this.props.back[0].sessionsCompleted / 8)),
        dumbbellRowReps:this.props.back[0].dumbbellRowReps,
        bicepsRepsWeight:this.props.back[0].bicepsRepsWeight + (this.state.bigweights * (this.props.back[0].sessionsCompleted / 8)),
        bicepsReps:this.props.back[0].bicepsReps,
        forearmRepsWeight:this.props.back[0].forearmRepsWeight + (this.state.bigweights * (this.props.back[0].sessionsCompleted / 8)),
        forearmReps:this.props.back[0].forearmReps,
        shoulderRepsWeight:this.props.back[0].shoulderRepsWeight + (this.state.bigweights * (this.props.back[0].sessionsCompleted / 8)),
        shoulderReps:this.props.back[0].shoulderReps,
   }
   const registered2 = {
    sessionsCompleted:this.props.back[0].sessionsCompleted + 1,
    cableRowRepsWeight:this.props.back[0].cableRowRepsWeight,
    cableRowReps:this.props.back[0].cableRowReps,
    pullupReps:this.props.back[0].pullupReps,
    dumbbellRowRepsWeight:this.props.back[0].dumbbellRowRepsWeight,
    dumbbellRowReps:this.props.back[0].dumbbellRowReps,
    bicepsRepsWeight:this.props.back[0].bicepsRepsWeight,
    bicepsReps:this.props.back[0].bicepsReps,
    forearmRepsWeight:this.props.back[0].forearmRepsWeight,
    forearmReps:this.props.back[0].forearmReps,
    shoulderRepsWeight:this.props.back[0].shoulderRepsWeight,
    shoulderReps:this.props.back[0].shoulderReps,
}
   if(this.props.back[0].sessionsCompleted % 8 == 0){
   const backinfo = {registered: registered, id: this.props.back[0]._id}
     this.setState({ errorse: null }, async() => {
       try {
           
           const back = await this.props.updateBack(backinfo)
           this.setState({ count: 0})
       } catch (error) {
           this.setState({ errorse: error?.message })
       }
   })
    }
    if(this.props.back[0].sessionsCompleted % 8 !== 0){
        const backinfo = {registered: registered2, id: this.props.back[0]._id}
          this.setState({ errorse: null }, async() => {
            try {
                
                const back = await this.props.updateBack(backinfo)
                this.setState({ count:this.state.count + 1})
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
            <Header title="RUNNI" componentId={this.props.componentId} legs={this.props.legs[0]} chest={this.props.chest[0]} back={this.props.back[0]}/>
            <View style={styles.header}>
                <Text style={styles.textGlowing}>YOUR BACK PLAN:  {this.props.back[0].userName}</Text>
                <Text style={styles.textGlowing}>YOU HAVE COMPLETED :  {this.props.back[0].sessionsCompleted} SESSIONS SO FAR</Text>
                <Text style={styles.textGlowing}>CABLEROW: REPETITIONS: {this.props.back[0].cableRowReps} WORKING WEIGHT: {this.props.back[0].cableRowRepsWeight}</Text>
                <Text style={styles.textGlowing}>PULLUP REPETITIONS: {this.props.back[0].pullupReps}</Text>  
                <Text style={styles.textGlowing}>DUMBBELL ROW: REPETITIONS: {this.props.back[0].dumbbellRowReps} WORKING WEIGHT: {this.props.back[0].dumbbellRowRepsWeight}</Text>
                <Text style={styles.textGlowing}>BICEPS REPETITIONS: {this.props.back[0].bicepsReps} WORKING WEIGHT: {this.props.back[0].bicepsRepsWeight}</Text>
                <Text style={styles.textGlowing}>FOREARMS: REPETITIONS: {this.props.back[0].forearmReps} WORKING WEIGHT: {this.props.back[0].forearmRepsWeight}</Text>
                <Text style={styles.textGlowing}>SHOULDERS: REPETITIONS: {this.props.back[0].shoulderReps} WORKING WEIGHT: {this.props.back[0].shoulderRepsWeight}</Text>                   
               <Buttons color={this.state.buttoncolor} title={'Start back workout'} onPress={this.startworkout}></Buttons>
               <Buttons title={'Submit completed back workout'} onPress={this.SubmitWorkout}/>
           </View>
         </View>
       );
        }
       if(this.state.isworkingout && !this.state.isresting)
       {
       return (
         <View style={styles.container}>
            <Header title="RUNNI" componentId={this.props.componentId} legs={this.props.legs[0]} chest={this.props.chest[0]} back={this.props.back[0]}/>
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
         <Header title="RUNNI" componentId={this.props.componentId} legs={this.props.legs[0]} chest={this.props.chest[0]} back={this.props.back[0]}/>
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
 Back.options = {
    topBar: {
        visible: false,
    }
}
 const mapState = ({ authentication }) => ({
   userName: authentication.userName,
   legs: authentication.legs,
   back: authentication.back,
   chest: authentication.chest,
   totalDistance:authentication.profile,
   totalTime:authentication.runtime,
   totalWorkouts:authentication.workouts,
 })

 const mapDispatch = ({ authentication: { login, getBack, getLegs, getChest, updateBack } }) => ({
    login,
    getBack,
    getLegs,
    getChest,
    updateBack
 })
 
 const BackContainer = connect(
    mapState,
    mapDispatch
 )(Back)
 
 export default BackContainer;