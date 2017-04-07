#!/usr/bin/env node

/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import * as minimist from 'minimist';

import { commands } from './commands';

const DEFAULT_COMMAND = 'help';

const cliArguments = minimist((process.argv.slice(2)));

const commandName = cliArguments._.length > 0 ? cliArguments._.shift() : DEFAULT_COMMAND;
let command = commands[commandName];

if (!command) {
    console.log(`Unknown command: ${commandName}`);
    command = commands[DEFAULT_COMMAND];
}

command.fn(cliArguments);