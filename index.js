const express = require('express');

const app = express();

const scheduleRouter = require('./router/scheduleRoute');
const ratingRouter = require('./router/ratingRouter');

app.use('/schedule', scheduleRouter);
app.use('/ranking', ratingRouter);

app.get('/', (req,res) => {
    res.send("You are in default Rought")
});
app.listen(3000, () => {
    console.log("Server is Runnig on Port : ",3000);
})