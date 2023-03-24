import { Schema as _Schema } from "mongoose";
import adminDbss from '../Db/adminDashboardDb.js'
const Schema = _Schema
const dashbaordData = new Schema(
    {
        month: {
            type: String
        },
        revenue: {
            type: Number
        },
        booking: {
            type: Number
        },
        user: {
            type: Number
        },
        userActive: {
            type: Number
        },
        userInActive: {
            type: Number
        },
    },
    { timestamps: true }
)
var dashboardDb = adminDbss.model('adminService', dashbaordData)
export default dashboardDb