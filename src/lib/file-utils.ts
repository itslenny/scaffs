/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs';

export module FileUtils {

    /**
     * Checks if the specified file exists (can be accessed)
     *
     * @param path - path of a file to check
     */
    export function existsSync(path: string): boolean {
        try {
            fs.accessSync(path);
        } catch (e) {
            return false;
        }
        return true;
    }

    export function directoryExistsSync(path: string): boolean {
        try {
            let stats = fs.statSync(path);
            return stats && stats.isDirectory();
        } catch (e) {
            return false;
        }
    }

    export function getGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Removes a module from the cache
     */
    export function purgeCache(moduleName: string) {
        // Traverse the cache looking for the files
        // loaded by the specified module name
        searchCache(moduleName, function (mod: any) {
            delete require.cache[mod.id];
        });

        // Remove cached paths to the module.
        // Thanks to @bentael for pointing this out.
        Object.keys((module.constructor as any)._pathCache).forEach(function (cacheKey) {
            if (cacheKey.indexOf(moduleName) > 0) {
                delete (module.constructor as any)._pathCache[cacheKey];
            }
        });
    }

    /**
     * Traverses the cache to search for all the cached
     * files of the specified module name
     */
    export function searchCache(moduleName: string, callback: any) {
        // Resolve the module identified by the specified name
        let mod = require.resolve(moduleName);

        // Check if the module has been resolved and found within
        // the cache
        if (mod) {
            mod = require.cache[mod];
            if (mod !== undefined) {
                // Recursively go over the results
                (function traverse(mod) {
                    // Go over each of the module's children and
                    // traverse them
                    (mod as any).children.forEach(function (child: any) {
                        traverse(child);
                    });

                    // Call the specified callback providing the
                    // found cached module
                    callback(mod);
                }(mod));
            }
        }
    }
}