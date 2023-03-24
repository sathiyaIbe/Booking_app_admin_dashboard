import mongooses from "mongoose";
var adminDbss = mongooses.createConnection('mongodb://0.0.0.0:27017/AdminLogin',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }, function (err, db) {
        if (err) return console.log("err")
        console.log("database connected")
    }
)
export default adminDbss