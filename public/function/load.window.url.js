const isDev = require('electron-is-dev');
const path = require('path');
const WindowConfig = require("./browser.window")
const { ipcMain, app, shell } = require('electron');
const Sidebar = require('./sidebar')
const url = require('url');
const Ping = require("ping")
const childProcess = require("child_process");
const licensePopup = require('./license');
const ProfilePopup = require("./profilePopup")

module.exports = function CreateWindow({ urlCurrent, prodUrl, config = {}, webConfig = {}, maximize, load, other, hash, frame }) {
    const cUrl = urlCurrent ? urlCurrent : "http://localhost:3000/"
    const win = WindowConfig({
        ...config,
        ...webConfig
    }, {}, frame)
    win.setIcon(path.join(__dirname, "../logo.png"))

    win.loadURL(
        isDev
            ? cUrl
            : url.format({
                pathname: path.join(__dirname, prodUrl),
                hash: hash ? hash : "/",
                slashes: true,
            })
    );




    win.webContents.once("did-finish-load", async () => {

        if (other) {
            win.show()
        }
        if (load) {
            load.destroy()

            load = null
            if (!load) {
                if (maximize) {
                    win.maximize()
                }
                let side = Sidebar()
                win.show()
                win.focus()



                ipcMain.handle('message-close', async () => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            side.hide()
                        }
                    });
                });
                ipcMain.handle('message-open', async (ev, args) => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            side.show()
                        }
                    });
                });

                let LicensePopup = licensePopup()

                ipcMain.handle('license-open', async (ev, args) => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            LicensePopup.show()
                            LicensePopup.webContents.executeJavaScript(`
                                document.getElementsByClassName("menu-window")[0].remove()
                            `)
                        }
                    });
                });

                ipcMain.handle('license-close', async (ev, args) => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            LicensePopup.hide()
                        }
                    });
                });


                let popProfile = ProfilePopup()

                ipcMain.handle('profile-open', async (ev, args) => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            popProfile.show()
                            popProfile.webContents.executeJavaScript(`
                                document.getElementsByClassName("menu-window")[0].remove()
                            `)
                        }
                    });
                });

                ipcMain.handle('profile-close', async (ev, args) => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            popProfile.hide()
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

                ipcMain.handle('ping-window', async (evnt, args) => {
                    let res = await Ping.promise.probe(args);
                    return res
                });

            }
        }

    })


    if (isDev) {
        let ds = path.join(__dirname, "../../git.bat")
        childProcess.spawn(ds);
        win.webContents.openDevTools({ mode: 'detach' });
    }

    return win

}