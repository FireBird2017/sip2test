var express = require("express"),
    bodyParser = require("body-parser"),
    logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.static("src/main/public"));
app.use(bodyParser.json());

app.post("/api/connect", function(req, res) {
    console.log(req.body);
    res.send("Hello, World!");
});

var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});
