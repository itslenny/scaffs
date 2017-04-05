export declare enum FileDataNodeType {
    File = 0,
    Directory = 1,
}
export interface FileDataNode {
    file: string;
    fullPath: string;
    type: FileDataNodeType;
    children: FileDataNode[];
}
export declare module ScaffoldLoader {
    /**
     * Recursively generates a tree from the provided directory
     *
     * @param filePath - base path of the scaffold to parse
     */
    function parseDirectory(baseFilePath: string): Promise<FileDataNode>;
}
