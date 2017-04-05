"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
var FileDataNodeType;
(function (FileDataNodeType) {
    FileDataNodeType[FileDataNodeType["File"] = 0] = "File";
    FileDataNodeType[FileDataNodeType["Directory"] = 1] = "Directory";
})(FileDataNodeType = exports.FileDataNodeType || (exports.FileDataNodeType = {}));
var ScaffoldLoader;
(function (ScaffoldLoader) {
    /**
     * Recursively generates a tree from the provided directory
     *
     * @param filePath - base path of the scaffold to parse
     */
    function parseDirectory(baseFilePath) {
        function getFiles(filePath) {
            try {
                let fileNodes = fs.readdirSync(filePath).map(file => {
                    let fullPath = path.join(filePath, file);
                    let isDirectory = fs.statSync(fullPath).isDirectory;
                    return {
                        file: file,
                        fullPath: fullPath,
                        type: isDirectory ? FileDataNodeType.Directory : FileDataNodeType.File,
                        children: isDirectory ? getFiles(fullPath) : [],
                    };
                });
                return fileNodes.length === 1 ? fileNodes.pop() : fileNodes;
            }
            catch (e) { }
            return [];
        }
        return new Promise((resolve, reject) => {
            let directoryTree = getFiles(baseFilePath);
            if (Array.isArray(directoryTree)) {
                reject('Unable to parse scaffold directory structure');
            }
            else {
                resolve(directoryTree);
            }
        });
    }
    ScaffoldLoader.parseDirectory = parseDirectory;
})(ScaffoldLoader = exports.ScaffoldLoader || (exports.ScaffoldLoader = {}));
//# sourceMappingURL=/Users/lenny/Stuff/projects/Coding/mine/other/scaffolder/scaffolder-npm/src/lib/ScaffoldLoader.js.map