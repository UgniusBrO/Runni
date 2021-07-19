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
   Text
 } from "react-native";
 import Buttons from '../../components/Button'
 import { connect } from 'react-redux'
 import KeepAwake from 'react-native-keep-awake';
 import Header from '../../components/Header'
 import CCC from '../../sendModule';
 
 class Chest extends React.Component {
   constructor(props) {
     super(props);
 
     this.state = {
       bigweights:5,
       smallweights:1,
       increment:1,
       workingout:false,
       errorse: null,
       sessionsCompleted:'',
       benchpressRepsWeight:'',
       benchpressReps:'',
       chestdipReps:'',
       chestflyRepsWeight:'',
       chestflyReps:'',
       overheadbarbellextensionRepsWeight:'',
       overheadbarbellextensionReps:'',
       triceppushdownRepsWeight:'',
       triceppushdownReps:'',
       shoulderRepsWeight:'',
       shoulderReps:'',
       count:0,
       timercount:5,
       resttimer:5,
       isworkingout:false,
       isresting:false,
       currentworkout:'BENCHPRESS',
      //  currentweight:0,
      //  currentreps:0,
       currentweight:this.props.chest[0].benchpressRepsWeight,
       currentreps:this.props.chest[0].benchpressReps,
       workoutnr:0,
       sets:4
     };
     this.SubmitWorkout = this.SubmitWorkout.bind(this)
     this.startworkout = this.startworkout.bind(this)

   }
    componentDidMount()
   {
    this.props.getChest();
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
        this.setState({currentworkout:'CHEST DIP', currentweight:0, currentreps:this.props.chest[0].chestdipReps})
       }
       if(this.state.workoutnr == 2)
       {
        this.setState({currentworkout:'CHEST FLY', currentweight:this.props.chest[0].chestflyRepsWeight, currentreps:this.props.chest[0].chestflyReps})
       }
       if(this.state.workoutnr == 3)
       {
        this.setState({currentworkout:'OVERHEAD BARBELL EXTENSIONS', currentweight:this.props.chest[0].overheadbarbellextensionRepsWeight, currentreps:this.props.chest[0].overheadbarbellextensionReps})
       }
       if(this.state.workoutnr == 4)
       {
        this.setState({currentworkout:'TRICEPS PUSH DOWNS', currentweight:this.props.chest[0].triceppushdownRepsWeight, currentreps:this.props.chest[0].triceppushdownReps})
       }
       if(this.state.workoutnr == 5)
       {
        this.setState({currentworkout:'SHOULDERS', currentweight:this.props.chest[0].shoulderRepsWeight, currentreps:this.props.chest[0].shoulderReps})
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
     console.log('chests', this.props.chest[0])
     const registered = {
        sessionsCompleted:this.props.chest[0].sessionsCompleted + 1,
        benchpressRepsWeight:this.props.chest[0].benchpressRepsWeight + (this.state.bigweights * (this.props.chest[0].sessionsCompleted / 8)),
        benchpressReps:this.props.chest[0].benchpressReps,
        chestdipReps:this.props.chest[0].chestdipReps + 1,
        chestflyRepsWeight:this.props.chest[0].chestflyRepsWeight + (this.state.bigweights * (this.props.chest[0].sessionsCompleted / 8)),
        chestflyReps:this.props.chest[0].chestflyReps,
        overheadbarbellextensionRepsWeight:this.props.chest[0].overheadbarbellextensionRepsWeight + (this.state.bigweights * (this.props.chest[0].sessionsCompleted / 8)),
        overheadbarbellextensionReps:this.props.chest[0].overheadbarbellextensionReps,
        triceppushdownRepsWeight:this.props.chest[0].triceppushdownRepsWeight + (this.state.bigweights * (this.props.chest[0].sessionsCompleted / 8)),
        triceppushdownReps:this.props.chest[0].triceppushdownReps,
        shoulderRepsWeight:this.props.chest[0].shoulderRepsWeight + (this.state.bigweights * (this.props.chest[0].sessionsCompleted / 8)),
        shoulderReps:this.props.chest[0].shoulderReps,
   }
   const registered2 = {
    sessionsCompleted:this.props.chest[0].sessionsCompleted + 1,
    benchpressRepsWeight:this.props.chest[0].benchpressRepsWeight,
    benchpressReps:this.props.chest[0].benchpressReps,
    chestdipReps:this.props.chest[0].chestdipReps,
    chestflyRepsWeight:this.props.chest[0].chestflyRepsWeight,
    chestflyReps:this.props.chest[0].chestflyReps,
    overheadbarbellextensionRepsWeight:this.props.chest[0].overheadbarbellextensionRepsWeight,
    overheadbarbellextensionReps:this.props.chest[0].overheadbarbellextensionReps,
    triceppushdownRepsWeight:this.props.chest[0].triceppushdownRepsWeight,
    triceppushdownReps:this.props.chest[0].triceppushdownReps,
    shoulderRepsWeight:this.props.chest[0].shoulderRepsWeight,
    shoulderReps:this.props.chest[0].shoulderReps,
}
   if(this.props.chest[0].sessionsCompleted % 8 == 0){
   const chestinfo = {registered: registered, id: this.props.chest[0]._id}
     this.setState({ errorse: null }, async() => {
       try {
           
           const chest = await this.props.updateChest(chestinfo)
           this.setState({ count: 0})
       } catch (error) {
           this.setState({ errorse: error?.message })
       }
   })
    }
    if(this.props.chest[0].sessionsCompleted % 8 !== 0){
        const chestinfo = {registered: registered2, id: this.props.chest[0]._id}
          this.setState({ errorse: null }, async() => {
            try {
                
                const chest = await this.props.updateChest(chestinfo)
                this.setState({ count:this.state.count + 1})
                console.log('aaaaa',chest)
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
                <Text style={styles.textGlowing}>YOUR CHEST PLAN:  {this.props.chest[0].userName}</Text>
                <Text style={styles.textGlowing}>YOU HAVE COMPLETED :  {this.props.chest[0].sessionsCompleted} SESSIONS SO FAR</Text>
                <Text style={styles.textGlowing}>BENCHPRESS: REPETITIONS: {this.props.chest[0].benchpressReps} WORKING WEIGHT: {this.props.chest[0].benchpressRepsWeight}</Text>
                <Text style={styles.textGlowing}>CHESTDIP REPETITIONS: {this.props.chest[0].chestdipReps}</Text>  
                <Text style={styles.textGlowing}>CHESTFLY: REPETITIONS: {this.props.chest[0].chestflyReps} WORKING WEIGHT: {this.props.chest[0].chestflyRepsWeight}</Text>
                <Text style={styles.textGlowing}>OVERHEAD BARBELL EXTENSIONS: REPETITIONS: {this.props.chest[0].overheadbarbellextensionReps} WORKING WEIGHT: {this.props.chest[0].overheadbarbellextensionRepsWeight}</Text>
                <Text style={styles.textGlowing}>TRICEPS PUSHDOWN: REPETITIONS: {this.props.chest[0].triceppushdownReps} WORKING WEIGHT: {this.props.chest[0].triceppushdownRepsWeight}</Text>
                <Text style={styles.textGlowing}>SHOULDERS: REPETITIONS: {this.props.chest[0].shoulderReps} WORKING WEIGHT: {this.props.chest[0].shoulderRepsWeight}</Text>                   
               <Buttons color={this.state.buttoncolor} title={'Start chest workout'} onPress={this.startworkout}></Buttons>
               <Buttons title={'Submit completed chest workout'} onPress={this.SubmitWorkout}/>
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
 Chest.options = {
    topBar: {
        visible: false,
    }
}
 const mapState = ({ authentication }) => ({
   userName: authentication.userName,
   chest: authentication.chest,
   totalDistance:authentication.profile,
   totalTime:authentication.runtime,
   totalWorkouts:authentication.workouts,
 })

 const mapDispatch = ({ authentication: { login, getChest, updateChest } }) => ({
    login,
    getChest,
    updateChest
 })
 
 const ChestContainer = connect(
    mapState,
    mapDispatch
 )(Chest)
 
 export default ChestContainer;