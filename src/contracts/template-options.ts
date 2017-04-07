/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

/**
 * User defined data for templating
 */
export interface TemplateOptionsData {
    [key: string]: any;
}

/**
 * Options used for generating a template
 */
export interface TemplateOptions {
    data: TemplateOptionsData;
}