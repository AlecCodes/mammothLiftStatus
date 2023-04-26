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

//const liftLoader = require('./Functions/liftloader')
////////////////////////
//functions
////////////////////////
async function liftLoader(){
    const response = await fetch(URL)
    const data = await response.json()
    return data
} 

//Chron
const scheduledJobFunction = cron.schedule('* 8-16 * * *', ()=> {
    liftLoader().then((data) => {


            const MountainAreas = data.MountainAreas.slice(data.MountainAreas.length - 3)
            //Create a document from data response. Then call Create method of LiftReport Mongoose object 
            const liftReportDocument = {
                reportDate: new Date(),
                lastUpdated: MountainAreas[0].LastUpdate,
                broadwayExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Broadway Express 1')[0].Status,
                stumpAlleyExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Stump Alley Express 2')[0].Status,
                faceLiftExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Face Lift Express 3')[0].Status,
                unboundExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Unbound Express 6')[0].Status,
                goldRushExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Gold Rush Express 10')[0].Status,
                discoveryExpress: MountainAreas[0].Lifts.filter((element) => element.Name === 'Discovery Express 11')[0].Status,
                chair12: MountainAreas[0].Lifts.filter((element) => element.Name === 'Chair 12')[0].Status,
                chair13: MountainAreas[0].Lifts.filter((element) => element.Name === 'Chair 13')[0].Status,
                chair14: MountainAreas[0].Lifts.filter((element) => element.Name === 'Chair 14')[0].Status,
                chair23: MountainAreas[0].Lifts.filter((element) => element.Name === 'Chair 23')[0].Status,
                panoramaLower: MountainAreas[0].Lifts.filter((element) => element.Name === 'Panorama Lower')[0].Status,
                panoramaUpper: MountainAreas[0].Lifts.filter((element) => element.Name === 'Panorama Upper')[0].Status,
                rollerCoasterExpress: MountainAreas[1].Lifts.filter((element) => element.Name === 'Roller Coaster Express 4')[0].Status,
                high5Express: MountainAreas[1].Lifts.filter((element) => element.Name === 'High 5 Express')[0].Status,
                chair7: MountainAreas[1].Lifts.filter((element) => element.Name === 'Chair 7')[0].Status,
                chair8: MountainAreas[1].Lifts.filter((element) => element.Name === 'Chair 8')[0].Status,
                canyonExpress: MountainAreas[1].Lifts.filter((element) => element.Name === 'Canyon Express 16')[0].Status,
                schoolyardExpress: MountainAreas[1].Lifts.filter((element) => element.Name === 'Schoolyard Express 17')[0].Status,
                chair20: MountainAreas[1].Lifts.filter((element) => element.Name === 'Chair 20')[0].Status,
                chair21: MountainAreas[1].Lifts.filter((element) => element.Name === 'Chair 21')[0].Status,
                chair22: MountainAreas[1].Lifts.filter((element) => element.Name === 'Chair 22')[0].Status,
                villageGondola: MountainAreas[1].Lifts.filter((element) => element.Name === 'Village Gondola')[0].Status,
                cloudNine : MountainAreas[2].Lifts.filter((element) => element.Name === 'Cloud Nine Express 9')[0].Status,
                eagleExpress : MountainAreas[2].Lifts.filter((element) => element.Name === 'Eagle Express 15')[0].Status,
                chair25 : MountainAreas[2].Lifts.filter((element) => element.Name === 'Chair 25')[0].Status,

            }
//            console.log(liftReportDocument)
            return liftReportDocument            
        }
    )
    .then(data => liftReport.create(data))
    console.log("running a task every hour 8am - 4pm every day")
}, {
    scheduled: true,
    timezone: "America/Los_Angeles"
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))