import { TemplateOptions } from './template-options';
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
    variables: ScaffoldVariable[];
}

/**
 * Code for a scaffold (.scaffold.code.js)
 */
export abstract class ScaffoldCode {
    abstract async onStart(scaffold: Scaffold, targetPath: string, options?: TemplateOptions): Promise<boolean>;
    abstract async onComplete(scaffold: Scaffold, targetPath: string, options?: TemplateOptions): Promise<boolean>;
}

export type ScaffoldVariable = string | ScaffoldVariableConfig;

/**
 * Configuration for individual scaffold variables
 */
export interface ScaffoldVariableConfig {
    // name of a variable used in scaffold templates
    name: string;
    // optional custom prompt for user when entering this variable
    prompt?: string;
    // allows this variable to be left blank (will default to an empty string)
    optional?: boolean;
}

/**
 * Definition of a scaffold that can be used to generate files
 */
export interface Scaffold {
    name: string;
    config: ScaffoldConfig;
    files: FileDataNode[];
    code?: ScaffoldCode;
}
