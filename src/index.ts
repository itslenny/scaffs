import { ScaffoldLoader } from './lib/scaffold-loader';
import { ScaffoldTemplater, TemplateOptions } from './lib/scaffold-templater';

export module Scaffolder {

    /**
     * Generates a scaffold from a provided template
     *
     * @param scaffoldPath - path to the scaffold template
     * @param targetPath - path where the item should be generated
     * @param options - options used for template generation
     */
    export function scaffold(scaffoldPath: string, targetPath: string, options: TemplateOptions): Promise<void> {
        return ScaffoldLoader.parseDirectory(scaffoldPath)
            .then(fileTree => ScaffoldTemplater.generateScaffold(fileTree, targetPath, options));
    }
}

// let source = './test/scaffolds/Example';
// let target = './test/output'
// let options: TemplateOptions = {
//     data: {
//         name: 'my newer component name',
//         stuff: [9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 7, 7],
//     },
// };

// Scaffolder.scaffold(source, target, options).then(() => console.log('DONE!!!'));
