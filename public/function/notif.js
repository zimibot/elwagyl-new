const { ipcMain, app, shell } = require('electron')
const CreateWindow = require('./load.window.url')
const sound = require("sound-play");
const path = require("path")





module.exports = function ({ title = "NOTIFICATION", content = "NOTIFICATION CONTENT", colorContent = "", iconContent = "", favicon, load, }) {
    let notif = CreateWindow({
        urlCurrent: "http://localhost:3000/html/notif/index.html",
        prodUrl: "../html/notif/index.html",
        frame: false,
        config: {
            width: 600,
            height: 220,
            minWidth: 600,
            minHeight: 220,
            maxWidth: 600,
            maxHeight: 220,
            transparent: true,
            backgroundColor: false,
        },
        webConfig: {
            zoomFactor: 1.0
        }
    })

    notif.setIcon(path.join(__dirname, favicon));

    notif.on("close", () => {
        app.quit()
    })

    notif.webContents.once("dom-ready", () => {
        load.close()
        load = null
        if (!load) {
            setTimeout(() => {
                notif.show()
            }, 300);
            notif.focus()
            sound.play(path.join(__dirname, "../../../../sound/error.wav"));
            ipcMain.handle('minimize', async () => {
                return new Promise(function () {
                    // do stuff
                    if (true) {
                        notif.minimize()
                    }
                });
            });

            ipcMain.handle('network', async () => {
                return new Promise(function () {
                    // do stuff
                    if (true) {
                        shell.openExternal('ms-settings:network');
                    }
                });
            });

            ipcMain.handle('tryAgain', async () => {
                return new Promise(function () {
                    // do stuff
                    if (true) {
                        app.relaunch();
                        app.quit();
                    }
                });
            });

            ipcMain.handle('close', async () => {
                return new Promise(function () {
                    // do stuff
                    if (true) {
                        app.quit()
                    }
                });
            });



            ipcMain.handle('notifText', () => {
                return {
                    title: title,
                    content: content,
                    colorContent: colorContent,
                    iconContent: iconContent
                }
            });
        }
    })

    return notif
}
