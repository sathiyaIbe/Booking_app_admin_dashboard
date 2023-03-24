import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import apiRouter from './Routes/api.js'

const {json, urlencoded} = bodyParser;
const app=express()
app.use(cors())
app.use(json())
app.use(urlencoded({extended:false}))
dotenv.config()
const port =5002
app.use('/user/api', apiRouter)

app.listen(port, ()=>{
    console.log(`server is listening ${port}`)
})