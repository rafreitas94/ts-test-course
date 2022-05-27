"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authorizer_1 = require("../../app/Authorization/Authorizer");
const UsersDBAccess_1 = require("../../app/Data/UsersDBAccess");
const DataHandler_1 = require("../../app/Handlers/DataHandler");
const LoginHandler_1 = require("../../app/Handlers/LoginHandler");
const Server_1 = require("../../app/Server/Server");
jest.mock('../../app/Handlers/LoginHandler');
jest.mock('../../app/Handlers/DataHandler');
jest.mock('../../app/Authorization/Authorizer');
const requestMock = {
    url: ''
};
const responseMock = {
    end: jest.fn()
};
const listenMock = {
    listen: jest.fn()
};
jest.mock('http', () => ({
    createServer: (cb) => {
        cb(requestMock, responseMock);
        return listenMock;
    }
}));
describe('Server test suite', () => {
    test('should create server on port 8080', () => {
        new Server_1.Server().startServer();
        expect(listenMock.listen).toBeCalledWith(8080);
        expect(responseMock.end).toBeCalled();
    });
    test('should handle login requests', () => {
        requestMock.url = 'http://localhost:8080/login';
        new Server_1.Server().startServer();
        const handleRequestSpy = jest.spyOn(LoginHandler_1.LoginHandler.prototype, 'handleRequest');
        expect(handleRequestSpy).toBeCalled();
        expect(LoginHandler_1.LoginHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer_1.Authorizer));
    });
    test('should handle data requests', () => {
        requestMock.url = 'http://localhost:8080/users';
        new Server_1.Server().startServer();
        expect(DataHandler_1.DataHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer_1.Authorizer), expect.any(UsersDBAccess_1.UsersDBAccess));
        const handleRequestSpy = jest.spyOn(DataHandler_1.DataHandler.prototype, 'handleRequest');
        expect(handleRequestSpy).toBeCalled();
    });
});
//# sourceMappingURL=Server.test.js.map