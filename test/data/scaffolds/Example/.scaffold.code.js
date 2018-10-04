const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const projectRoot = vscode.workspace.rootPath;


exports.onComplete = function(scaffold, targetPath, options) {
    console.log('ON COMPLETE');
    const filePath = path.join(projectRoot, 'test.txt');
    fs.writeFileSync(filePath, JSON.stringify({ scaffold, targetPath, options }, null, 4), { encoding: 'utf8'});
}

exports.onStart = function(scaffold, targetPath, options) {
    console.log('on Start');

}
