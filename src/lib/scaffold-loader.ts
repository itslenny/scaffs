/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs';
import * as path from 'path';

import { FileUtils } from './file-utils';
import { Scaffold, FileDataNode, FileDataNodeType } from '../contracts/scaffold';
import { ScaffsConfig } from '../contracts/scaffs-config';

export module ScaffoldLoader {

    /**
     * Generates a scaffold object from the scaffold name
     *
     * @param name - name of the scaffold to parse
     */
    export function loadScaffold(config: ScaffsConfig, name: string): Promise<Scaffold> {
        //TODO: make this shit work
        return loadScaffoldFromPath('');
    }

    /**
     * Generates a scaffold object from the provided directory
     *
     * @param filePath - base path of the scaffold to parse
     */
    export function loadScaffoldFromPath(baseFilePath: string): Promise<Scaffold> {
        return new Promise<Scaffold>((resolve, reject) => {
            if (!FileUtils.existsSync(baseFilePath)) {
                reject('The specified scaffold does not exist.');
                return;
            }

            resolve({
                name: path.basename(baseFilePath),
                config: null,
                files: parseScaffoldFiles(baseFilePath),
            });
        });
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
}