
const Ping = require("ping")

module.exports = async function Connection(cb) {
    //10.22.22.6
    let res = await Ping.promise.probe("10.22.22.6", {
        timeout: 10,
    });

    cb(res.alive)

}