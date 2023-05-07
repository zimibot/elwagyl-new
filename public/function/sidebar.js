const WindowConfig = require("./browser.window")
const electron = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');

module.exports = function Sidebar() {
    const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize
    const windowHeight = Math.floor(height * 1)
    let w = 550
    const windowWidth = Math.floor((width - w) * (1))
    let sideWin = WindowConfig({
        minWidth: w,
        maxWidth: w,
        width: w,
        minHeight: windowHeight,
        maxHeight: windowHeight,
        height: windowHeight,
        y: 0,
        x: windowWidth,
        webPreferences: {
            zoomFactor: 1.0
        }
    })

    let pio = url.format({
        pathname: path.join(__dirname, "../index.html"),
        hash: "#/message",
        slashes: true,
    })

    sideWin.loadURL(
        isDev
            ? 'http://localhost:3000/#/message'
            : pio
    )

    sideWin.on('blur', () => {
        sideWin.hide()
    })

    // sideWin.blur()
    // sideWin.webContents.openDevTools({ mode: 'detach' });
    return sideWin
}