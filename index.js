const express = require('express')


const app = express()

const scheduleRouter = require('./router/scheduleRoute')
const ratingRouter=require('./router/ratingRouter')

app.use('/schedule', scheduleRouter)
app.use('/ranking',ratingRouter)

const PORT=3000
app.listen(PORT, () => {
    console.log("Server is Runnig on Port : ",PORT);
})