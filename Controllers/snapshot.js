const express = require('express')
const router = express.Router()
const V2_liftReport = require("../Models/V2_liftReport")
const {liftLoader, dataCleaner} = require('../Functions/mammothFunctions')
const URL = "https://www.mtnpowder.com/feed?resortId=60"


router.get("/", async (req,res) => {


    res.send(await V2_liftReport.findOne().sort({ reportDate : -1 })); 

    // liftLoader(URL)
    //     .then(data => dataCleaner(data))
    //     .then(result => res.json(result))

//    res.json("HELLO SNAPSHOT!")
})

module.exports = router