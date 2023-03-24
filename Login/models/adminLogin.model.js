import { Schema as _Schema } from 'mongoose';
import adminDbs from '../db/adminDb.js';
const Schema = _Schema;
const CSchema = _Schema;
const UserSchema = _Schema
const AdminShema = new Schema(
    {
        email: {
            type: String,
            Required: true,
            lowercase: true,
        },
        password: {
            type: String,
            Required: true
        },
        token: {
            type: String
        },
    },
    { timestamps: true }
)
const CabServiceSchema = new CSchema(
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
const UserDetailsSchena = new UserSchema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
        },
        status: {
            type: String
        }
    },
    { timestamps: true }
)
var adminDb = adminDbs.model('Admin', AdminShema)
var cabDb = adminDbs.model('CabService', CabServiceSchema)
var userDb = adminDbs.model('userDetails', UserDetailsSchena)
var adminmodel = { adminDb, cabDb, userDb }
export default adminmodel;
