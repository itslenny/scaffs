/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

const WORD_SPLIT_REGEXP = / \S|^\S/ig;
const WORD_SPLIT_SKIP_FIRST_REGEXP = / \S/ig;
const WORD_SPACES_REGEXP = / /ig;

export class TemplateString extends String {

    /**
     * Recursively converts all strings in an object/array to TemplateString instances
     *
     * @param input - data object to parse into template strings
     */
    static convertToTemplateStrings(input: any): any {
        if (typeof input === 'object') {
            let output: any = Array.isArray(input) ? [] : {};
            for (let key in input) {
                if (input.hasOwnProperty(key)) {
                    output[key] = TemplateString.convertToTemplateStrings(input[key]);
                }
            }
            return output;
        } else if (typeof input === 'string') {
            return new TemplateString(input);
        }
        return input;
    }

    constructor(str: string) {
        super(str);
    }

    /**
     * Converts space delimited strings into camel case (e.g "some words here" === "someWordsHere")
     */
    public toCamelCase(): string {
        return this.toString().toLowerCase().replace(WORD_SPLIT_SKIP_FIRST_REGEXP, v => v.trim().toUpperCase());
    }

    /**
     * Converts space delimited strings into proper case (e.g "some words here" === "SomeWordsHere")
     */
    public toProperCase(): string {
        return this.toString().toLowerCase().replace(WORD_SPLIT_REGEXP, v => v.trim().toUpperCase());
    }

    /**
     * Converts space delimited strings into pascal case (e.g "some words here" === "SomeWordsHere")
     * alias of properCase()
     */
    public toPascalCase(): string {
        return this.toProperCase();
    }

    /**
     * Converts space delimited strings into kebab case (e.g "some words here" === "some-words-here")
     */
    public toKebabCase(): string {
        return this.toString().toLowerCase().replace(WORD_SPACES_REGEXP, '-');
    }

    /**
     * Converts space delimited strings into snake case (e.g "some words here" === "some_words_here")
     */
    public toSnakeCase(): string {
        return this.toString().toLowerCase().replace(WORD_SPACES_REGEXP, '_');
    }

}