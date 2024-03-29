const WindowConfig = require("./browser.window")
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');
module.exports = function ProfilePopup() {
    let ProfilePopup = WindowConfig({
        minWidth: 800,
        maxWidth: 800,
        width: 800,
        minHeight: 400,
        maxHeight: 400,
        fullscreenable: false,
        height: 400,
    })

    let pio = url.format({
        pathname: path.join(__dirname, "../index.html"),
        hash: "#/profile",
        slashes: true,
    })

    ProfilePopup.loadURL(
        isDev
            ? 'http://localhost:3000/#/profile'
            : pio
    )
    ProfilePopup.center()
    ProfilePopup.on('blur', () => {
        ProfilePopup.hide()
    })

    // LicensePopup.blur()
    // if (isDev) {

    //     ProfilePopup.webContents.openDevTools({ mode: 'detach' });
    // }
    return ProfilePopup
}

