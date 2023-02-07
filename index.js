const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const app = express()

const scheduleRouter = require('./router/scheduleRoute')
const ratingRouter=require('./router/ratingRouter')

app.use('/schedule', scheduleRouter)
app.use('/ranking',ratingRouter)

const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log("Server is Runnig on Port : ",PORT);
})