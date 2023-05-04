const { default: axios } = require('axios')
const OtherView = require('./browser.oher.window')
const { ipcMain } = require('electron')

module.exports = function OtherViewBrowser(win) {
    try {
        let mainBrowser = win
        let viewBrowser = OtherView()
        let result

        ipcMain.handle('routesItem', async (event, arg) => {
            return new Promise(async function () {
                // do stuff
                if (true) {
                    mainBrowser.setBrowserView(viewBrowser)
                    // mainBrowser.addBrowserView(viewBrowser)
                    // console.log(arg)

                    viewBrowser.setAutoResize({
                        width: true,
                        height: true
                    })
                    if (arg.url) {
                        viewBrowser.webContents.loadURL(arg.url)
                        viewBrowser.webContents.once("did-fail-load", () => {
                            console.log("error-items")
                        })
                        if (viewBrowser.webContents.isLoading() ) {
                            viewBrowser.setBounds({
                                x: 0, y: 0, width: 0,
                                height: 0
                            })
                        }
    
                        viewBrowser.webContents.once("dom-ready", () => {
                            viewBrowser.setBounds({ x: 0, ...arg.size })
                        })
                    } else {
                        viewBrowser.setBounds({
                            x: 0, y: 0, width: 0,
                            height: 0
                        })
                    }
                }
            });
        });

    } catch (error) {
        console.log(error)
        console.log("errors")
    }


}