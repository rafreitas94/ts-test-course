"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionTokenDBAccess_1 = require("../../app/Authorization/SessionTokenDBAccess");
jest.mock('nedb');
describe('SessionTokenDBAccess test suite', () => {
    let sessionTokenDBAccess;
    const nedbMock = {
        loadDatabase: jest.fn(),
        insert: jest.fn(),
        find: jest.fn()
    };
    const someToken = {
        accessRights: [],
        expirationTime: new Date(),
        tokenId: '123',
        userName: 'John',
        valid: true
    };
    beforeEach(() => {
        sessionTokenDBAccess = new SessionTokenDBAccess_1.SessionTokenDBAccess(nedbMock);
        expect(nedbMock.loadDatabase).toBeCalled();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('store sessionToken without error', () => __awaiter(void 0, void 0, void 0, function* () {
        nedbMock.insert.mockImplementationOnce((someToken, cb) => {
            cb();
        });
        yield sessionTokenDBAccess.storeSessionToken(someToken);
        expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
    }));
    test('store sessionToken with error', () => __awaiter(void 0, void 0, void 0, function* () {
        nedbMock.insert.mockImplementationOnce((someToken, cb) => {
            cb(new Error('something went wrong'));
        });
        yield expect(sessionTokenDBAccess.storeSessionToken(someToken))
            .rejects.toThrow('something went wrong');
        expect(nedbMock.insert).toBeCalledWith(someToken, expect.any(Function));
    }));
});
//# sourceMappingURL=SessionTokenDBAccess.test.js.map