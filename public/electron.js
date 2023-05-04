const { app, BrowserWindow, globalShortcut } = require('electron');
const CreateWindow = require("./function/load.window.url")
const notif = require("./function/notif")
const Connection = require("./function/check.connection")
const DownloadFIles = require("./download")


const Loading = () => {
  let load = CreateWindow({
    urlCurrent: "http://localhost:3000/html/loading/index.html",
    prodUrl: "../html/loading/index.html",
    config: {
      width: 250,
      height: 200,
      minWidth: 250,
      minHeight: 200,
      maxWidth: 250,
      maxHeight: 200,
      show: true,
      transparent: true,
      backgroundColor: false,
    },
    webConfig: {
      zoomFactor: 1.0
    }
  })
  load.focus()
  return load
}


app.whenReady().then(async () => {
  const download = await DownloadFIles()
  if (download === "update nothing" || download === "next") {
    let load = Loading()
    Connection(function (isConnected) {
      console.log(isConnected)
      if (isConnected) {
        try {

          CreateWindow({ urlCurrent: false, prodUrl: "../index.html", maximize: true, load })

        } catch (error) {
          console.log(error)
          app.quit()
        }
      } else {

        notif({
          load: load,
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

    })
  }

}
);
app.commandLine.appendSwitch('high-dpi-support', 1)
app.commandLine.appendSwitch('force-device-scale-factor', 1)
app.on('browser-window-focus', function () {
  // globalShortcut.register("CommandOrControl+0", () => {
  //   console.log("CommandOrControl+0 is pressed: Shortcut Disabled");
  // });
  globalShortcut.register("CommandOrControl+R", () => {
    console.log("CommandOrControl+R is pressed: Shortcut Disabled");
  });
  globalShortcut.register("F5", () => {
    console.log("F5 is pressed: Shortcut Disabled");
  });
});
app.on('browser-window-blur', function () {
  globalShortcut.unregister('CommandOrControl+R');
  // globalShortcut.unregister('CommandOrControl+0');
  globalShortcut.unregister('F5');
});
app.focus()

app.commandLine.appendSwitch('ignore-certificate-errors')

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  // On certificate error we disable default behaviour (stop loading the page)
  // and we then say "it is all fine - true" to the callback
  event.preventDefault();
  callback(true);
});

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