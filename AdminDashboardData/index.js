import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import router from "./Routes/api.js";
const {json, urlencoded}=bodyParser
dotenv.config()
const app=express()
app.use(json())
app.use(cors())
app.use(urlencoded({extended:false}))
const port ='5004'
app.use('/admin/api', router)

app.listen(port,()=>{
    console.log("running")
})