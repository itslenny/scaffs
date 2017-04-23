/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as path from 'path';

import { TemplateOptionsData } from '../../src/contracts/template-options';
import { Scaffolder } from '../../src';
import { ScaffoldConfig } from '../../src/contracts/scaffold';
import * as syncPrompt from 'prompt-sync';
const prompt = syncPrompt();

const JSON_STRING_REGEXP = /^[\[|\{].*[\]|\}]$/;
const cwd = process.cwd();

export function newCommand(cliArguments: any): void {
    let data: TemplateOptionsData = cliArguments.data || {};
    const scaffoldName = cliArguments._.join(' ');

    let sourcePath = cliArguments.scaffold;
    let targetPath = cliArguments.target;

    if (!sourcePath && !scaffoldName) {
        console.log('What do you want to create? Source path or scaffold name is required');
        process.exit(1);
    }

    if (!targetPath) {
        targetPath = prompt(`Target path (where the scaffold will be created): `);
    }

    if (!targetPath) {
        console.log('Unable to scaffold - Target path is required');
        process.exit(1);
    }

    targetPath = path.resolve(cwd, targetPath);

    console.log('Generating scaffold...');

    if (sourcePath) { // Load from specified path if provided

        // load scaffold config from scaffold path
        Scaffolder.loadScaffoldConfigFromPath(sourcePath)
            // get / parse user provided scaffold data
            .then(scaffoldConfig => ({ data: parseInputData(getScaffoldVariables(scaffoldConfig, data)) }))
            .then((templateOptions) =>
                // run the scaffold with the provided paths and data
                Scaffolder.scaffoldFromPath(sourcePath, targetPath, templateOptions)
                    .then(() => console.log('Generation successful!'))
                    .catch((e: string) => { throw new Error(e); }),
        );

    } else { // If there is no scaffold path load it by name

        // loads the scaffs config from the project root
        // TODO: maybe allow this to crawl upward and find a config in a parent folder
        Scaffolder.loadScaffsConfig(cwd)
            .then((scaffsConfig) =>
                // load the scaffold config based on the scaffold name (loaded based on the scaffsConfig)
                Scaffolder.loadScaffoldConfig(scaffsConfig, scaffoldName)
                    // get / parse user provided scaffold data
                    .then(scaffoldConfig => ({ data: parseInputData(getScaffoldVariables(scaffoldConfig, data)) }))
                    // run the scaffold based on the scaffold name (loaded based on the scaffsConfig)
                    .then(templateOptions => Scaffolder.scaffold(scaffsConfig, scaffoldName, targetPath, templateOptions))
                    .catch((e: string) => { throw new Error(e); }),
        );
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

function getScaffoldVariables(config: ScaffoldConfig, data: TemplateOptionsData): TemplateOptionsData {
    let variables = Scaffolder.getScaffoldVariables(config);
    let variablesResult: TemplateOptionsData = {};

    for (let i = 0, len = variables.length; i < len; i++) {
        let variable = variables[i];
        let variableName = variable.name;
        let variableOptional = variable.optional;
        if (data[variableName]) {
            variablesResult[variableName] = data[variableName];
        } else {
            let variablePrompt = variable.prompt;
            variablesResult[variableName] = prompt(`${variablePrompt}: `);
        }
        if (!variableOptional && !variablesResult[variableName]) {
            console.log(`Unable to scaffold - ${variableName} is required`);
            process.exit(1);
        }
    }
    return variablesResult;
}