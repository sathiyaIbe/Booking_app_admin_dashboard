import mongoose from "mongoose";
var adminDbs = mongoose.createConnection('mongodb://0.0.0.0:27017/AdminLogin',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }, function (err, db) {
        if (err) return console.log(err)
        console.log('db Connected Successfully')
    }
);
export default adminDbs;
