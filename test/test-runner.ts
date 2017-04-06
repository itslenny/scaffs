import * as jasmine from 'jasmine-node';

// Jasmine

const options: jasmine.ExecuteSpecsOptions = {
    specFolders: ['./src'],
    regExpSpec: /\.spec\.js/,

}
jasmine.executeSpecsInFolder(options);

// let SpecReporter = require('jasmine-spec-reporter');
// let noop = function () { };

// let jrunner = new jasmine.Jasmine();
// jrunner.configureDefaultReporter({ print: noop });
// jasmine.getEnv().addReporter(new SpecReporter());
// jrunner.loadConfigFile();
// jrunner.execute();