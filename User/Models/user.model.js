import { Schema as _Schema } from "mongoose";
import adminDbs from "../../Login/db/adminDb.js";
const Schema = _Schema
const userDetails = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true
        },
        status: {
            type: String
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
        },
        userId: {
            type: String,
        }
    },
    { timestamps: true }
)
var userDb = adminDbs.model('userDetails', userDetails)
export default userDb
