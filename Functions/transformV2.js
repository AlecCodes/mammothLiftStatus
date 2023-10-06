const liftReport = require("../Models/liftReport")
const mongoose = require("../Models/connection")
const {newLiftReportSchema} = require("../Models/V2_liftReport")

async function transformV2(){
    const existingReports = await liftReport.find()

    const transformedReports = existingReports.map(oldReport => ({
        reportDate: oldReport.reportDate,
        lastUpdated: oldReport.lastUpdated,
        chairs: {
            broadwayExpress: oldReport.broadwayExpress,
            stumpAlleyExpress: oldReport.stumpAlleyExpress,
            faceLiftExpress: oldReport.faceLiftExpress,
            unboundExpress: oldReport.unboundExpress,
            goldRushExpress: oldReport.goldRushExpress,
            discoveryExpress: oldReport.discoveryExpress,
            chair12: oldReport.chair12,
            chair13: oldReport.chair13,
            chair14: oldReport.chair14,
            chair23: oldReport.chair23,
            panoramaLower: oldReport.panoramaLower,
            panoramaUpper: oldReport.panoramaUpper,
            rollerCoasterExpress: oldReport.rollerCoasterExpress,
            high5Express: oldReport.high5Express,
            chair7: oldReport.chair7,
            chair8: oldReport.chair8,
            canyonExpress: oldReport.canyonExpress,
            schoolyardExpress: oldReport.schoolyardExpress,
            chair20: oldReport.chair20,
            chair21: oldReport.chair21,
            chair22: oldReport.chair22,
            villageGondola: oldReport.villageGondola,
            cloudNine: oldReport.cloudNine,
            eagleExpress: oldReport.eagleExpress,
            chair25: oldReport.chair25
        }   
    }))

    
//    console.log(transformedReports)
    
    const newLiftReport = mongoose.model("V2_liftReport", newLiftReportSchema)
    newLiftReport.insertMany(transformedReports)
}

module.exports = transformV2