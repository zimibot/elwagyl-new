const isDev = require('electron-is-dev');
const path = require('path');
const WindowConfig = require("./browser.window")
const { ipcMain, app } = require('electron');

 
module.exports = function CreateWindow() {
    const win = WindowConfig()
    win.loadURL(
        isDev
            ? 'http://localhost:3000/'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );


    win.webContents.on("did-finish-load", () => {

        win.maximize()


        // and load the index.html of the app.
        // win.loadFile("index.html");

        // Open the DevTools.

        win.show()


        ipcMain.handle('exit-full-screen', async (event, arg) => {
            return new Promise(function (resolve, reject) {
                // do stuff
                if (true) {
                    if(win.isMaximized()) {
                        win.unmaximize();
                    } else {
                        win.maximize();
                    }
                } 
            });
        });

        
 
        ipcMain.handle('minimize', async (event, arg) => {
            return new Promise(function (resolve, reject) {
                // do stuff
                if (true) {
                    win.minimize()
                } 
            });
        });

        ipcMain.handle('close', async (event, arg) => {
            return new Promise(function (resolve, reject) {
                // do stuff
                if (true) {
                    app.quit()
                } 
            });
        });


        if (isDev) {
            win.webContents.openDevTools({ mode: 'detach' });
           
        }
    })


}