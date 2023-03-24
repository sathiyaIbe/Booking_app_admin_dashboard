import express from'express'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import router from './Routes/api.js';
import bodyParser from 'body-parser';
const { json, urlencoded } = bodyParser;
const app = express()
app.use(cors()) //we can integerate using url
app.use(json()) //needed for accessing the req as a json only allow to use inside it
app.use(urlencoded({ extended: false }));

app.use('/api', router)

app.get(('/'),(req,res)=>{
    try{
    res.send('Login Created')
    }catch(err){
        console.log("err")
    }
})

app.listen(5001, () => {
    console.log(`Server is Listening on 5001`)
})


