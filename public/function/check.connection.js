
const Ping = require("ping")

module.exports = async function Connection(cb) {

    let res = await Ping.promise.probe("10.22.22.6", {
        timeout: 10,
    });

    cb(res.alive)

}