
const Ping = require("ping")

module.exports = async function Connection(cb) {
    //10.22.24.106 //165.22.50.184
    let res = await Ping.promise.probe("10.22.24.106", {
        timeout: 5,
    });


    cb(res.alive)

}