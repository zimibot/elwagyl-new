const {
  contextBridge,
  ipcRenderer
} = require("electron");


window.addEventListener('DOMContentLoaded', () => {


  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


contextBridge.exposeInMainWorld("api", {
  invoke: (channel, data) => {
    let validChannels = ["close", "update", "minimize", "dataOS", "exit-full-screen", "network", "createPage", "tryAgain", "notifText", "routesItem", "license-open", "license-close", "ping-window", "message-close", "message-open", "profile-open", "profile-close", "scanpdf", "reporteha"]; // list of ipcMain.handle channels you want access in frontend to
    if (validChannels.includes(channel)) {

      return ipcRenderer.invoke(channel, data);
    }
  },
}
);
