/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import { ScaffoldLoader } from './lib/scaffold-loader';
import { ScaffoldTemplater } from './lib/scaffold-templater';
import { ScaffsConfigLoader } from './lib/scaffs-config-loader';
import { TemplateOptions } from './contracts/template-options';
import { ScaffsConfig } from './contracts/scaffs-config';
import { ScaffoldConfig, ScaffoldVariableConfig } from './contracts/scaffold';

export * from './contracts/scaffold';
export * from './contracts/scaffs-config';
export * from './contracts/template-options';

export module Scaffolder {

    /**
     * Generates files from a scaffold path
     *
     * @param scaffoldPath - path to the scaffold template
     * @param targetPath - path where the item should be generated
     * @param options - options used for template generation
     */
    export function scaffoldFromPath(scaffoldPath: string, targetPath: string, options: TemplateOptions): Promise<void> {
        return ScaffoldLoader.loadScaffold(scaffoldPath)
            .then(scaffold => ScaffoldTemplater.generateScaffold(scaffold, targetPath, options));
    }

    /**
     * Generates files using the scaffold specified (requires scaffs config)
     *
     * @param config - config for the project (contains scaffold search paths)
     * @param scaffoldName - name of the scaffold to build
     * @param targetPath - location where the generated files should be placed
     * @param options - options for template generation
     */
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

    /**
     * Loads the configuration for a specified scaffold (requires scaffs config)
     *
     * @param config - config for the project (contains scaffold search paths)
     * @param scaffoldName - name of the scaffold to build
     */
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

    /**
     * Loads teh configuration for a scaffold path
     *
     * @param scaffoldPath - path to a scaffold template
     */
    export function loadScaffoldConfigFromPath(scaffoldPath: string): Promise<ScaffoldConfig> {
        return ScaffoldLoader.loadScaffoldConfig(scaffoldPath);
    }

    export function loadScaffsConfig(configPath: string): Promise<ScaffsConfig> {
        return ScaffsConfigLoader.loadConfig(configPath)
            .then(ScaffsConfigLoader.resolveScaffolds);
    }

    export function getScaffoldVariables(scaffoldConfig: ScaffoldConfig): ScaffoldVariableConfig[] {
        return ScaffoldLoader.getScaffoldVariables(scaffoldConfig);
    }

    export function getScaffoldVariablesFromPath(scaffoldPath: string): Promise<ScaffoldVariableConfig[]> {
        return ScaffoldLoader.getScaffoldVariablesFromPath(scaffoldPath);
    }

    export function getScaffoldPath(config: ScaffsConfig, scaffoldName: string): string {
        return config.absoluteScaffPaths && config.absoluteScaffPaths[scaffoldName];
    }
}
