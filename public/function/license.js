const WindowConfig = require("./browser.window")
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');

const { app } = require("electron")

module.exports = function licensePopup() {
    let LicensePopup = WindowConfig({
        minWidth: 400,
        maxWidth: 400,
        width: 400,
        minHeight: 700,
        maxHeight: 700,
        fullscreenable: false,
        height: 700,
        webPreferences: {
            zoomFactor: 1.0
        }
    })

    let pio = url.format({
        pathname: path.join(__dirname, "../index.html"),
        hash: "#/license",
        slashes: true,
    })

    LicensePopup.loadURL(
        isDev
            ? 'http://localhost:3000/#/license'
            : pio
    )
    LicensePopup.center()
    LicensePopup.on('blur', () => {
        LicensePopup.hide()
    })

    // LicensePopup.blur()
    // if (isDev) {

    //     LicensePopup.webContents.openDevTools({ mode: 'detach' });
    // }
    return LicensePopup
}

