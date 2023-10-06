//const loaders = require('./loader')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()
const dateRangeRouter = require("./Controllers/dateRange")
const morgan = require('morgan')
const cors = require('cors')



//import fetch into our express app
const URL = "https://www.mtnpowder.com/feed?resortId=60"

const PORT = process.env.PORT
const app = express();
const liftReport = require('./Models/liftReport')
const V2_liftReport = require('./Models/V2_liftReport')
const {liftLoader, dataCleaner} = require('./Functions/mammothFunctions')


///////////////////////
//MIDDLEWARE
///////////////////////

app.use(cors())
app.use('/dateRange', dateRangeRouter)
app.use(express.json())


//const liftLoader = require('./Functions/liftloader')
////////////////////////
//functions
////////////////////////


//Chron expression should be '0 8-16 * * *' for once at the top of an hour
const scheduledJobFunction = cron.schedule('0 8-16 * * *', ()=> {
    liftLoader(URL).then( (data) => dataCleaner(data))
// add document to db
    .then(data => V2_liftReport.create(data))
    console.log("running a task every hour 8-4pm")
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))