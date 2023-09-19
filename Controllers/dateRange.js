const express = require("express");
const liftReport = require("../Models/liftReport");
const moment = require('moment')
moment().format()

const router = express.Router();


router.get("/", async(req,res) => {
    res.json("HELLO WORLD XD !!")
})

//Today's reports
router.get("/today", async (req, res) => {
    const today = moment().utc()
    console.log(today)
    try{
        res.json(await liftReport.find( {reportDate: {
            $gte: today.startOf('day').toDate(),
            $lt: moment(today).endOf('day').toDate()
        }} ) )
    } catch(error){
        res.status(400).json(error)
    }

})


//return 1 liftreport by date
router.get("/:date", async(req,res) => {
    try{
        res.json(await liftReport.find({reportDate: req.params.date}))
    } catch(error){
        res.status(400).json(error)
    }
})

//return all reports from a date onwards


//return range of liftreports
router.get("/:start/:end", async (req, res) => {
    try{
        res.json(await liftReport.find(
                {reportDate : {$gte: req.params.start , $lte: req.params.end}}
            ) 
        )
    } catch(error){
        res.status(400).json(error)
    }
})


module.exports = router;