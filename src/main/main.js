var express = require("express"),
    logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.static("src/main/public"));

app.get("/", function(req, res) {
    res.send("Hello, World!");
});

var server = app.listen(3000, function() {
    var host = server.address().address,
        port = server.address().port;

    console.log("Listening on http://%s:%s", host, port);
});
