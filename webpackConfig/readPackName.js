const fs = require('fs');
const path = require('path');

module.exports = function () {
    var folders = fs.readdirSync(path.join(__dirname, '../src/part'));
    var errorMessage = null;
    var exportsObject = {};
    folders.forEach((folderName) => {
        try {
            fs.readFileSync(path.join(__dirname, '../src/part/' + folderName + '/main.js'))
            exportsObject[folderName] = './src/part/' + folderName + '/main.js';
        } catch (error) {
            if (!errorMessage) {
                errorMessage = [];
            }
            errorMessage.push('模块配置问题，请检查 ./src/part/' + folderName + '/main.js');
        }
    });
    return {
        error: errorMessage,
        obj: exportsObject,
    }
}