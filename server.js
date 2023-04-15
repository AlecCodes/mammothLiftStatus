//const loaders = require('./loader')
const express = require('express')
const cron = require('node-cron')
require('dotenv').config()
const fetch = (...args) => 
    import('node-fetch').then(({default:fetch}) => fetch(...args))

const URL = "https://www.mtnpowder.com/feed?resortId=60"

async function liftLoader(){
    const response = await fetch(URL)
    const data = await response.json()
    console.log(data)
    return data
}

const PORT = process.env.PORT
const app = express();

const scheduledJobFunction = cron.schedule('*/2 * * * * *', ()=> {
    const data =  liftLoader();
    console.dir(data.snowreport)
    console.log("running a task every 2 sec")
})


scheduledJobFunction.start()


app.listen(PORT, ()=>console.log(`Turning up on port ${PORT}`))