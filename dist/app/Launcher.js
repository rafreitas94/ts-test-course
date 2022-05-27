"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Launcher = void 0;
const Server_1 = require("./Server/Server");
class Launcher {
    constructor() {
        this.server = new Server_1.Server();
    }
    launchApp() {
        this.server.startServer();
    }
}
exports.Launcher = Launcher;
new Launcher().launchApp();
//# sourceMappingURL=Launcher.js.map