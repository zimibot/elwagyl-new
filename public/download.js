const Downloader = require("nodejs-file-downloader");
const path = require("path")
const ProgressBar = require('electron-progressbar');
const { dialog } = require("electron");
const child = require('child_process').spawn;
const {version} = require("../package.json")
const axios = require("axios")

module.exports = async function DownloadFIles() {

    try {
        let get = await axios({
            method: 'get',
            url: 'http://157.245.49.164:8080/update/elwagylUpdate/log_install.json',
        });

        if (get.data.newVersion !== version) {
            let msg = await errorMsg({ msg: "The latest update is available" })


            if (msg === 0) {
                var progressBar = new ProgressBar({
                    indeterminate: false,
                    text: "Download New Update ELWAGYL",
                    detail: 'Wait...'
                });

                progressBar
                    .on('completed', async function () {
                        progressBar.detail = ' Download completed. Exiting...';
                        const subprocess = child(path.join(__dirname, "../../../updater/update.bat"), {
                            detached: true,  //Continue running after the parent exits.
                            stdio: 'ignore'
                        });
                        subprocess.unref();
                    })
                    .on('aborted', function (value) {
                        console.info(`aborted... ${value}`);
                    })
                    .on('progress', function (value) {
                        progressBar.detail = `Progress Download ${value}% out of ${progressBar.getOptions().maxValue}%...`;
                    });

                const downloader = new Downloader({
                    url: `http://157.245.49.164:8080/update/elwagylUpdate/elwagyl-v-${get.data.newVersion}.zip`,
                    directory: path.join(__dirname, "../../../updater/files"), //Sub directories will also be automatically created if they do not exist.
                    cloneFiles: false,
                    fileName: "update.zip",
                    onProgress: function (percentage, chunk, remainingSize) {
                        //Gets called with each chunk.
                        progressBar.value = parseInt(percentage);
                        // console.log("% ", percentage);
                        // console.log("Current chunk of data: ", chunk);
                        // console.log("Remaining bytes: ", remainingSize);
                    },
                });

                await downloader.download();

                return "update"
            } else {
                return "next"
            }
        } else {
            return "update nothing"
        }

    } catch (error) {
        return error
    }

}


const errorMsg = ({ msg }) => {
    let response = dialog.showMessageBoxSync({
        type: "info",
        buttons: ['Update', 'Cancel'],
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