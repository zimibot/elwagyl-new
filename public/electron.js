const { app, BrowserWindow, globalShortcut } = require('electron');
const CreateWindow = require("./function/load.window.url")
const notif = require("./function/notif")
const Ping = require("ping")


async function checkInternet(cb) {

  let res = await Ping.promise.probe("10.22.22.6", {
    timeout: 10,
  });
  cb(res.alive)

}


// app.disableHardwareAcceleration()


app.whenReady().then(() => checkInternet(function (isConnected) {
  if (isConnected) {
    try {
      CreateWindow({ urlCurrent: false, prodUrl: "../index.html", maximize: true })
    } catch (error) {
      console.log(error)
      app.quit()
    }
  } else {
    notif({
      title: "ERROR NETWORK",
      content: "YOU ARE OFFLINE, PLEASE CHECK YOUR INTERNET NETWORK OR VPN NETWORK",
      colorContent: "#ED6A5E",
      favicon: `icon/alert.png`,
      iconContent: `<svg width="40" height="40" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12H10V7H12M12 16H10V14H12M0 19H22L11 0L0 19Z" fill="#ED6A5E"/>
      </svg>
      `
    })
  }
}));
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)
app.on('browser-window-focus', function () {
  globalShortcut.register("CommandOrControl+0", () => {
    console.log("CommandOrControl+0 is pressed: Shortcut Disabled");
  });
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  globalShortcut.unregister('CommandOrControl+0');
  globalShortcut.unregister('F5');
});
app.focus()
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    CreateWindow();
  }
});