/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

/**
 * Project scaffs configuration (.scaffs-config.json)
 */
export interface ScaffsConfig {
    scaffsPaths: string[];
    scaffs: { [key: string]: string };

    // used to load scaffolds by name (can be populated with)
    absoluteScaffPaths: { [key: string]: string };

    // used to resolve absolute paths
    baseConfigPath: string;

    // header text to prepend to all generated files
    headers?: {
        [glob: string]: string;
    };

    // change the scaffs default intention to the provided characters
    indention?: string;
}