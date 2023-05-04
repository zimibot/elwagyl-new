const WindowConfig = require("./browser.window")
const electron = require('electron')

const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');

module.exports = function Sidebar() {
    // Mendapatkan ukuran layar
    const { height } = electron.screen.getPrimaryDisplay().workAreaSize

    // Mengatur nilai height yang diinginkan
    const windowHeight = Math.floor(height * 1)

    let w = 550
    let sideWin = WindowConfig({
        minWidth: w,
        maxWidth: w,
        width: w,
        minHeight: windowHeight,
        maxHeight: windowHeight,
        height: windowHeight,
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