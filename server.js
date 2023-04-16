//const loaders = require('./loader')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()
const fetch = (...args) => 
    import('node-fetch').then(({default:fetch}) => fetch(...args))

const URL = "https://www.mtnpowder.com/feed?resortId=60"

const PORT = process.env.PORT
const app = express();
const liftReport = require('./Models/liftReport')

////////////////////////
//functions
////////////////////////
async function liftLoader(){
    const response = await fetch(URL)
    const data = await response.json()
    return data
} 

//Chron
const scheduledJobFunction = cron.schedule('*/20 * * * * *', ()=> {
    liftLoader().then((data) => {


            const MountainAreas = data.MountainAreas.slice(data.MountainAreas.length - 3)

            const liftReportDocument = {
                lastUpdated: MountainAreas[0].LastUpdate
            }
            console.log(liftReportDocument)
//            console.log(MountainAreas)
        }
    )
    console.log("running a task every 20 sec")
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))