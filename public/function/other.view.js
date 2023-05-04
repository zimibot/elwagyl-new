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
                    if (arg.url) {

                        mainBrowser.setBrowserView(viewBrowser)
                        // mainBrowser.addBrowserView(viewBrowser)
                        // console.log(arg)
                        if (arg) {
                            viewBrowser.setBounds({ x: 0, ...arg.size })
                        }
                        viewBrowser.setAutoResize({
                            width: true,
                            height: true
                        })
                        let load = await viewBrowser.webContents.loadURL(arg.url)
                        console.log(load)
                        return result
                    } else {
                        mainBrowser.removeBrowserView(viewBrowser)
                    }

                }
            });
        });

    } catch (error) {
        console.log(error)
    }


}