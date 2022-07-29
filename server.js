const log4js = require("log4js");
const express = require("express");
const server = express();

log4js.configure({
    appenders: {
        WebServer: {
            type: "stdout"
        }
    },
    categories: {
        default: {
            appenders: ["WebServer"], level: "trace"
        }
    },
})
const logger = log4js.getLogger("WebServer");

server.all("/", (req, res) => {
    res.send("your account is alive");
    logger.info("New access from " + req.ip);
});

function keepAlive() {
    server.listen(3000, () => {
        logger.info("server is running on port 3000");
    });
}

module.exports = keepAlive;