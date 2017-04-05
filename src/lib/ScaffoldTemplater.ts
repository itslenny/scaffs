import * as fs from 'fs-extra';
import * as path from 'path';
import * as _ from 'lodash';

import { FileDataNode, FileDataNodeType } from './ScaffoldLoader';

export interface TemplateOptions {
    data: { [key: string]: any },
}

export module ScaffoldTemplater {

    export function generateScaffold(fileTree: FileDataNode, target: string, options?: TemplateOptions): Promise<void> {

        function parseFileNode(fileNodes: FileDataNode[], target: string) {
            for (let i = 0, len = fileNodes.length; i < len; i++) {
                let node = fileNodes[i];
                let targetFileName = parseFileName(node.file);
                let targetFullPath = path.join(target, targetFileName);
                let data = options && options.data || {};

                if (node.type === FileDataNodeType.Directory) {
                    fs.ensureDirSync(targetFullPath);
                } else {
                    let templateContent = fs.readFileSync(node.fullPath).toString();
                    //TODO: add API functions
                    fs.writeFileSync(targetFullPath, _.template(templateContent)(data));
                }
            }
        }

        return new Promise<void>((resolve, reject) => {
            parseFileNode(fileTree.children, target);
        });
    }

    function parseFileName(fileName: string): string {
        return fileName;
    }

}