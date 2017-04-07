/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs';

export module FileUtils {

    export function existsSync(path: string): boolean {
        try {
            fs.accessSync(path)
        } catch (e) {
            return false;
        }
        return true;
    }
}