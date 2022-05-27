"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = require("../../app/Utils/Utils");
describe('Utils test suite', () => {
    test('getRequestPath valid request', () => {
        const request = {
            url: 'http://localhost:8080/login'
        };
        const resultPath = Utils_1.Utils.getRequestBasePath(request);
        expect(resultPath).toBe('login');
    });
    test('getRequestPath with no path name', () => {
        const request = {
            url: ''
        };
        const resultPath = Utils_1.Utils.getRequestBasePath(request);
        expect(resultPath).toBeFalsy();
    });
});
//# sourceMappingURL=Utils.test.js.map