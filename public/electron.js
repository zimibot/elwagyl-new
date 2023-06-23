const { app, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');
const CreateWindow = require("./function/load.window.url")
const notif = require("./function/notif")
const Connection = require("./function/check.connection")
const DownloadFIles = require("./download")
const OtherView = require('./function/browser.oher.window');
const isDev = require("electron-is-dev")

const errorMsg = ({ window, noBtn, msgBtn, msg, type }) => {
  let response = dialog.showMessageBoxSync({
    type: type ? type : "info",
    buttons: [msgBtn ? msgBtn : 'Run Elwagyl'],
    title: `INFORMATION`,
    message: msg ? msg : "CHECK UPDATE FAILED"
  });
  if (!noBtn) {
    if (response == 0) window();
  }

}



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

let window = []
let id = 0

const WindowMain = () => {
  let load = Loading()
  Connection(function (isConnected) {
    if (isConnected) {
      try {
        window.push({
          id: 0,
          name: "elwagyl",
          window: CreateWindow({ urlCurrent: false, prodUrl: "../index.html", maximize: true, load, frame: false }),
          view: OtherView()
        })

        window[0].window.on("close", () => {
          app.quit()
        })

        window[0].window.webContents.on("did-finish-load", () => {
          // size()
          window[0].window.webContents.executeJavaScript(`
          ${!isDev && `localStorage.removeItem("token")`}
          localStorage.setItem("step", true)
          document.body.setAttribute("name", "elwagyl-0")
          document.body.setAttribute("current", true)
          document.getElementById('fullscreen').addEventListener('click', () => {
            window.api.invoke('exit-full-screen', 0)
          })
          document.getElementById('close').addEventListener('click', () => {
            window.api.invoke('close', 0)
          })
          document.getElementById('mini').addEventListener('click', () => {
            window.api.invoke('minimize', 0)
          })
        `)
        })

        ipcMain.handle('dataOS', async (args, env) => {
          const si = require('systeminformation');
          let system = await si.uuid()

          return new Promise(function (resolve) {
            if (true) {
              return resolve(system)
            }
          })
        })
        ipcMain.handle('createPage', async (args, env) => {
          return new Promise(function (resolve, reject) {
            // do stuff
            if (true) {
              id++
              window.push({
                id,
                name: env.path,
                window: CreateWindow({ hash: `#${env.path}`, urlCurrent: `http://localhost:3000/#${env.path}`, prodUrl: "../index.html", maximize: true, load, other: true, frame: false }),
                view: OtherView(),
              })

              window.map((d, k) => {
                if (k > 0) {
                  const size = () => {
                    d.view.setBounds({
                      x: 0,
                      y: 0,
                      width: 0,
                      height: 0
                    });
                  }

                  let win = d.window
                  if (env.url) {
                    if (d.view) {

                      setTimeout(() => {
                        win.setBrowserView(d.view);
                        d.view.webContents.loadURL(env.url ? env.url : 'about:blank');
                        d.view.setAutoResize({
                          width: true,
                          height: true
                        });

                        if (d.view.webContents.isLoading()) {
                          size()
                        }


                        d.view.webContents.once("did-fail-load", () => {
                          size()
                          return reject("connection_error")
                        })

                        d.view.webContents.once('did-finish-load', () => {
                          d.view.setBounds({ x: 0, ...env.size });
                          return resolve("load success")
                        });
                      }, 1000);
                    }

                  }

                  let path = d.name.split("/").pop()

                  win.webContents.on("did-finish-load", () => {
                    // size()
                    win.webContents.executeJavaScript(`
                    document.body.setAttribute("key", "${d.name}")
                    document.body.setAttribute("name", "${path}-${d.id}")
                      document.getElementById('fullscreen').addEventListener('click', () => {
                        window.api.invoke('exit-full-screen', ${d.id})
                      })
                      document.getElementById('close').addEventListener('click', () => {
                        window.api.invoke('close', ${d.id})
                      })
                      document.getElementById('mini').addEventListener('click', () => {
                        window.api.invoke('minimize', ${d.id})
                      })
                    `)
                  })

                }
              })
            }
          });
        });

        let itemsMap = ({ type, Key }) => {
          let win = window.find(d => d.id === parseInt(Key))?.window;
          if (!win) {
            return;
          }

          switch (type) {
            case "exit-full-screen":
              if (win.isMaximized()) {
                win.unmaximize();
              } else {
                win.maximize();
              }
              break;
            case "minimize":
              win.minimize();
              break;
            case "close":
              if (parseInt(Key) === 0) {
                setTimeout(() => {
                  app.quit()
                }, 500);
              } else {
                window = window.filter(w => w.id !== Key);
                win.destroy();
              }
              break;
            default:
              break;
          }
        };



        ipcMain.handle('exit-full-screen', async (event, arg) => {
          return new Promise(function (resolve, reject) {
            // do stuff
            if (true) {
              itemsMap({ type: "exit-full-screen", Key: arg })
            }
          });
        });



        ipcMain.handle('minimize', async (event, arg) => {
          return new Promise(function (resolve, reject) {
            // do stuff
            if (true) {
              itemsMap({ type: "minimize", Key: arg })
            }
          });
        });

        ipcMain.handle('close', async (event, arg) => {
          return new Promise(function (resolve, reject) {
            // do stuff
            if (true) {
              itemsMap({ type: "close", Key: arg })
            }
          });
        });

        ipcMain.handle('routesItem', async (event, arg) => {
          return new Promise(async function (resolve, reject) {
            let status
            window.map(async (d) => {
              if (true) {
                d.window.addBrowserView(d.view);

                d.view.setAutoResize({ width: true, height: true });
                d.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
                let pages = d.name.split("/").pop();
                let content = `${pages}-${d.id}`;

                if (content === arg.attribute || arg.attribute === null) {
                  d.view.webContents.loadURL(arg.url ? arg.url : 'about:blank');
                }

                const failLoadListener = async () => {
                  status = "offline"
                  resolve({
                    status,
                  });
                };

                const finishLoadListener = async () => {

                  d.view.setBounds({ x: 0, ...arg.size });
                  status = "online"
                  resolve({
                    status
                  });
                };

                if (!arg.url) {
                  if (content === arg.attribute) {
                    d.view.webContents.once("did-finish-load", () => {
                      d.view.setBounds({ x: 0, ...arg.size });
                    });
                  }
                  return reject(JSON.stringify({
                    status: "error_url"
                  }));
                } else {
                  if (content === arg.attribute) {
                    if (d.view.webContents.isLoading()) {
                      d.view.setBounds({ x: 0, y: 0, width: 0, height: 0 });
                    }
                    d.view.webContents.once("did-fail-load", failLoadListener);
                    d.view.webContents.once("did-finish-load", finishLoadListener);
                  }
                }
              }
            });

          });
        })

      } catch (error) {
        return reject({
          error: error,
          status: 400
        })
      }
    } else {

      notif({
        load: load,
        title: "ERROR NETWORK",
        content: "CONNECTION TO SERVER FAILED. PLEASE VERIFY YOUR NETWORK CONNECTIVITY AND ENSURE THAT YOUR VPN CONNECTION IS ESTABLISHED.",
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


app.whenReady().then(async () => {
  ipcMain.handle('update', async (args, env) => {
    return new Promise(async function (resolve, reject) {
      if (true) {
        let data = DownloadFIles("Cancel")
        data.then(d => {
          if (d === "update nothing") {
            errorMsg({ noBtn: true, msgBtn: "CANCEL", msg: "This application is already up to date." })
          }
          resolve(d)
        }).catch((err) => {
          errorMsg({ noBtn: true, msgBtn: "CANCEL", type: "error", msg: " Sorry, there is an issue with the latest update currently." })
          reject(err)
        })
      }
    })
  })

  DownloadFIles().then(d => {
    if (d === "next" || d === "update nothing") {
      WindowMain()
    }
  }).catch(() => {
    errorMsg({ window: WindowMain })
  })

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
    WindowMain()
  }
});