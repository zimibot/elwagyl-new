
const { initialize, enable } = require('@electron/remote/main');
const { BrowserWindow, screen } = require('electron');
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

initialize();


module.exports = function WindowConfig(mainConfig = {},  webPreferences = {}, frame = false,) {

  let innerScreen = screen.getPrimaryDisplay()
  let size = innerScreen.size

  const win = new BrowserWindow({
    minWidth: 1500,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    frame: frame,
    transparent: false,
    backgroundColor: "#101C26",
    ...mainConfig,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: true,
      zoomFactor: size.width < 1500 ? 0.64 : size.width < 2000 ? 0.89 : size.width < 3000 ? 1.4 : 1.7,
      preload: path.join(__dirname, "../preload.js"), // path to your preload.js file
      ...webPreferences,

    },
  });


  enable(win)

  return win
}

