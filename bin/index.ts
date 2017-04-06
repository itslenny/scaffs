#!/usr/bin/env node

import * as minimist from 'minimist';

import { TemplateOptionsData } from '../src/lib/scaffold-templater';
import { Scaffolder } from '../src';

const JSON_STRING_REGEXP = /^[\[|\{].*[\]|\}]$/;

if (process.argv.length < 3) {
    //show help screen
    console.log('this is the help screen');
    process.exit();
}

const cliArguments = minimist((process.argv.slice(2)));

let data: TemplateOptionsData = cliArguments.data || {};
let name = data.name = cliArguments._.join(' ');

let sourcePath = cliArguments.scaffold;
let targetPath = cliArguments.target;

if (!name) {
    console.error('name is required');
    process.exit(1);
}

if (!sourcePath || !targetPath) {
    console.error('--scaffold and --target are required');
    process.exit(1);
}

console.log('Generating scaffold...');

Scaffolder.scaffold(sourcePath, targetPath, { data: parseInputData(data) })
    .then(() => console.log('Generation successful!'))
    .catch(e => { throw new Error(e); });

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