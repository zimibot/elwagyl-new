const WindowConfig = require("./browser.window")
const path = require('path')
const url = require('url')
const isDev = require('electron-is-dev');

module.exports = function MenuPopup() {
    let MenuPopup = WindowConfig({
        minWidth: 200,
        maxWidth: 200,
        width: 200,
        minHeight: 250,
        maxHeight: 250,
        fullscreenable: false,
        height: 250,
        webPreferences: {
            zoomFactor: 1.0
        }
    })

    let pio = url.format({
        pathname: path.join(__dirname, "../index.html"),
        hash: "#/menu",
        slashes: true,
    })

    MenuPopup.loadURL(
        isDev
            ? 'http://localhost:3000/#/menu'
            : pio
    )
    MenuPopup.center()
    MenuPopup.on('blur', () => {
        MenuPopup.hide()
    })

    // MenuPopup.blur()
    MenuPopup.webContents.openDevTools({ mode: 'detach' });
    return MenuPopup
}