
const Ping = require("ping")
const isdev = require("electron-is-dev")
module.exports = async function Connection(cb) {
    //10.22.24.106 // 
    let res = await Ping.promise.probe( isdev ? "165.22.50.184" : "10.22.24.106", {
        timeout: 5,
    });


    cb(res.alive)

}