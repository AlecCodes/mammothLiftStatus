const mongoose = require("./connection")

const newLiftReportSchema = new mongoose.Schema({
    reportDate: Date,
    lastUpdated: String,
    snowReport: {
        BaseAreaLast24h : String,
        MidMountainAreaLast24h : String,
        SummitAreaLast24h : String
    },
    chairs: {
        broadwayExpress: String,
        stumpAlleyExpress: String,
        faceLiftExpress: String,
        unboundExpress: String,
        goldRushExpress:  String,
        discoveryExpress: String ,
        chair12:  String,
        chair13:  String,
        chair14:  String,
        chair23:  String,
        panoramaLower:  String,
        panoramaUpper:  String,
        rollerCoasterExpress: String,
        high5Express:  String,
        chair7:  String,
        chair8:  String,
        canyonExpress:  String,
        schoolyardExpress:  String,
        chair20:  String,
        chair21:  String,
        chair22:  String,
        villageGondola:  String,
        cloudNine :  String,
        eagleExpress :  String,
        chair25 :  String,
    }
})

const newLiftReport = mongoose.model("V2_liftReport", newLiftReportSchema)

module.exports = newLiftReport