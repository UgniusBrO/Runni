import React from 'react'
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native'
import Button from '../../components/Button'
import { Navigation } from 'react-native-navigation'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux'
class Workouts extends React.Component {
    constructor() {
        super()
        this.state = {
            fullName:'LegsWorkout',
            fullName1:'BackWorkout',
            fullName2:'ChestWorkout',
            userName:'',
            userWeight:'',
            userHeight:'',
            quadsReps:'6',
            quadsRepsWeight:'',
            squatReps:'6',
            squatRepsWeight:'',
            hamstringReps:'6',
            hamstringRepsWeight:'',
            glutesReps:'6',
            glutesRepsWeight:'',
            calvesReps:'6',
            calvesRepsWeight:'',
            pullupReps:'6',
            cableRowReps:'6',
            cableRowRepsWeight:'',
            dumbbellRowReps:'6',
            dumbbellRowRepsWeight:'',
            bicepsReps:'6',
            bicepsRepsWeight:'',
            forearmReps:'6',
            forearmRepsWeight:'',
            shoulderReps:'6',
            shoulderRepsWeight:'',
            chestdipReps:'6',
            benchpressReps:'6',
            benchpressRepsWeight:'',
            chestflyReps:'6',
            chestflyRepsWeight:'',
            triceppushdownReps:'6',
            triceppushdownRepsWeight:'',
            overheadbarbellextensionReps:'6',
            overheadbarbellextensionRepsWeight:'',
            totalTimeSession:'0',
            sessionsCompleted:'0',
            trainingMode:'',
            gender:'',
            gendercoeficient:'',
            modecoeficient:'',
            weightcoeficient:0,
            errorse: null,
        }
        this.changeWeight = this.changeWeight.bind(this)
        this.changeHeight = this.changeHeight.bind(this)
        this.pressHandler = this.pressHandler.bind(this)
        this.pressHandlermode = this.pressHandlermode.bind(this)
        this.navigateToTracks = this.navigateToTracks.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeWeight = (userWeight) =>{
        this.setState({
            userWeight
        })
    }
    changeHeight = (userHeight) =>{
        this.setState({
            userHeight
        })
    }
    pressHandler = (gender) => {
        this.setState({
            gender
        })
    }
    pressHandlermode = (trainingMode) => {
        this.setState({
            trainingMode
        })
    }
    navigateToTracks() {
        Navigation.push(this.props.componentId, { component: { name: 'Tracks' } })
    }
    onSubmit = async (event) =>{
        event.preventDefault()
        if((this.state.userHeight - this.state.userWeight) < 100 || this.state.trainingMode != 'BEGGINER')
        {
            this.state.quadsReps = '8',
            this.state.squatReps = '8',
            this.state.hamstringReps = '8',
            this.state.glutesReps = '8',
            this.state.calvesReps = '8',
            this.state.pullupReps = '8',
            this.state.cableRowReps = '8',
            this.state.dumbbellRowReps = '8',
            this.state.bicepsReps = '8',
            this.state.forearmReps = '8',
            this.state.shoulderReps = '8',
            this.state.chestdipReps = '8',
            this.state.benchpressReps = '8',
            this.state.chestflyReps = '8',
            this.state.triceppushdownReps = '8',
            this.state.overheadbarbellextensionReps = '8'
        }
        if(this.state.gender == "Female")
        {
            this.state.gendercoeficient = 1;
        }
        if(this.state.gender == "Male")
        {
            this.state.gendercoeficient = 2;
        }
        if(this.state.trainingMode == "BEGGINER")
        {
            this.state.modecoeficient = 0;
        }
        if(this.state.trainingMode == "INTERMEDIATE")
        {
            this.state.modecoeficient = 1;
        }
        if(this.state.trainingMode == "EXPERIENCED")
        {
            this.state.modecoeficient = 3;
        }
        if((this.state.userHeight - this.state.userWeight) > 100)
        {
            this.state.weightcoeficient = 5;
        }
            this.state.quadsRepsWeight= (10 * this.state.gendercoeficient) + (this.state.modecoeficient * 10) - this.state.weightcoeficient,
            this.state.squatRepsWeight= (5 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.hamstringRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 10)- this.state.weightcoeficient,
            this.state.glutesRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.calvesRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.cableRowRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.dumbbellRowRepsWeight=(5 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.bicepsRepsWeight=(5 * this.state.gendercoeficient) + (this.state.modecoeficient * 10)- this.state.weightcoeficient,
            this.state.forearmRepsWeight=(5 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.shoulderRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.benchpressRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5) - this.state.weightcoeficient,
            this.state.chestflyRepsWeight=(10 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.triceppushdownRepsWeight=(5 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient,
            this.state.overheadbarbellextensionRepsWeight=(5 * this.state.gendercoeficient) + (this.state.modecoeficient * 5)- this.state.weightcoeficient

        const registered = {
            fullName:this.state.fullName,
            userName:this.props.userName,
            userWeight:this.state.userWeight,
            userHeight:this.state.userHeight,
            quadsReps:this.state.quadsReps,
            quadsRepsWeight:this.state.quadsRepsWeight,
            squatReps:this.state.squatReps,
            squatRepsWeight:this.state.squatRepsWeight,
            hamstringReps:this.state.hamstringReps,
            hamstringRepsWeight:this.state.hamstringRepsWeight,
            glutesReps:this.state.glutesReps,
            glutesRepsWeight:this.state.glutesRepsWeight,
            calvesReps:this.state.calvesReps,
            calvesRepsWeight:this.state.calvesRepsWeight,
            totalTimeSession:this.state.totalTimeSession,
            sessionsCompleted:this.state.sessionsCompleted,
            trainingMode:this.state.trainingMode,
            gender:this.state.gender,
        }
        const registeredback = {
            fullName:this.state.fullName1,
            userName:this.props.userName,
            userWeight:this.state.userWeight,
            userHeight:this.state.userHeight,
            pullupReps:this.state.pullupReps,
            cableRowReps:this.state.cableRowReps,
            cableRowRepsWeight:this.state.cableRowRepsWeight,
            dumbbellRowReps:this.state.dumbbellRowReps,
            dumbbellRowRepsWeight:this.state.dumbbellRowRepsWeight,
            bicepsReps:this.state.bicepsReps,
            bicepsRepsWeight:this.state.bicepsRepsWeight,
            forearmReps:this.state.forearmReps,
            forearmRepsWeight:this.state.forearmRepsWeight,
            shoulderReps:this.state.shoulderReps,
            shoulderRepsWeight:this.state.shoulderRepsWeight,
            totalTimeSession:this.state.totalTimeSession,
            sessionsCompleted:this.state.sessionsCompleted,
            trainingMode:this.state.trainingMode,
            gender:this.state.gender,
        }
        const registeredchest = {
            fullName:this.state.fullName2,
            userName:this.props.userName,
            userWeight:this.state.userWeight,
            userHeight:this.state.userHeight,
            chestdipReps:this.state.chestdipReps,
            benchpressReps:this.state.benchpressReps,
            benchpressRepsWeight:this.state.benchpressRepsWeight,
            chestflyReps:this.state.chestflyReps,
            chestflyRepsWeight:this.state.chestflyRepsWeight,
            triceppushdownReps:this.state.triceppushdownReps,
            triceppushdownRepsWeight:this.state.triceppushdownRepsWeight,
            overheadbarbellextensionReps:this.state.overheadbarbellextensionReps,
            overheadbarbellextensionRepsWeight:this.state.overheadbarbellextensionRepsWeight,
            shoulderReps:this.state.shoulderReps,
            shoulderRepsWeight:this.state.shoulderRepsWeight,
            totalTimeSession:this.state.totalTimeSession,
            sessionsCompleted:this.state.sessionsCompleted,
            trainingMode:this.state.trainingMode,
            gender:this.state.gender,
        }
        console.log('reg', registered)
        this.setState({ errorse: null }, async() => {
            try {
                await this.props.workoutlegs(registered)
                await this.props.workoutback(registeredback)
                await this.props.workoutchest(registeredchest)
                this.navigateToTracks()
            } catch (error) {
                this.setState({ errorse: error?.message })
            }
        })
    }
    
    render() {

        return (
            <View style={styles.container}>
                <Header title="RUNNI" componentId={this.props.componentId} legs={""} chest={""} back={""}></Header>
                <View style={styles.header}>
                    <Text style={styles.textGlowing}> <Icon name="dumbbell" size={40}></Icon> BEFORE WE START <Icon name="dumbbell" size={40}></Icon></Text>
                    <Text style={styles.textGlowing}> <Icon name="file-download" size={40}></Icon> FILL OUT THE FORM BELOW <Icon name="file-download" size={40}></Icon></Text>
                </View>
                <View style={styles.bottom}>
                <TextInput  style={styles.input}
                            onChangeText={this.changeWeight}
                            value={this.state.weight}
                            placeholder={'Your Weight in Kilograms'}>
                </TextInput>
                <TextInput  style={styles.input}
                            onChangeText={this.changeHeight}
                            value={this.state.height}
                            placeholder={'Your Height in Centimeters'}>
                </TextInput>
                <Text style={styles.textGlowing}> <Icon name="male" size={30}></Icon> YOUR GENDER? <Icon name="female" size={30}></Icon></Text>
                <FlatList data={DATAgender}
                          numColumns={2}                
                          renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => this.pressHandler(item.name)}>
                                <Text style={styles.item}>{item.name}</Text>
                              </TouchableOpacity>
                          )}
                          keyExtractor={item => item.id}>
                </FlatList>
                <Text style={styles.textGlowing}> <Icon name="fist-raised" size={50}></Icon> SELECT YOUR TRAINING EXPERIENCE <Icon name="fist-raised" size={50}></Icon></Text>
                <FlatList data={DATAMode}
                          numColumns={3}                
                          renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => this.pressHandlermode(item.name)}>
                                <Text style={styles.item}>{item.name}</Text>
                              </TouchableOpacity>
                          )}
                          keyExtractor={item => item.id}>
                </FlatList>
                    <Button title={'Create my workout plans'} onPress={this.onSubmit}>
                    </Button>
                </View>
            </View>
        )
    }
}
const DATAgender = [
    {
      id: "1",
      name: "Male",
    },
    {
      id: "2",
      name: "Female",
    },
  ];
  const DATAMode = [
    {
      id: "1",
      name: "BEGGINER",
    },
    {
      id: "2",
      name: "INTERMEDIATE",
    },
    {
        id: "3",
        name: "EXPERIENCED",
    },
  ];

const styles = StyleSheet.create({
    container: {
        flex: 6,
        backgroundColor: '#FFFFFF',
    },
    align:{
        flexDirection: 'row',
        alignItems:'center'
    },
    header: {
        height: 140,
        backgroundColor: '#9291E8',
        alignItems:'center',
        justifyContent: 'space-around',
    },
    bottom: {
        height: 420,
        backgroundColor: '#FFFFFF',
        alignItems:'center'
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        color: '#8A959E',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    text: {
        color: 'red',
        fontSize: 15,
        textAlign: 'center'
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
        fontSize:50,
    },
    item: {
        backgroundColor: '#6a5acd',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
      },
});

Workouts.options = {
    topBar: {
        visible: false,
    }
}
 const mapState = ({ authentication }) => ({
    userName: authentication.userName,
 })
 
 const mapDispatch = ({ authentication }) => ({
     login: authentication.login,
     workoutlegs: authentication.workoutlegs,
     workoutchest: authentication.workoutchest,
     workoutback: authentication.workoutback,

 })
 
 const WorkoutsContainer = connect(
     mapState,
     mapDispatch
 )(Workouts)
 
export default WorkoutsContainer;