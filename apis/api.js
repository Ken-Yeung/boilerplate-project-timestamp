var express = require('express');
var app = express.Router();

app.get("/hello-world", function(req, res){
    res.send("Hello World")
})

app.get("/:date", function(req, res){
    const date = req.params.date
    var result;
    const respTemp = {
        unix: "",
        utc: ""
    }

    try {
        if(date.includes("-")){
            result = new Date(date)
        } else {
            result = new Date(parseInt(date))
        }

        // Check is invalid date
        if(result.toString() === "Invalid Date"){
            res.send({error: "Invalid Date"})
        } else {
            // console.log("result:", result.toString());
            // console.log("result:", typeof result.toString());
            // console.log("result.toUTCString():", result.toUTCString());
            // console.log("result.getDay():", result.getDay());
            // console.log("result.getDate():", result.getDate());
            // console.log("result.getMonth():", result.getMonth());
            // console.log("result.getFullYear():", result.getFullYear());
            // console.log("result.getHours():", result.getHours());
            // console.log("result.getMinutes():", result.getMinutes());
            // console.log("result.getSeconds():", result.getSeconds());
            // console.log(result.getTime());

            respTemp.utc = result.toUTCString()
            respTemp.unix = result.getTime()
            // Result
            res.send(respTemp)
        }
    } catch (err){
        console.error(err)
        res.status(422).send("Bad Request with worng params")
    }
})

module.exports = app;