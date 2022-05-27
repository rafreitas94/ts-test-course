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
exports.Server = void 0;
const http_1 = require("http");
const Utils_1 = require("../Utils/Utils");
const LoginHandler_1 = require("../Handlers/LoginHandler");
const DataHandler_1 = require("../Handlers/DataHandler");
const Authorizer_1 = require("../Authorization/Authorizer");
const UsersDBAccess_1 = require("../Data/UsersDBAccess");
class Server {
    constructor() {
        this.authorizer = new Authorizer_1.Authorizer();
        this.usersDBAccess = new UsersDBAccess_1.UsersDBAccess();
    }
    startServer() {
        (0, http_1.createServer)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const basePath = Utils_1.Utils.getRequestBasePath(req);
            switch (basePath) {
                case 'login':
                    yield new LoginHandler_1.LoginHandler(req, res, this.authorizer).handleRequest();
                    break;
                case 'users':
                    yield new DataHandler_1.DataHandler(req, res, this.authorizer, this.usersDBAccess).handleRequest();
                    break;
                default:
                    break;
            }
            res.end();
        })).listen(8080);
        console.log('server started');
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map