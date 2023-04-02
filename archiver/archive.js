const archiver = require('archiver');
const path = require('path');
const fs = require('fs');
const pkg = require("../package.json")
/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = fs.createWriteStream(outPath);

    return new Promise((resolve, reject) => {
        archive
            .directory(sourceDir, false)
            .on('error', err => reject(err))
            .pipe(stream)
            ;

        stream.on('close', () => resolve());
        archive.finalize();
    });
} 

let sourceDir = path.join("./", "resource")
let win = path.join(sourceDir, "win-ia32-unpacked")
let outPath = path.join(sourceDir, `elwagyl-v-${pkg.version}.zip`)

zipDirectory(win, outPath)