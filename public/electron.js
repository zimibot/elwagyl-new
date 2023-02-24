const { app, BrowserWindow, globalShortcut } = require('electron');
const CreateWindow = require("./function/load.window.url")
const notif = require("./function/notif")
const Ping = require("ping")


async function checkInternet(cb) {

  let res = await Ping.promise.probe("google.com", {
    timeout: 10,
  });

  console.log(res)
  cb(res.alive)

}


// app.disableHardwareAcceleration()

const Loading = () => {
  let notif = CreateWindow({
    urlCurrent: "http://localhost:8000/html/loading/index.html",
    prodUrl: "../html/loading/index.html",
    config: {
      width: 250,
      height: 250,
      minWidth: 250,
      minHeight: 250,
      maxWidth: 250,
      maxHeight: 250,
      transparent: true,
      backgroundColor: false,
    },
    webConfig: {
      zoomFactor: 1.0
    }
  })

  return notif
}


app.whenReady().then(() => {
  let load = Loading()
  checkInternet(function (isConnected) {
    if (isConnected) {
      try {
        CreateWindow({ urlCurrent: false, prodUrl: "../index.html", maximize: true })
        load.close()
      } catch (error) {
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
      load.close()
    }

  })
}
);
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