const mongoose = require('mongoose')

const workoutbackTemplate = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    userWeight:{
        type:Number,
        required:true,
        min:40,
        max:200
    },
    userHeight:{
        type:Number,
        required:true,
        min:80,
        max:200
    },
    pullupReps:{
        type:Number,
    },
    cableRowReps:{
        type:Number,
    },
    cableRowRepsWeight:{
        type:Number,
    },
    dumbbellRowReps:{
        type:Number,
    },
    dumbbellRowRepsWeight:{
        type:Number,
    },
    bicepsReps:{
        type:Number,
    },
    bicepsRepsWeight:{
        type:Number,
    },
    forearmReps:{
        type:Number,
    },
    forearmRepsWeight:{
        type:Number,
    },
    shoulderReps:{
        type:Number,
    },
    shoulderRepsWeight:{
        type:Number,
    },
    totalTimeSession:{
        type:Number,
    },
    sessionsCompleted:{
        type:Number,
    },
    trainingMode:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('workoutback', workoutbackTemplate)