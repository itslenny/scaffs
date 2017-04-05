// import * as _ from 'lodash';

import { ScaffoldLoader } from './lib/ScaffoldLoader';
import { ScaffoldTemplater, TemplateOptions } from './lib/ScaffoldTemplater';

console.log('doing it');
let target = './test/output'
let options: TemplateOptions = {
    data: {
        name: 'my-name',
    },
};

ScaffoldLoader.parseDirectory('./')
    .then(fileTree => ScaffoldTemplater.generateScaffold(fileTree, target, options))
    .then(() => console.log('IM DONE!!'));