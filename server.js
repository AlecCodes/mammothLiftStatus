//const loaders = require('./loader')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()

//import fetch into our express app
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
const scheduledJobFunction = cron.schedule('*/2 * * * * *', ()=> {
    liftLoader().then((data) => {


            const MountainAreas = data.MountainAreas.slice(data.MountainAreas.length - 3)
            //Create a document from data response. Then call Create method of LiftReport Mongoose object starting w lift chair 23 status
            const liftReportDocument = {
                lastUpdated: MountainAreas[0].LastUpdate,
                chair23: MountainAreas[0].Lifts.filter((element) => element.Name === 'Chair 23')[0].Status
                // MainLodge: MountainAreas[0].Lifts,
                // CanyonLodge: MountainAreas[1].Lifts,
                // EagleLodge: MountainAreas[2].Lifts
            }
            console.log(liftReportDocument)

        }
    )
    console.log("running a task every 2 sec")
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))