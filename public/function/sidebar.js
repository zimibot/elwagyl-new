const WindowConfig = require("./browser.window")
const electron = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');

module.exports = function Sidebar() {
    const { height, width } = electron.screen.getPrimaryDisplay().workAreaSize
    let w = 550
    let sideWin = WindowConfig({
        minWidth: w,
        maxWidth: w,
        width: w,
        minHeight: height,
        maxHeight: height,
        y: 0,
        x: (width - w)
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
  


    sideWin.blur()
    // sideWin.webContents.openDevTools({ mode: 'detach' });
    return sideWin
}