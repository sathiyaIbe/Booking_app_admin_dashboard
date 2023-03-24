const mongoose = require('mongoose')
const db = require('../db/adminDb')
const Schema = mongoose.Schema
const CabServiceSchema = new Schema(
    {
        DriverName: {
            type: String,
        },
        CabId: {
            type: String,
        },
        From: {
            type: String,
        },
        To: {
            type: String,
        },
        Status: {
            type: String,
        }
    }
)
module.exports = mongoose.model("CabService", CabServiceSchema)
