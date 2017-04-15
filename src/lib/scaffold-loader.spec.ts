/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as path from 'path';
import * as fs from 'fs-extra';

import { ScaffoldLoader } from './scaffold-loader';

describe('ScaffoldLoader', () => {

    describe('loadScaffold()', () => {
        it('should check for valid file path', done => {
            const badPath = path.resolve(__dirname, 'a/path/that/should/never/exist');
            ScaffoldLoader.loadScaffold(badPath)
                .then(() => done('Then should not have been called'))
                .catch(() => done());
        });

        it('should build tree of all files in a scaffold', done => {
            const exampleScaffoldPath = path.resolve(__dirname, '../../test/data/scaffolds/Example');
            const expectedScaffoldDataPath = path.resolve(__dirname, '../../test/data/scaffolds/Example.tree.json');
            const expectedScaffoldData = fs.readJsonSync(expectedScaffoldDataPath);

            ScaffoldLoader.loadScaffold(exampleScaffoldPath)
                .then((data) => {
                    expect(data).toEqual(expectedScaffoldData);
                    done();
                })
                .catch(e => done(e));
        });
    });

    describe('loadScaffoldConfig()', () => {
        it('should check for valid file path', done => {
            const badPath = path.resolve(__dirname, 'a/path/that/should/never/exist');
            ScaffoldLoader.loadScaffoldConfig(badPath)
                .then(() => done('Then should not have been called'))
                .catch(() => done());
        });

        it('should load the scaffold config', done => {
            const exampleScaffoldPath = path.resolve(__dirname, '../../test/data/scaffolds/Example');
            const expectedConfig = {
                variables: [
                    'name',
                    'stuff',
                    { prompt: 'Enter a value for other stuff (string)', name: 'otherStuff', optional: true },
                ],
            };

            ScaffoldLoader.loadScaffoldConfig(exampleScaffoldPath)
                .then((data) => {
                    expect(data).toEqual(expectedConfig);
                    done();
                })
                .catch(e => done(e));
        });
    });

});