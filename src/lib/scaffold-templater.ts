/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';
import * as detectIndent from 'detect-indent';
import * as minimatch from 'minimatch';

import { FileDataNode, FileDataNodeType, Scaffold } from '../contracts/scaffold';
import { TemplateString } from './template-string';
import { TemplateOptions, TemplateOptionsData } from '../contracts/template-options';
import { FileUtils } from './file-utils';

const FILE_NAME_REGEXP = /__.*?__/ig;

export module ScaffoldTemplater {

    /**
     * Recursively creates a scaffold from a specified file nodes
     *
     * @param fileNodes - list of nodes to process
     * @param targetPath - path where the scaffold should be created
     * @param options - options used to generate the template
     */
    export function generateScaffold(scaffold: Scaffold, targetPath: string, options?: TemplateOptions): Promise<void> {
        return new Promise<void>(async (resolve, reject) => {
            try {
                if (scaffold.code && scaffold.code.onStart) {
                    await scaffold.code.onStart(scaffold, targetPath, options);
                }

                options.data = TemplateString.convertToTemplateStrings(options && options.data || {});

                //expose lodash to template - TODO: maybe make this extensible to support other libraries
                options.data._ = _;
                //blank string (kinda a hack for doing files starting with a ".")
                options.data.null = '';

                fs.ensureDirSync(targetPath);

                scaffoldFileNode(scaffold.files, targetPath, options);

                if (scaffold.code && scaffold.code.onComplete) {
                    await scaffold.code.onComplete(scaffold, targetPath, options);
                }
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
                templateContent = FileUtils.escapeContent(templateContent);
                let outputContent = _.template(templateContent)(Object.assign({}, data, { _filePath: targetFullPath }));
                outputContent = FileUtils.unescapeContent(outputContent);
                // update indention
                if (options.indention && options.indention.length) {
                    const { indent } = detectIndent(outputContent);
                    if (indent && indent.length) {
                        outputContent = outputContent.replace(new RegExp(indent, 'g'), options.indention);
                    }
                }

                // add file headers
                let headers = options.headers;
                let header = '';
                if (headers) {
                    for (let glob in headers) {
                        if (headers.hasOwnProperty(glob) && minimatch(node.file, glob)) {
                            header = headers[glob];
                        }
                    }
                    outputContent = header + outputContent;
                }

                fs.writeFileSync(targetFullPath, outputContent);
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
