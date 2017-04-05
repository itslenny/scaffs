import * as fs from 'fs';
import * as path from 'path';

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
     * Recursively generates a tree from the provided directory
     * 
     * @param filePath - base path of the scaffold to parse
     */
    export function parseDirectory(baseFilePath: string): Promise<FileDataNode> {
        function getFiles(filePath: string): FileDataNode[] | FileDataNode {
            try {
                let fileNodes = fs.readdirSync(filePath).map(file => {
                    let fullPath = path.join(filePath, file);
                    let isDirectory = fs.statSync(fullPath).isDirectory;
                    
                    return {
                        file: file,
                        fullPath: fullPath,
                        type: isDirectory ? FileDataNodeType.Directory : FileDataNodeType.File,
                        children: isDirectory ? <FileDataNode[]>getFiles(fullPath) : [],
                    };
                });
                return fileNodes.length === 1 ? fileNodes.pop() : fileNodes;
            } catch (e) { /* just continue on error and return [] */ }
            return [];
        }

        return new Promise<FileDataNode>((resolve, reject) => {
            let directoryTree = <FileDataNode>getFiles(baseFilePath);
            if(Array.isArray(directoryTree)) {
                reject('Unable to parse scaffold directory structure');
            } else {
                resolve(directoryTree);
            }
        });
    }
}