const isDev = require('electron-is-dev');
const path = require('path');
const WindowConfig = require("./browser.window")
const { ipcMain, app, shell } = require('electron');
const OtherViewBrowser = require('./other.view')
const Sidebar = require('./sidebar')
const url = require('url');
const Ping = require("ping")

module.exports = function CreateWindow({ urlCurrent, prodUrl, config = {}, webConfig = {}, maximize, load }) {
    const cUrl = urlCurrent ? urlCurrent : "http://localhost:3000/"
    const win = WindowConfig({
        ...config,
        ...webConfig
    })
    win.setIcon(path.join(__dirname, "../logo.png"))

    win.loadURL(
        isDev
            ? cUrl
            : url.format({
                pathname: path.join(__dirname, prodUrl),
                hash: "/",
                slashes: true,
            })
    );






    win.webContents.once("did-finish-load", async () => {
        

        if (load) {
            load.close()
            load = null
            if (!load) {
                if (maximize) {
                    win.maximize()
                }
                let side = Sidebar()
                win.show()

                OtherViewBrowser(win)

                win.focus()


                ipcMain.handle('exit-full-screen', async () => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            if (win.isMaximized()) {
                                win.unmaximize();
                            } else {
                                win.maximize();
                            }
                        }
                    });
                });



                ipcMain.handle('minimize', async () => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            win.minimize()
                        }
                    });
                });
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


                ipcMain.handle('close', async () => {
                    return new Promise(function () {
                        // do stuff
                        if (true) {
                            app.quit()
                            Sidebar().close()
                            
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
        win.webContents.openDevTools({ mode: 'detach' });
    }


    return win

}