/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

/**
 * Describes the type of node
 */
export enum FileDataNodeType {
    File,
    Directory,
}

/**
 * Nodes of the tree of the scaffold file structure
 */
export interface FileDataNode {
    file: string;
    fullPath: string;
    type: FileDataNodeType;
    children: FileDataNode[];
}

/**
 * Configuration for a scaffold (.scaffold.json)
 */
export interface ScaffoldConfig {

}

/**
 * Definition of a scaffold that can be used to generate files
 */
export interface Scaffold {
    name: string;
    config: ScaffoldConfig;
    files: FileDataNode[];
}