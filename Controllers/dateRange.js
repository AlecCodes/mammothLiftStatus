const express = require("express");
const liftReport = require("../Models/liftReport");
const moment = require('moment')
moment().format()
const transformV2 = require("../Functions/transformV2")
const V2_liftReport = require("../Models/V2_liftReport")
const router = express.Router();


router.get("/", async(req,res) => {
    res.json("HELLO WORLD XD !!")
})

// router.put("/transform", async(req, res) => {
//     try{
//         transformV2()
//         res.json("Successful transformation")
//     } catch(error){
//         res.status(400).json(error)
//     }
// })

router.get("/getReportByISOTime/:time" , async (req, res) => {
    const isoTime = req.params.time
    const liftReport = await V2_liftReport.find({reportDate : isoTime})
    res.send(liftReport)
})

router.get("/getAllByDate/:date" , async (req,res) => {
    const day = new Date(req.params.date)
    //What if we start this at T:01? SO it skips the previous 4pm bug 
    const dayStart = new Date(day.toISOString().split('T')[0] + 'T01:00:00Z')
    //What if we moved this to include T01 for the next day? 
    //DST will change 8AM western time from T16 to T15
    //But T00 will be empty for the next day beacause DST is "Fall Back" an hour. so the result array should always end at 4pm

    //increment
    const nextDay = new Date(day)
    nextDay.setDate(nextDay.getDate() + 1)
    const dayEnd = new Date(nextDay.toISOString().split('T')[0] + 'T01:00:00Z')
    

    const mountainTime = day.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles"})
    console.log(mountainTime)

    //We need to find a way to query the reportDate field in localeTime instead of in ISO...

    try {
        res.json(await V2_liftReport.find({
            reportDate : {
                $gte : dayStart,
                $lte: dayEnd
            }
        }))
    } catch(error){
        res.status(400).json(error)
    }
})

//return 1 liftreport by id
router.get("/getById/:id", async(req,res) => {
    try{
        res.json(await V2_liftReport.findById(req.params.id))
    } catch(error){
        res.status(400).json(error)
    }
})


//Today's reports
router.get("/today", async (req, res) => {
    const today = moment().utc()
//    console.log(today)
    try{
        res.json(await V2_liftReport.find( {reportDate: {
            $gte: today.startOf('day').toDate(),
            $lt: moment(today).endOf('day').toDate()
        }} ) )
    } catch(error){
        res.status(400).json(error)
    }

})

//return all the dates from a given month/year
//range from first to last day of month
//The client will be giving 1-indexed months, so it must be converted to 0 indexed here
router.get("/month/:month/:year", async(req,res) => {
    const monthStart = new Date()
    monthStart.setUTCMonth(req.params.month-1)
    monthStart.setUTCFullYear(req.params.year)
    monthStart.setUTCDate(1)

    const monthEnd = new Date(monthStart)
    monthEnd.setUTCDate(1)
    monthEnd.setUTCMonth(monthEnd.getUTCMonth() + 1)
    monthEnd.setUTCDate(0)
    

    console.log(monthStart, monthEnd)
    try{
        res.json(await V2_liftReport.find({
                reportDate: {$gte: monthStart, $lte: monthEnd}
            }
        ))
    }catch(error){
        res.status(400).json(error)
    }
}) 


//return all reports from a date onwards


//return range of liftreports
router.get("/getRange/:start/:end", async (req, res) => {
    try{
        res.json(await V2_liftReport.find(
                {reportDate : {$gte: req.params.start , $lte: req.params.end}}
            ) 
        )
    } catch(error){
        res.status(400).json(error)
    }
})


module.exports = router;