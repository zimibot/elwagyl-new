const { ipcMain } = require('electron')
const CreateWindow = require('./load.window.url')
const sound = require("sound-play");
const path = require("path")

module.exports = function ({ title = "NOTIFICATION", content = "NOTIFICATION CONTENT", colorContent = "", iconContent = "", favicon }) {
    let notif = CreateWindow({
        urlCurrent: "http://localhost:8000/html/notif/index.html", 
        prodUrl: "../html/notif/index.html",
        config: {
            width: 500,
            height: 220,
            minWidth: 500,
            minHeight: 220,
            maxWidth: 500,
            maxHeight: 220,
            transparent: true,
            backgroundColor: false,
        }
    })

    notif.setIcon(path.join(__dirname, favicon));
    notif.webContents.once("did-finish-load", () => {
        sound.play(path.join(__dirname, "error.wav"));

        ipcMain.handle('notifText', () => {
            return {
                title: title,
                content: content,
                colorContent: colorContent,
                iconContent: iconContent
            }
        });

    })
}