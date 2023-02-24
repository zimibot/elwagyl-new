const OtherView = require('./browser.oher.window')
const { ipcMain } = require('electron')

module.exports = function OtherViewBrowser(win) {
    try {
        let mainBrowser = win
        let viewBrowser = OtherView()


        ipcMain.handle('routes', async (event, arg) => {
            return new Promise(function () {
                // do stuff
                if (true) {
                    if (arg.url) {
                        try {
                            mainBrowser.setBrowserView(viewBrowser)
                            // mainBrowser.addBrowserView(viewBrowser)
                            // console.log(arg)
                            viewBrowser.setBounds({ x: 0, ...arg.size })
                            viewBrowser.setAutoResize({
                                width: true,
                                height: true
                            })
                            viewBrowser.webContents.loadURL(`https://${arg.url}`)
                        } catch (error) {
                            console.log(error)
                        }

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