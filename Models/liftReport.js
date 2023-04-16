//Date, and lift status
const mongoose = require('./connection')

const liftReportSchema = new mongoose.Schema({
    lastUpdated: String,
    chair23: String
})

const liftReport = mongoose.model("liftReport", liftReportSchema)

module.exports = liftReport