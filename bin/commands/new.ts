/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as path from 'path';

import { TemplateOptionsData, TemplateOptions } from '../../src/contracts/template-options';
import { Scaffolder } from '../../src';

const JSON_STRING_REGEXP = /^[\[|\{].*[\]|\}]$/;
const cwd = process.cwd();

export function newCommand(cliArguments: any) {
    let data: TemplateOptionsData = cliArguments.data || {};
    const scaffoldName = cliArguments._.join(' ');

    //TODO: load scaffold config so we know the variables
    //TODO: prompt for missing data

    let name = data.name;

    let sourcePath = cliArguments.scaffold;
    let targetPath = path.resolve(cwd, cliArguments.target);

    if (!name) {
        console.error('name is required');
        process.exit(1);
    }

    if (!targetPath) {
        console.error('--target is required');
        process.exit(1);
    }

    console.log('Generating scaffold...');

    const templateOptions: TemplateOptions = { data: parseInputData(data) };

    if (sourcePath) {
        Scaffolder.scaffoldFromPath(sourcePath, targetPath, templateOptions)
            .then(() => console.log('Generation successful!'))
            .catch((e: string) => { throw new Error(e); });
    } else {
        Scaffolder.loadScaffsConfig(path.join(cwd, '.scaffs-config.json'))
            .then((config) => Scaffolder.scaffold(config, scaffoldName, targetPath, templateOptions))
            .catch((e: string) => { throw new Error(e); });
    }
}

/**
 * Parses the input strings from minimist and returns a parsed object
 *
 * @param data - input data object
 */
function parseInputData(data: any): Object {
    if (typeof data === 'object') {
        let output: any = Array.isArray(data) ? [] : {};
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                output[key] = parseInputData(data[key]);
            }
        }
        return output;
    } else if (typeof data === 'string' && data.match(JSON_STRING_REGEXP)) {
        try {
            return JSON.parse(data);
        } catch (e) { }
    }
    return data;
}