import { Schema as _Schema } from "mongoose";
import adminDbs from '../Db/adminDb.js'
const Schema = _Schema
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
            uppercase: true,
        },
        To: {
            type: String,
            uppercase: true,
        },
        Status: {
            type: String,
        }
    },
    { timestamps: true }
)
var cabDb = adminDbs.model('CabService', CabServiceSchema)
export default cabDb