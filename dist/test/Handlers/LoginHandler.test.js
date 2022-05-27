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
const LoginHandler_1 = require("../../app/Handlers/LoginHandler");
const ServerModels_1 = require("../../app/Models/ServerModels");
const Utils_1 = require("../../app/Utils/Utils");
describe('LoginHandler test suite', () => {
    let loginHandler;
    const requestMock = {
        method: ''
    };
    const responseMock = {
        writeHead: jest.fn(),
        write: jest.fn(),
        statusCode: 0
    };
    const authorizeMock = {
        generateToken: jest.fn()
    };
    const getRequestBodyMock = jest.fn();
    beforeEach(() => {
        loginHandler = new LoginHandler_1.LoginHandler(requestMock, responseMock, authorizeMock);
        Utils_1.Utils.getRequestBody = getRequestBodyMock;
        requestMock.method = ServerModels_1.HTTP_METHODS.POST;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    const someSessionToken = {
        tokenId: 'someTokenId',
        userName: 'someUserName',
        valid: true,
        expirationTime: new Date(),
        accessRights: [1, 2, 3]
    };
    test('option request', () => __awaiter(void 0, void 0, void 0, function* () {
        requestMock.method = ServerModels_1.HTTP_METHODS.OPTIONS;
        yield loginHandler.handleRequest();
        expect(responseMock.writeHead).toBeCalledWith(ServerModels_1.HTTP_CODES.OK);
    }));
    test('not handled http method', () => __awaiter(void 0, void 0, void 0, function* () {
        // responseMock.writeHead.mockClear(); //to clear mock
        requestMock.method = 'someRandomMethod';
        yield loginHandler.handleRequest();
        expect(responseMock.writeHead).not.toHaveBeenCalled();
    }));
    test('post request with valid login', () => __awaiter(void 0, void 0, void 0, function* () {
        getRequestBodyMock.mockReturnValueOnce({
            username: 'someUser',
            password: 'password'
        });
        authorizeMock.generateToken.mockReturnValueOnce(someSessionToken);
        yield loginHandler.handleRequest();
        expect(responseMock.statusCode).toBe(ServerModels_1.HTTP_CODES.CREATED);
        expect(responseMock.writeHead).toBeCalledWith(ServerModels_1.HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
        expect(responseMock.write).toBeCalledWith(JSON.stringify(someSessionToken));
    }));
    test('post request with invalid login', () => __awaiter(void 0, void 0, void 0, function* () {
        getRequestBodyMock.mockReturnValueOnce({
            username: 'someUser',
            password: 'password'
        });
        authorizeMock.generateToken.mockReturnValueOnce(null);
        yield loginHandler.handleRequest();
        expect(responseMock.statusCode).toBe(ServerModels_1.HTTP_CODES.NOT_fOUND);
        expect(responseMock.write).toBeCalledWith('wrong username or password');
    }));
    test('post request with unexpected error', () => __awaiter(void 0, void 0, void 0, function* () {
        getRequestBodyMock.mockRejectedValueOnce(new Error('something went wrong!'));
        yield loginHandler.handleRequest();
        expect(responseMock.statusCode).toBe(ServerModels_1.HTTP_CODES.INTERNAL_SERVER_ERROR);
        expect(responseMock.write).toBeCalledWith('Internal error: something went wrong!');
    }));
});
//# sourceMappingURL=LoginHandler.test.js.map