const mongoose = require('mongoose')

const trackTemplate = new mongoose.Schema({
    ownerOftrack:{
        type:String,
        required:true
    },
    runner:{
        type:String,
        required:true
    },
    startCoordinates:[{
        _id: false,
    latitude : Number,
    longitude : Number
         }],
    endCoordinates:[{
        _id: false,
    latitude : Number,
    longitude : Number
         }],
    recordTime:{
        type:Number,
    },
    tracksDistance:{
        type:Number,
    },
    userSpeed:{
        type:Number,
    },
    polyline:[{
        _id: false,
    latitude : Number,
    longitude : Number
     }],
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('tracks', trackTemplate)