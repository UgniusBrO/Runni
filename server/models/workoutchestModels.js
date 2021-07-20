const mongoose = require('mongoose')

const workoutchestTemplate = new mongoose.Schema({
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
    chestdipReps:{
        type:Number,
    },
    benchpressReps:{
        type:Number,
    },
    benchpressRepsWeight:{
        type:Number,
    },
    chestflyReps:{
        type:Number,
    },
    chestflyRepsWeight:{
        type:Number,
    },
    triceppushdownReps:{
        type:Number,
    },
    triceppushdownRepsWeight:{
        type:Number,
    },
    overheadbarbellextensionReps:{
        type:Number,
    },
    overheadbarbellextensionRepsWeight:{
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

module.exports = mongoose.model('workoutchest', workoutchestTemplate)