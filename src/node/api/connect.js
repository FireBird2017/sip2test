var connectionManager = require("./connectionManager");

function register(app) {
    app.post("/api/sip2", function(req, res) {
        var connection = connectionManager.connect(req.body);
        res.status(201).send(connection);
    });

    app.delete("/api/sip2/:id", function(req, res) {
        try {
            var disconnection = connectionManager.disconnect(req.params.id);
            res.status(204);
        } catch (e) {
            res.status(410).send(e.message);
        }
    });
}

module.exports = register;
