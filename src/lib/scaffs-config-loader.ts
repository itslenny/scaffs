/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs-extra';
import * as path from 'path';

import { FileUtils } from './file-utils';
import { ScaffsConfig } from '../contracts/scaffs-config';

const SCAFFS_CONFIG_FILE = '.scaffs-config.json';

export module ScaffsConfigLoader {

    /**
     * Loads a .scaffs-config.json
     *
     * @param path - absolute path to the directory containing .scaffs-config.json
     */
    export function loadConfig(projectRoot: string): Promise<ScaffsConfig> {
        return new Promise((resolve, reject) => {
            try {
                let config = fs.readJsonSync(path.join(projectRoot, SCAFFS_CONFIG_FILE));
                if (!config.baseConfigPath) {
                    config.baseConfigPath = projectRoot;
                }
                resolve(config);

            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Populates the absolute paths of all available scaffolds
     *
     * @param param0 - a scaffs config object
     */
    export function resolveScaffolds({ scaffs, scaffsPaths, baseConfigPath }: ScaffsConfig): Promise<ScaffsConfig> {
        return new Promise((resolve, reject) => {
            let absoluteScaffPaths: { [key: string]: string } = {};

            for (let key in scaffs) {
                if (scaffs.hasOwnProperty(key)) {
                    const absoluteScaffoldPath = path.resolve(baseConfigPath, scaffs[key]);

                    if (!FileUtils.existsSync(absoluteScaffoldPath)) {
                        reject(`Scaffold not found - ${absoluteScaffoldPath}`);
                        return;
                    }

                    absoluteScaffPaths[key] = absoluteScaffoldPath;
                }
            }

            for (let i = 0, len = scaffsPaths.length; i < len; i++) {
                const scaffoldPackagePath = path.resolve(baseConfigPath, scaffsPaths[i]);
                const scaffolds = fs.readdirSync(scaffoldPackagePath);

                for (let j = 0, len = scaffolds.length; j < len; j++) {
                    const scaffoldPath = scaffolds[j];

                    if (scaffoldPath.startsWith('.')) {
                        continue;
                    }

                    const absoluteScaffoldPath = path.resolve(scaffoldPackagePath, scaffoldPath);
                    const scaffoldName = path.basename(scaffoldPath);

                    if (!FileUtils.existsSync(absoluteScaffoldPath)) {
                        reject(`Scaffold not found - ${absoluteScaffoldPath}`);
                        return;
                    }

                    absoluteScaffPaths[scaffoldName] = absoluteScaffoldPath;
                }
            }

            resolve({ scaffs, scaffsPaths, baseConfigPath, absoluteScaffPaths });
        });
    }
}