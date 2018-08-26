/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs-extra';
import * as path from 'path';

import { FileUtils } from './file-utils';
import { Scaffold, FileDataNode, FileDataNodeType, ScaffoldConfig, ScaffoldVariableConfig, ScaffoldCode } from '../contracts/scaffold';

const SCAFFOLD_CONFIG_FILE = '.scaffold.json';
const SCAFFOLD_CODE_FILE = '.scaffold.code.js';

export module ScaffoldLoader {

    /**
     * Generates a scaffold object from the provided directory
     *
     * @param filePath - base path of the scaffold to parse
     */
    export function loadScaffold(baseFilePath: string): Promise<Scaffold> {
        return new Promise<Scaffold>((resolve, reject) => {
            if (!FileUtils.directoryExistsSync(baseFilePath)) {
                reject('The specified scaffold does not exist.');
                return;
            }

            loadScaffoldConfig(baseFilePath)
                .then(scaffoldConfig => {
                    loadScaffoldCode(baseFilePath).then((scaffoldCode) => {
                        const scaffold: Scaffold = {
                            name: path.basename(baseFilePath),
                            config: scaffoldConfig,
                            files: parseScaffoldFiles(baseFilePath),
                        };
                        if (scaffoldCode) {
                            scaffold.code = scaffoldCode;
                        }
                        resolve(scaffold);
                    });
                });
        });
    }

    /**
     * loads the .scaffold.json config from the scaffold by name
     *
     * @param filePath - base path of the scaffold
     */
    export function loadScaffoldConfig(scaffoldPath: string): Promise<ScaffoldConfig> {
        return new Promise((resolve, reject) => {
            try {
                const configPath = path.join(scaffoldPath, SCAFFOLD_CONFIG_FILE);
                resolve(fs.readJsonSync(configPath));
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * loads the .scaffold.code.js from the scaffold by name
     *
     * @param filePath - base path of the scaffold
     */
    export function loadScaffoldCode(scaffoldPath: string): Promise<ScaffoldCode | null> {
        return new Promise((resolve, reject) => {
            try {
                const codePath = path.join(scaffoldPath, SCAFFOLD_CODE_FILE);
                if (FileUtils.existsSync(codePath)) {
                    resolve(require(codePath));
                }
                else {
                    resolve(null);
                }
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Gets the list of scaffold variables from the specified path
     *
     * @param scaffoldPath - path to scaffold to load
     */
    export function getScaffoldVariablesFromPath(scaffoldPath: string): Promise<ScaffoldVariableConfig[]> {
        return loadScaffoldConfig(scaffoldPath).then(scaffoldConfig => getScaffoldVariables(scaffoldConfig));
    }

    /**
     * Gets the list of scaffold variables from the specified path
     *
     * @param scaffoldPath - path to scaffold to load
     */
    export function getScaffoldVariables(scaffoldConfig: ScaffoldConfig): ScaffoldVariableConfig[] {
        return scaffoldConfig.variables.map(variable => ({
            name: typeof variable === 'object' ? variable.name : variable,
            prompt: typeof variable === 'object' ? (variable.prompt || variable.name) : variable,
            optional: typeof variable === 'object' ? !!variable.optional : false,
        }));
    }
}

/**
 * Recursively generates a tree from the provided directory
 *
 * @param filePath - path of the directory to parse
 * @private
 */
function parseScaffoldFiles(filePath: string): FileDataNode[] {
    try {
        return fs.readdirSync(filePath)
            //ignore . files
            .filter(file => !file.startsWith('.'))
            .map(file => {
                let fullPath = path.join(filePath, file);
                let isDirectory = fs.statSync(fullPath).isDirectory();

                return {
                    file,
                    fullPath,
                    type: isDirectory ? FileDataNodeType.Directory : FileDataNodeType.File,
                    children: isDirectory ? <FileDataNode[]>parseScaffoldFiles(fullPath) : [],
                };
            });
    } catch (e) { /* just continue on error and return [] */ }
    return [];
}