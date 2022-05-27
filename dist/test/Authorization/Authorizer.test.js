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
const Authorizer_1 = require("../../app/Authorization/Authorizer");
const SessionTokenDBAccess_1 = require("../../app/Authorization/SessionTokenDBAccess");
const UserCredentialsDbAccess_1 = require("../../app/Authorization/UserCredentialsDbAccess");
jest.mock("../../app/Authorization/SessionTokenDBAccess");
jest.mock("../../app/Authorization/UserCredentialsDbAccess");
describe('Authorizer jest suite', () => {
    let authorizer;
    const sessionTokenDBAccessMock = {
        storeSessionToken: jest.fn()
    };
    const userCredentialsDBAccessMock = {
        getUserCredential: jest.fn()
    };
    beforeEach(() => {
        authorizer = new Authorizer_1.Authorizer(sessionTokenDBAccessMock, userCredentialsDBAccessMock);
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('constructor arguments', () => {
        new Authorizer_1.Authorizer();
        expect(SessionTokenDBAccess_1.SessionTokenDBAccess).toBeCalled();
        expect(UserCredentialsDbAccess_1.UserCredentialsDbAccess).toBeCalled();
    });
    const someAccount = {
        username: 'someUser',
        password: 'password'
    };
    test('should return sessionToken for valid credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(global.Math, 'random').mockReturnValueOnce(0);
        jest.spyOn(global.Date, 'now').mockReturnValueOnce(0);
        userCredentialsDBAccessMock.getUserCredential.mockResolvedValueOnce({
            username: 'someUser',
            accessRights: [1, 2, 3]
        });
        const expectedSessionToken = {
            userName: 'someUser',
            accessRights: [1, 2, 3],
            valid: true,
            tokenId: '',
            expirationTime: new Date(60 * 60 * 1000)
        };
        const sessionToken = yield authorizer.generateToken(someAccount);
        expect(expectedSessionToken).toEqual(sessionToken);
    }));
});
//# sourceMappingURL=Authorizer.test.js.map