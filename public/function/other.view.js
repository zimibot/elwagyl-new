const OtherView = require('./browser.oher.window');
const { ipcMain } = require('electron');

module.exports = function OtherViewBrowser() {
  const viewBrowser = OtherView();

  const size = () => {
    viewBrowser.setBounds({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
  }
  

  return viewBrowser
};


