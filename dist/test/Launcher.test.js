"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("ts-jest/utils");
const Launcher_1 = require("../app/Launcher");
const Server_1 = require("../app/Server/Server");
jest.mock('../app/Server/Server', () => {
    return {
        Server: jest.fn(() => {
            return {
                startServer: () => {
                    console.log('starting fake server!');
                }
            };
        })
    };
});
describe('Launcher test suite', () => {
    const mockedServer = (0, utils_1.mocked)(Server_1.Server, true);
    test('create server', () => {
        new Launcher_1.Launcher();
        expect(mockedServer).toBeCalled();
    });
    test('launch app', () => {
        const launcherAppMock = jest.fn();
        Launcher_1.Launcher.prototype.launchApp = launcherAppMock;
        new Launcher_1.Launcher().launchApp();
        expect(launcherAppMock).toBeCalled();
    });
});
//# sourceMappingURL=Launcher.test.js.map