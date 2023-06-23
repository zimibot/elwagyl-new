const Downloader = require("nodejs-file-downloader");
const path = require("path")
const ProgressBar = require('electron-progressbar');
const { dialog } = require("electron");
const { version } = require("../package.json")
const axios = require("axios")
const child = require('child_process').spawn;
const extract = require('extract-zip');
const fs = require('fs');
const { app } = require('electron');

let url = "http://157.245.49.164:8080"

module.exports = async function DownloadFIles(msgBtn) {
    return new Promise(async function (resolve, reject) {
        // do stuff
        if (true) {
            const tempDir = process.env.TEMP;
            const zipFilePath = path.join(tempDir, 'elwagyl-update', 'updater.zip');
            const updateAvailable = path.join(tempDir, 'updater', "files", 'update.zip');
            const downloaders = (versi, progress) => [
                {
                    url: `${url}/update/elwagylUpdate/updater.zip`,
                    directory: path.join(tempDir, 'elwagyl-update'),
                    fileName: 'updater.zip',
                    cloneFiles: false,
                },
                {
                    url: `${url}/update/elwagylUpdate/elwagyl-v-${versi}.zip`,
                    directory: path.join(tempDir, "updater", "files"),
                    fileName: "update.zip",
                    cloneFiles: false,
                    onProgress: function (percentage, chunk, remainingSize) {
                        progress.value = parseInt(percentage);
                    },onerror: () => {
                        console.log("error")
                    }
                },

                // add more downloader objects here as needed
            ];

            try {
                let get = await axios({
                    method: 'get',
                    url: `${url}/update/elwagylUpdate/log_install.json`,
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    },
                });
                

                if (get.data.newVersion !== version) {
                    let msg = await errorMsg({ msg: "The latest update is available", btnMsg: msgBtn })

                    if (msg === 0) {

                        fs.access(updateAvailable, fs.constants.F_OK, async (err) => {
                            if (err) {
                                var progressBar = new ProgressBar({
                                    indeterminate: false,
                                    text: "Download New Update ELWAGYL",
                                    detail: 'Wait...'
                                });

                             

                                progressBar
                                    .on('completed', async function () {
                                        extract(zipFilePath, { dir: tempDir });
                                        progressBar.detail = ' Download completed. Exiting...';
                                        setTimeout(() => {
                                            setTimeout(() => {
                                                app.quit()
                                            }, 200);
                                            const subprocess = child(path.join(tempDir, "updater", "update.bat"), {
                                                detached: true, // jalankan di background
                                                stdio: 'ignore' // abaikan input/output dari child process
                                            });
                                            subprocess.unref();
                                        }, 300);

                                    })
                                    .on('aborted', function (value) {
                                        app.quit()
                                        console.info(`aborted... ${value}`);
                                    })
                                    
                                    .on('progress', function (value) {
                                        progressBar.detail = `Progress Download ${value}% out of ${progressBar.getOptions().maxValue}%...`;
                                    });

                                for (const d of downloaders(get.data.newVersion, progressBar)) {
                                    const downloader = new Downloader(d);
                                    await downloader.download();
                                }
                            } else {
                                // setTimeout(() => {
                                //     app.quit()
                                // }, 500);

                                const subprocess = child(path.join(tempDir, "updater", "update.bat"), {
                                    detached: true, // jalankan di background
                                    stdio: 'ignore' // abaikan input/output dari child process
                                });
                                subprocess.unref();

                            }
                        });

                        resolve("update")
                    } else {
                        if (msg === 1) {
                            resolve("next")
                        }
                    }
                } else {
                    resolve("update nothing")
                }

            } catch (error) {
                reject(error)
            }
        }
    });


}


const errorMsg = ({ msg, btnMsg }) => {
    let response = dialog.showMessageBoxSync({
        type: "info",
        buttons: ['Update', btnMsg ? btnMsg : 'Run EL WAGYL'],
        title: `INFORMATION`,
        message: msg
    });

    return response
    // if (element) {
    //     if (response == 0) element.close();
    // } else {
    //     if (response == 0) app.quit();
    // }

}