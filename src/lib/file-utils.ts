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