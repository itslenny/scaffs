/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as jasmine from 'jasmine-node';

// Jasmine

const options: jasmine.ExecuteSpecsOptions = {
    specFolders: ['./src'],
    regExpSpec: /\.spec\.ts/,
    isVerbose: true,
};

jasmine.executeSpecsInFolder(options);

// let SpecReporter = require('jasmine-spec-reporter');
// let noop = function () { };

// let jrunner = new jasmine.Jasmine();
// jrunner.configureDefaultReporter({ print: noop });
// jasmine.getEnv().addReporter(new SpecReporter());
// jrunner.loadConfigFile();
// jrunner.execute();