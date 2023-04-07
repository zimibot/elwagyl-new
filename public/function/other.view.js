const OtherView = require('./browser.oher.window')
const { ipcMain } = require('electron')

module.exports = function OtherViewBrowser(win) {
    try {
        let mainBrowser = win
        let viewBrowser = OtherView()


        ipcMain.handle('routesItem', async (event, arg) => {
            return new Promise(function () {
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
                        viewBrowser.webContents.loadURL(arg.url)


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