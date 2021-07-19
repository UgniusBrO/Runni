const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')
dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected"), { useFindAndModify: false })
mongoose.set('useFindAndModify', false);
// after request we get here then we send request to routes.js and it sends response
// default listen on 3000

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls, )
app.listen(6000, () => console.log("server up and running."))