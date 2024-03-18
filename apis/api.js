var express = require('express');
var app = express.Router();

app.get("/hello-world", function (req, res) {
    res.send("Hello World")
})

// Writing Utils
function getTheTime(req, res, next) {
    const date = req.params.date
    var result;
    const respTemp = {
        unix: "",
        utc: ""
    }

    try {
        if (!!!date) {
            const _newDate = new Date()
            respTemp.unix = _newDate.getTime()
            respTemp.utc = _newDate.toUTCString()
            res.send(respTemp)
            return
        }

        if (date.includes("-") || date.includes(",") || date.includes(" ")) {
            result = new Date(date)
        } else {
            result = new Date(parseInt(date))
        }

        // Check is invalid date
        if (result.toString() === "Invalid Date") {
            res.send({ error: "Invalid Date" })
        } else {
            respTemp.utc = result.toUTCString()
            respTemp.unix = result.getTime()
            // Result
            res.send(respTemp)
        }
    } catch (err) {
        console.error(err)
        res.status(422).send("Bad Request with worng params")
    }
}


app.get("/", getTheTime)
app.get("/:date", getTheTime)

module.exports = app;