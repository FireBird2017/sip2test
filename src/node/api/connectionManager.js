var uuid = require("node-uuid");

function ConnectionManager() {
    this.connections = {};
}

ConnectionManager.prototype = {
    connect: function(to) {
        var id = uuid.v4(),
            details = {
                host: to.host,
                port: to.port,
                name: to.name,
                id: id
            };

        if (details.host === undefined) {
            throw new Error("Missing required field: host");
        } else if (details.port === undefined) {
            throw new Error("Missing required field: port");
        } else if (details.name === undefined) {
            throw new Error("Missing required field: name");
        } else {
            this.connections[id] = details;
            return details;
        }
    },
    disconnect: function(id) {
        var details = this.connections[id];
        if (details === undefined) {
            throw new Error("Required connection does not exist");
        }
        delete this.connections[id];
        return {
            host: details.host,
            port: details.port,
            name: details.name
        }

    }
}

module.exports = new ConnectionManager();
