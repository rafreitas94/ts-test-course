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
exports.LoginHandler = void 0;
const Utils_1 = require("../Utils/Utils");
const ServerModels_1 = require("../Models/ServerModels");
class LoginHandler {
    constructor(request, response, authorizer) {
        this.request = request;
        this.response = response;
        this.authorizer = authorizer;
    }
    handleRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.request.method) {
                case ServerModels_1.HTTP_METHODS.OPTIONS:
                    yield this.handleOptions();
                    break;
                case ServerModels_1.HTTP_METHODS.POST:
                    yield this.handlePost();
                    break;
                default:
                    break;
            }
        });
    }
    handleOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            this.response.writeHead(ServerModels_1.HTTP_CODES.OK);
        });
    }
    handlePost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestBody = yield Utils_1.Utils.getRequestBody(this.request);
                const token = yield this.authorizer.generateToken(requestBody);
                if (token) {
                    this.response.statusCode = ServerModels_1.HTTP_CODES.CREATED;
                    this.response.writeHead(ServerModels_1.HTTP_CODES.CREATED, { 'Content-Type': 'application/json' });
                    this.response.write(JSON.stringify(token));
                }
                else {
                    this.response.statusCode = ServerModels_1.HTTP_CODES.NOT_fOUND;
                    this.response.write('wrong username or password');
                }
            }
            catch (error) {
                this.response.statusCode = ServerModels_1.HTTP_CODES.INTERNAL_SERVER_ERROR;
                this.response.write('Internal error: ' + error.message);
            }
        });
    }
}
exports.LoginHandler = LoginHandler;
//# sourceMappingURL=LoginHandler.js.map