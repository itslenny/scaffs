/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
import * as changeCase from 'change-case';
import * as path from 'path';
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
     * Converts space delimited strings into proper case (e.g "some words here" === "SomeWordsHere")
     */
    public toProperCase(): string {
        return changeCase.pascal(this.toString());
    }

    /**
     * Converts space delimited strings into kebab case (e.g "some words here" === "some-words-here")
     */
    public toKebabCase(): string {
        return changeCase.param(this.toString());
    }

    public toCamelCase(): string {
        return changeCase.camel(this.toString());
    }
    public toConstantCase(): string {
        return changeCase.constant(this.toString());
    }
    public toDotCase(): string {
        return changeCase.dot(this.toString());
    }
    public toHeaderCase(): string {
        return changeCase.header(this.toString());
    }
    public toLowerCase(): string {
        return changeCase.lower(this.toString());
    }
    public toLcFirstCase(): string {
        return changeCase.lcFirst(this.toString());
    }
    public toNoCase(): string {
        return changeCase.no(this.toString());
    }
    public toParamCase(): string {
        return changeCase.param(this.toString());
    }
    public toPascalCase(): string {
        return changeCase.pascal(this.toString());
    }
    public toPathCase(): string {
        return changeCase.path(this.toString());
    }
    public toSentenceCase(): string {
        return changeCase.sentence(this.toString());
    }
    public toSnakeCase(): string {
        return changeCase.snake(this.toString());
    }
    public toSwapCase(): string {
        return changeCase.swap(this.toString());
    }
    public toTitleCase(): string {
        return changeCase.title(this.toString());
    }
    public toUpperCase(): string {
        return changeCase.upper(this.toString());
    }
    public toUcFirstCase(): string {
        return changeCase.ucFirst(this.toString());
    }

    public toRelativePath(filePath: string): string {
        return path.relative(filePath, this.toString());
    }

}