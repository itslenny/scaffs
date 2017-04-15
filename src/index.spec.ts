/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

describe('index (main entry point)', () => {

    describe('scaffoldFromPath()', () => {

    });

    describe('scaffold()', () => {

    });

    describe('loadScaffoldConfig()', () => {

    });

    describe('loadScaffoldConfigFromPath()', () => {

    });

    describe('loadScaffsConfig()', () => {

    });

    describe('getScaffoldPath()', () => {

    });

});

// TEST LOAD CONFIG
// let configBasePath = path.resolve(__dirname, '../test/data/projects/basic-test-project');
// let configPath = path.resolve(configBasePath, '.scaffs-config.json');
// Scaffolder.loadScaffsConfig(configPath)
//     .then(config => console.log('config', config))
//     .catch(e => console.log('config error', e));

// TEST PROGRAMMATIC USAGE
// let source = './test/data/scaffolds/Example';
// let target = './test/output'
// let options: TemplateOptions = {
//     data: {
//         name: 'my newer component name',
//         stuff: [9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7],
//     },
// };

// Scaffolder.scaffoldFromPath(source, target, options).then(() => console.log('DONE!!!'));
