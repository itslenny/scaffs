/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as path from 'path';
import * as fs from 'fs-extra';

import { ScaffoldLoader } from './scaffold-loader';

describe('ScaffoldLoader', () => {

    it('should check for valid file path', done => {
        const badPath = path.resolve(__dirname, 'a/path/that/should/never/exist');
        ScaffoldLoader.loadScaffoldFromPath(badPath)
            .then(() => done('Then should not have been called'))
            .catch(() => done());
    });

    it('should build tree of all files in a scaffold', done => {
        const exampleScaffoldPath = path.resolve(__dirname, '../../test/data/scaffolds/Example');
        const expectedScaffoldDataPath = path.resolve(__dirname, '../../test/data/scaffolds/Example.tree.json');
        const expectedScaffoldData = fs.readJsonSync(expectedScaffoldDataPath);

        ScaffoldLoader.loadScaffoldFromPath(exampleScaffoldPath)
            .then((data) => {
                // console.log('data', JSON.stringify(data, null, 4));
                expect(data).toEqual(expectedScaffoldData);
                done();
            })
            .catch(e => done(e));
    });

});