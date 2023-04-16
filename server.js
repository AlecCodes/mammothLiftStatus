//const loaders = require('./loader')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()
const fetch = (...args) => 
    import('node-fetch').then(({default:fetch}) => fetch(...args))

const URL = "https://www.mtnpowder.com/feed?resortId=60"

const PORT = process.env.PORT
const app = express();
const connection = require('./Models/connection')

////////////////////////
//functions
////////////////////////
async function liftLoader(){
    const response = await fetch(URL)
    const data = await response.json()
    return data
} 

const scheduledJobFunction = cron.schedule('*/2 * * * * *', ()=> {
    liftLoader().then((data) => console.log(data.MountainAreas))
    console.log("running a task every 2 sec")
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))