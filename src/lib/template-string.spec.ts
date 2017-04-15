/**
 * Copyright (C) Lenny Urbanowski 2017.
 * Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */

import { TemplateString } from './template-string';

describe('TemplateString', () => {

    describe('convertToTemplateStrings()', () => {
        it('should convert simple strings into TemplateStrings', () => {
            const source = 'some words here';
            let result = TemplateString.convertToTemplateStrings(source);

            expect(result instanceof TemplateString).toBe(true);
            expect(result).toEqual(source);
        });

        it('should convert array of strings into array of TemplateStrings', () => {
            const source = ['a', 'b', 'c'];

            let result = TemplateString.convertToTemplateStrings(source);

            expect(result instanceof TemplateString).toBe(false);
            expect(result[0] instanceof TemplateString).toBe(true);
            expect(result[1] instanceof TemplateString).toBe(true);
            expect(result[2] instanceof TemplateString).toBe(true);
            expect(result).toEqual(source);
        });

        it('should convert strings in complex object into TemplateStrings', () => {
            const source = {
                a: 'some words here',
                b: [
                    'a', 'b', 'c',
                    {
                        a: 'b',
                        b: [
                            0, '1', '2', 3,
                            { a: 'yup', b: 5 },
                        ],
                    },
                ],
            };

            let result = TemplateString.convertToTemplateStrings(source);

            expect(result instanceof TemplateString).toBe(false);
            expect(result.a instanceof TemplateString).toBe(true);

            expect(result.b instanceof TemplateString).toBe(false);
            expect(Array.isArray(result.b)).toBe(true);
            expect(result.b[0] instanceof TemplateString).toBe(true);
            expect(result.b[1] instanceof TemplateString).toBe(true);
            expect(result.b[2] instanceof TemplateString).toBe(true);
            expect(result.b[3] instanceof TemplateString).toBe(false);

            expect(result.b[3].a instanceof TemplateString).toBe(true);

            expect(result.b[3].b instanceof TemplateString).toBe(false);
            expect(Array.isArray(result.b[3].b)).toBe(true);
            expect(result.b[3].b[0] instanceof TemplateString).toBe(false);
            expect(result.b[3].b[1] instanceof TemplateString).toBe(true);
            expect(result.b[3].b[2] instanceof TemplateString).toBe(true);
            expect(result.b[3].b[3] instanceof TemplateString).toBe(false);

            expect(result.b[3].b[4] instanceof TemplateString).toBe(false);
            expect(result.b[3].b[4].a instanceof TemplateString).toBe(true);
            expect(result.b[3].b[4].b instanceof TemplateString).toBe(false);
            expect(result).toEqual(source);
        });
    });

    describe('toCamelCase()', () => {
        it('should properly translate strings into camelCase', () => {
            const source = 'some words here';
            const expected = 'someWordsHere';
            let str = new TemplateString(source);
            let result = str.toCamelCase();

            expect(result).toBe(expected);
        });
    });

    describe('toProperCase()', () => {
        it('should properly translate strings into ProperCase', () => {
            const source = 'some words here';
            const expected = 'SomeWordsHere';
            let str = new TemplateString(source);
            let result = str.toProperCase();

            expect(result).toBe(expected);
        });
    });

    describe('toPascalCase()', () => {
        it('should properly translate strings into PascalCase', () => {
            const source = 'some words here';
            const expected = 'SomeWordsHere';
            let str = new TemplateString(source);
            let result = str.toPascalCase();

            expect(result).toBe(expected);
        });
    });

    describe('toKebabCase()', () => {
        it('should properly translate strings into kebab-case', () => {
            const source = 'some words here';
            const expected = 'some-words-here';
            let str = new TemplateString(source);
            let result = str.toKebabCase();

            expect(result).toBe(expected);
        });
    });

    describe('toSnakeCase()', () => {
        it('should properly translate strings into snake_case', () => {
            const source = 'some words here';
            const expected = 'some_words_here';
            let str = new TemplateString(source);
            let result = str.toSnakeCase();

            expect(result).toBe(expected);
        });
    });
});