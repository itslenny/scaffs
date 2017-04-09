/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import { ScaffoldLoader } from './lib/scaffold-loader';
import { ScaffoldTemplater } from './lib/scaffold-templater';
import { ScaffsConfigLoader } from './lib/scaffs-config-loader';
import { TemplateOptions } from './contracts/template-options';
import { ScaffsConfig } from './contracts/scaffs-config';
import { ScaffoldConfig } from './contracts/scaffold';

export module Scaffolder {

    /**
     * Generates a scaffold from a provided template
     *
     * @param scaffoldPath - path to the scaffold template
     * @param targetPath - path where the item should be generated
     * @param options - options used for template generation
     */
    export function scaffoldFromPath(scaffoldPath: string, targetPath: string, options: TemplateOptions): Promise<void> {
        return ScaffoldLoader.loadScaffold(scaffoldPath)
            .then(scaffold => ScaffoldTemplater.generateScaffold(scaffold, targetPath, options));
    }

    export function scaffold(config: ScaffsConfig, scaffoldName: string, targetPath: string, options: TemplateOptions): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const scaffoldPath = getScaffoldPath(config, scaffoldName);

            if (!scaffoldPath) {
                reject('Unable to find scaffold. Make sure it\'s defined in your .scaffs-config.json');
                return;
            }

            resolve(scaffoldFromPath(scaffoldPath, targetPath, options));
        });
    }

    export function loadScaffoldConfig(config: ScaffsConfig, scaffoldName: string): Promise<ScaffoldConfig> {
        return new Promise((resolve, reject) => {
            const scaffoldPath = getScaffoldPath(config, scaffoldName);

            if (!scaffoldPath) {
                reject('Unable to find scaffold. Make sure it\'s defined in your .scaffs-config.json');
                return;
            }

            resolve(ScaffoldLoader.loadScaffoldConfig(scaffoldPath));
        });
    }

    export function loadScaffoldConfigFromPath(scaffoldPath: string): Promise<ScaffoldConfig> {
        return ScaffoldLoader.loadScaffoldConfig(scaffoldPath);
    }

    export function loadScaffsConfig(configPath: string): Promise<ScaffsConfig> {
        return ScaffsConfigLoader.loadConfig(configPath)
            .then(ScaffsConfigLoader.resolveScaffolds);
    }

    export function getScaffoldPath(config: ScaffsConfig, scaffoldName: string): string {
        return config.absoluteScaffPaths && config.absoluteScaffPaths[scaffoldName];
    }
}

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
