/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs';
import * as path from 'path';
import { FileUtils } from './file-utils';

export enum FileDataNodeType {
    File,
    Directory,
}

export interface FileDataNode {
    file: string;
    fullPath: string;
    type: FileDataNodeType;
    children: FileDataNode[];
}

export module ScaffoldLoader {

    /**
     * Generates a tree from the provided directory
     *
     * @param filePath - base path of the scaffold to parse
     */
    export function parseDirectory(baseFilePath: string): Promise<FileDataNode> {
        return new Promise<FileDataNode>((resolve, reject) => {
            if (!FileUtils.existsSync(baseFilePath)) {
                reject('The specified scaffold does not exist.');
                return;
            }

            resolve({
                file: path.basename(baseFilePath),
                fullPath: baseFilePath,
                type: FileDataNodeType.Directory,
                children: getFiles(baseFilePath),
            });
        });
    }

    /**
     * Recursively generates a tree from the provided directory
     *
     * @param filePath - path of the directory to parse
     * @private
     */
    function getFiles(filePath: string): FileDataNode[] {
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
                        children: isDirectory ? <FileDataNode[]>getFiles(fullPath) : [],
                    };
                });
        } catch (e) { /* just continue on error and return [] */ }
        return [];
    }
}