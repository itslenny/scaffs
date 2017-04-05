"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const path = require("path");
const _ = require("lodash");
const ScaffoldLoader_1 = require("./ScaffoldLoader");
var ScaffoldTemplater;
(function (ScaffoldTemplater) {
    function generateScaffold(fileTree, target, options) {
        function parseFileNode(fileNodes, target) {
            for (let i = 0, len = fileNodes.length; i < len; i++) {
                let node = fileNodes[i];
                let targetFileName = parseFileName(node.file);
                let targetFullPath = path.join(target, targetFileName);
                let data = options && options.data || {};
                if (node.type === ScaffoldLoader_1.FileDataNodeType.Directory) {
                    fs.ensureDirSync(targetFullPath);
                }
                else {
                    let templateContent = fs.readFileSync(node.fullPath).toString();
                    //TODO: add API functions
                    fs.writeFileSync(targetFullPath, _.template(templateContent)(data));
                }
            }
        }
        return new Promise((resolve, reject) => {
            parseFileNode(fileTree.children, target);
        });
    }
    ScaffoldTemplater.generateScaffold = generateScaffold;
    function parseFileName(fileName) {
        return fileName;
    }
})(ScaffoldTemplater = exports.ScaffoldTemplater || (exports.ScaffoldTemplater = {}));
//# sourceMappingURL=/Users/lenny/Stuff/projects/Coding/mine/other/scaffolder/scaffolder-npm/src/lib/ScaffoldTemplater.js.map