//Date, and lift status
const mongoose = require('./connection')

const liftReportSchema = new mongoose.Schema({
    lastUpdated: String,
    broadwayExpress, String,
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

})

const liftReport = mongoose.model("liftReport", liftReportSchema)

module.exports = liftReport