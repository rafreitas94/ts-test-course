"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../app/Utils");
describe.skip('Utils test suite', () => {
    beforeEach(() => {
        console.log('before each');
    });
    beforeAll(() => {
        console.log('before all');
    });
    test('first test', () => {
        const result = Utils_1.Utils.toUpperCase('abc');
        expect(result).toBe('ABC');
    });
    test('parse simple URL', () => {
        const parsedUrl = Utils_1.Utils.parseUrl('http://localhost:8080/login');
        expect(parsedUrl.href).toBe('http://localhost:8080/login');
        expect(parsedUrl.port).toBe('8080');
        expect(parsedUrl.protocol).toBe('http:');
        expect(parsedUrl.query).toEqual({});
    });
    test('parse URL with query', () => {
        const parsedUrl = Utils_1.Utils.parseUrl('http://localhost:8080/login?user=user&password=pass');
        const expectedQuery = {
            user: 'user',
            password: 'pass'
        };
        expect(parsedUrl.query).toEqual(expectedQuery);
        expect(expectedQuery).toBe(expectedQuery);
    });
    test.only('test invalid URL', () => {
        function expectedError() {
            Utils_1.Utils.parseUrl('');
        }
        expect(expectedError).toThrowError('Empty url');
    });
    test.only('test invalid URL with arrow function', () => {
        expect(() => {
            Utils_1.Utils.parseUrl('');
        }).toThrowError('Empty url');
    });
    test.only('test invalid URL with try catch', () => {
        try {
            Utils_1.Utils.parseUrl('');
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error).toHaveProperty('message', 'Empty url!');
        }
    });
});
//# sourceMappingURL=Utils.test.js.map