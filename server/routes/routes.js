const express = require('express')
const router = express.Router()
const SignUpTemplateCopy = require('../models/signUpModels')
const workoutlegsTemplateCopy = require('../models/workoutlegsModel')
const workoutbackTemplateCopy = require('../models/workoutbackModel')
const workoutchestTemplateCopy = require('../models/workoutchestModels')
const trackTemplateCopy = require('../models/trackModels')
const bcrypt = require('bcrypt')
const { request } = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const auth = require('../../middleware/auth')
dotenv.config()

router.post('/signup', async (request, response) => {
    if (!request.body.password) {
        return response.json({ _message: 'accounts validation failed' })
    }
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new SignUpTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:securePassword,
        isConfirmed:request.body.isConfirmed,
        totalDistance:request.body.totalDistance,
        totalTracks:request.body.totalTracks,
        totalTimeRun:request.body.totalTimeRun,
        totalsessions:request.body.totalsessions,
    })

    signedUpUser.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

router.post('/login', async (request, response) =>
{
    const user = await SignUpTemplateCopy.findOne({ userName: request.body.userName})
    const pass = request.body.password
    if(!user)
    {
        return response.json({status: 'error', error: 'User not found'})
    }

    const passwordCorrect = await bcrypt.compare(pass, user.password)

     if(passwordCorrect)
    {
         const token = jwt.sign({
            id: SignUpTemplateCopy.id,
            userName: SignUpTemplateCopy.userName
        }, process.env.JWT_SECRET)
        return response.json({status: 'ok', data:token, profile:user.totalDistance, currentuser:user.userName, runtime:user.totalTimeRun, userid:user._id , workouts:user.totalsessions})
    }
    response.json({ status: 'error', error:'Invalid password'})
    
})

router.post('/workoutlegs', async (request, response) => {
    const legsworkout = new workoutlegsTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        userWeight:request.body.userWeight,
        userHeight:request.body.userHeight,
        quadsReps:request.body.quadsReps,
        quadsRepsWeight:request.body.quadsRepsWeight,
        squatReps:request.body.squatReps,
        squatRepsWeight:request.body.squatRepsWeight,
        hamstringReps:request.body.hamstringReps,
        hamstringRepsWeight:request.body.hamstringRepsWeight,
        glutesReps:request.body.glutesReps,
        glutesRepsWeight:request.body.glutesRepsWeight,
        calvesReps:request.body.calvesReps,
        calvesRepsWeight:request.body.calvesRepsWeight,
        totalTimeSession:request.body.totalTimeSession,
        sessionsCompleted:request.body.sessionsCompleted,
        trainingMode:request.body.trainingMode,
        gender:request.body.gender,
    })
    legsworkout.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})
router.post('/workoutback', async (request, response) => {
    const backworkout = new workoutbackTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        userWeight:request.body.userWeight,
        userHeight:request.body.userHeight,
        pullupReps:request.body.pullupReps,
        cableRowReps:request.body.cableRowReps,
        cableRowRepsWeight:request.body.cableRowRepsWeight,
        dumbbellRowReps:request.body.dumbbellRowReps,
        dumbbellRowRepsWeight:request.body.dumbbellRowRepsWeight,
        bicepsReps:request.body.bicepsReps,
        bicepsRepsWeight:request.body.bicepsRepsWeight,
        forearmReps:request.body.forearmReps,
        forearmRepsWeight:request.body.forearmRepsWeight,
        shoulderReps:request.body.shoulderReps,
        shoulderRepsWeight:request.body.shoulderRepsWeight,
        totalTimeSession:request.body.totalTimeSession,
        sessionsCompleted:request.body.sessionsCompleted,
        trainingMode:request.body.trainingMode,
        gender:request.body.gender,
    })
    backworkout.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})
router.post('/workoutchest', async (request, response) => {
    const chestworkout = new workoutchestTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        userWeight:request.body.userWeight,
        userHeight:request.body.userHeight,
        chestdipReps:request.body.chestdipReps,
        benchpressReps:request.body.benchpressReps,
        benchpressRepsWeight:request.body.benchpressRepsWeight,
        chestflyReps:request.body.chestflyReps,
        chestflyRepsWeight:request.body.chestflyRepsWeight,
        triceppushdownReps:request.body.triceppushdownReps,
        triceppushdownRepsWeight:request.body.triceppushdownRepsWeight,
        overheadbarbellextensionReps:request.body.overheadbarbellextensionReps,
        overheadbarbellextensionRepsWeight:request.body.overheadbarbellextensionRepsWeight,
        shoulderReps:request.body.shoulderReps,
        shoulderRepsWeight:request.body.shoulderRepsWeight,
        totalTimeSession:request.body.totalTimeSession,
        sessionsCompleted:request.body.sessionsCompleted,
        trainingMode:request.body.trainingMode,
        gender:request.body.gender,
    })
    chestworkout.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})
router.post('/tracks', async (request, response) => {
    const { ownerOftrack, runner, startCoordinates, endCoordinates,
      recordTime, tracksDistance, userSpeed, polyline } = request.body
    const tracks = new trackTemplateCopy({
        ownerOftrack,
        runner,
        startCoordinates,
        endCoordinates,
        recordTime,
        tracksDistance,
        userSpeed,
        polyline,
    })
    tracks.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})
router.put('/tracks/:id', async (request, response) => {
    let track = await trackTemplateCopy.findOneAndUpdate( { _id: request.params.id },
        {userSpeed:request.body.userSpeed, runner:request.body.runner}, {new:true})
    return response.json({status: 'ok', data: track })
})
router.get('/tracks', async (request, response) => {
    const tracks = await trackTemplateCopy.find({ ownerOftrack: request.query.userName })
     return response.json({status: 'ok', data: tracks })

})
router.put('/workoutchest/:id', async (request, response) => {
    let chest = await workoutchestTemplateCopy.findOneAndUpdate( { _id: request.params.id },
        {chestdipReps:request.body.chestdipReps, 
        benchpressRepsWeight:request.body.benchpressRepsWeight,
        chestflyRepsWeight:request.body.chestflyRepsWeight, 
        verheadbarbellextensionRepsWeight:request.body.overheadbarbellextensionRepsWeight,
        triceppushdownRepsWeight:request.body.triceppushdownRepsWeight, 
        shoulderRepsWeight:request.body.shoulderRepsWeight,
        sessionsCompleted:request.body.sessionsCompleted }, {new:true})
    return response.json({status: 'ok', data: chest })
})
router.get('/workoutchest', async (request, response) => {
    const workoutchest = await workoutchestTemplateCopy.find({ userName: request.query.userName })
    return response.json({status: 'ok', data: workoutchest })

})
router.put('/workoutlegs/:id', async (request, response) => {
    let legs = await workoutlegsTemplateCopy.findOneAndUpdate( { _id: request.params.id },
        {quadsRepsWeight:request.body.quadsRepsWeight,
            squatRepsWeight:request.body.squatRepsWeight,
            hamstringRepsWeight:request.body.hamstringRepsWeight,
            glutesRepsWeight:request.body.glutesRepsWeight,
            calvesRepsWeight:request.body.calvesRepsWeight,
            sessionsCompleted:request.body.sessionsCompleted}, {new:true})
    return response.json({status: 'ok', data: legs })
})
router.get('/workoutlegs', async (request, response) => {
    const workoutlegs = await workoutlegsTemplateCopy.find({ userName: request.query.userName })
    return response.json({status: 'ok', data: workoutlegs })

})
router.put('/workoutback/:id', async (request, response) => {
    let back = await workoutbackTemplateCopy.findOneAndUpdate( { _id: request.params.id },
        {pullupReps:request.body.pullupReps, 
            cableRowRepsWeight:request.body.cableRowRepsWeight,
            dumbbellRowRepsWeight:request.body.dumbbellRowRepsWeight,
            bicepsRepsWeight:request.body.bicepsRepsWeight,
            forearmRepsWeight:request.body.forearmRepsWeight,
            shoulderRepsWeight:request.body.shoulderRepsWeight,
            sessionsCompleted:request.body.sessionsCompleted }, {new:true})
    return response.json({status: 'ok', data: back })
})
router.get('/workoutback', async (request, response) => {
    const workoutback = await workoutbackTemplateCopy.find({ userName: request.query.userName })
    return response.json({status: 'ok', data: workoutback })

})
router.get('/account', (request, response) => {
    SignUpTemplateCopy.findOne(request.user.userName)
    .select('-password')
    .then(user => response.json(user));
});
module.exports = router