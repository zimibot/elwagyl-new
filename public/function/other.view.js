const OtherView = require('./browser.oher.window');
const { ipcMain, dialog } = require('electron');

module.exports = function OtherViewBrowser(win) {
  try {
    const mainBrowser = win;
    const viewBrowser = OtherView();

    ipcMain.handle('routesItem', async (event, arg) => {
      return new Promise(async function () {
        // melakukan operasi
        if (true) {
          mainBrowser.setBrowserView(viewBrowser);
          // mainBrowser.addBrowserView(viewBrowser);
          // console.log(arg);

          viewBrowser.setAutoResize({
            width: true,
            height: true
          });

          if (arg.url) {
            // if (mainBrowser.getBrowserViews()) {
            //   viewBrowser.webContents.removeAllListeners()
            // }
            viewBrowser.webContents.loadURL(arg.url);
            viewBrowser.webContents.on('did-fail-load', (data, ers, sa) => {
              console.log({ data, ers, sa });
            });

            if (viewBrowser.webContents.isLoading()) {
              viewBrowser.setBounds({
                x: 0,
                y: 0,
                width: 0,
                height: 0
              });
            }

            viewBrowser.webContents.once('dom-ready', () => {
              viewBrowser.setBounds({ x: 0, ...arg.size });
            });


          } else {
            viewBrowser.setBounds({
              x: 0,
              y: 0,
              width: 0,
              height: 0
            });
          }
        }
      });
    });

  } catch (error) {
    console.log(error);
    console.log('errors');
  }
};
