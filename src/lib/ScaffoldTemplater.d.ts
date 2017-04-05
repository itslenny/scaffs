import { FileDataNode } from './ScaffoldLoader';
export interface TemplateOptions {
    data: {
        [key: string]: any;
    };
}
export declare module ScaffoldTemplater {
    function generateScaffold(fileTree: FileDataNode, target: string, options?: TemplateOptions): Promise<void>;
}
