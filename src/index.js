// import * as _ from 'lodash';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScaffoldLoader_1 = require("./lib/ScaffoldLoader");
const ScaffoldTemplater_1 = require("./lib/ScaffoldTemplater");
console.log('doing it');
let target = './test/output';
let options = {
    data: {
        name: 'my-name',
    },
};
ScaffoldLoader_1.ScaffoldLoader.parseDirectory('./')
    .then(fileTree => ScaffoldTemplater_1.ScaffoldTemplater.generateScaffold(fileTree, target, options))
    .then(() => console.log('IM DONE!!'));
//# sourceMappingURL=/Users/lenny/Stuff/projects/Coding/mine/other/scaffolder/scaffolder-npm/src/index.js.map