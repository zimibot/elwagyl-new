const { BrowserView, screen } = require("electron");
const path = require("path")
const dev = require("electron-is-dev")


function OtherView() {
    let innerScreen = screen.getPrimaryDisplay()
    let size = innerScreen.size

    const other = new BrowserView({
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, '../other-config.js'),
            backgroundColor: "#00000000",
            transparent: true,
            zoomFactor: size.width < 1500 ? 0.64 : size.width < 2000 ? 0.89 : size.width < 3000 ? 1.4 : 1.7,
            nodeIntegration: true
        },
    });



    if (dev) {
        // other.webContents.openDevTools()
    }

    return other;
}

module.exports = OtherView;
