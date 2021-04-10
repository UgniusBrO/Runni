const express = require('express')
const router = express.Router()
const SignUpTemplateCopy = require('../models/signUpModels')
const bcrypt = require('bcrypt')
const { request } = require('express')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

router.post('/signup', async (request, response) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)

    const signedUpUser = new SignUpTemplateCopy({
        fullName:request.body.fullName,
        userName:request.body.userName,
        email:request.body.email,
        password:securePassword
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

     if(await bcrypt.compare(pass, user.password))
    {
         const token = jwt.sign({
            id: SignUpTemplateCopy.id,
            userName: SignUpTemplateCopy.userName
        }, process.env.JWT_SECRET)
        return response.json({status: 'ok', data: token})
    }
    response.json({ status: 'error', error:'Invalid password'})
    
})
module.exports = router