/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import { newCommand } from './new';
import { helpCommand } from './help';

export interface Command {
    fn: Function;
    help: string;
}

// Available cli commands
export const commands: { [command: string]: Command } = {
    new: {
        fn: newCommand,
        help: 'Scaffold from a template - usage: scaffs new [scaffold name]',
    },
    help: {
        fn: helpCommand,
        help: 'Shows this help screen',
    },
};