/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';

import { FileDataNode, FileDataNodeType } from './scaffold-loader';
import { TemplateString } from './template-string';

const FILE_NAME_REGEXP = /__.*?__/ig;

export interface TemplateOptionsData {
    [key: string]: any;
}

export interface TemplateOptions {
    data: TemplateOptionsData;
}

export module ScaffoldTemplater {

    /**
     * Recursively creates a scaffold from a specified file nodes
     *
     * @param fileNodes - list of nodes to process
     * @param targetPath - path where the scaffold should be created
     * @param options - options used to generate the template
     */
    export function generateScaffold(fileTree: FileDataNode, targetPath: string, options?: TemplateOptions): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                options.data = TemplateString.convertToTemplateStrings(options && options.data || {});

                //expose lodash to template - TODO: maybe make this extensible to support other libraries
                options.data._ = _;
                //blank string (kinda a hack for doing files starting with a ".")
                options.data.null = '';

                fs.ensureDirSync(targetPath);

                scaffoldFileNode(fileTree.children, targetPath, options);
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Recursively creates a scaffold from a specified file nodes
     *
     * @param fileNodes - list of nodes to process
     * @param targetPath - path where the scaffold should be created
     * @param options - options used to generate the template
     * @private
     */
    function scaffoldFileNode(fileNodes: FileDataNode[], targetPath: string, options?: TemplateOptions) {
        let data = options.data;

        for (let i = 0, len = fileNodes.length; i < len; i++) {
            let node = fileNodes[i];
            let targetFileName = parseFileNameTemplate(node.file, data);
            let targetFullPath = path.join(targetPath, targetFileName);

            if (node.type === FileDataNodeType.Directory) {
                fs.ensureDirSync(targetFullPath);
                if (node.children && node.children.length > 0) {
                    scaffoldFileNode(node.children, targetFullPath, options);
                }
            } else {
                let templateContent = fs.readFileSync(node.fullPath).toString();
                fs.writeFileSync(targetFullPath, _.template(templateContent)(data));
            }
        }
    }

    /**
     * Applies a lodash template to file names
     *
     * @param fileName - file name string to parse
     * @param data - template values
     * @private
     */
    function parseFileNameTemplate(fileName: string, data: TemplateOptionsData): string {
        let fileNameTemplate = fileName.replace(FILE_NAME_REGEXP, v => `<%= ${v.slice(2, -2)} %>`);
        return _.template(fileNameTemplate)(data);
    }

}