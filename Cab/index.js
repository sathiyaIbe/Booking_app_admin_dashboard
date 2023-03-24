import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from "body-parser";
import router from './Routes/api.js'
const {json, urlencoded}= bodyParser
dotenv.config()
const app=express()
app.use(cors())
app.use(json()) //to get the res as json confirm
app.use(urlencoded({extended: false}))
app.use('/cab/api', router)
const port =5003



app.listen(port, ()=>{
    console.log(`server is running in the ${port} `)
})