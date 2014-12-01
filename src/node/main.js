var express = require("express"),
    bodyParser = require("body-parser"),
    errorHandler = require("errorhandler"),
    responseTime = require("response-time"),
    logger = require("morgan"),
    api = require("./api");

var app = express();

app.use(errorHandler());
app.use(responseTime());
app.use(logger("dev"));
app.use(express.static("src/main/public"));
app.use(bodyParser.json());

api(app);

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(400).send(err.message);
});

var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});
