const express = require('express')


const app = express()

const scheduleRouter = require('./router/scheduleRoute')
const ratingRouter=require('./router/ratingRouter')

app.use('/schedule', scheduleRouter)
app.use('/ranking',ratingRouter)

app.get('/', () => {
    console.log("You are in default Root");
})
app.listen(80, () => {
    console.log("Server is Runnig on Port : ",80);
})