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
exports.DataHandler = void 0;
const ServerModels_1 = require("../Models/ServerModels");
const Utils_1 = require("../Utils/Utils");
class DataHandler {
    constructor(request, response, tokenValidator, usersDBAccess) {
        this.request = request;
        this.response = response;
        this.tokenValidator = tokenValidator;
        this.usersDBAccess = usersDBAccess;
    }
    handleRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.request.method) {
                case ServerModels_1.HTTP_METHODS.OPTIONS:
                    yield this.handleOptions();
                    break;
                case ServerModels_1.HTTP_METHODS.GET:
                    yield this.handleGet();
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
    handleGet() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const operationAuthorized = yield this.operationAuthorized(ServerModels_1.AccessRight.READ);
                if (operationAuthorized) {
                    const parsedUrl = Utils_1.Utils.parseUrl(this.request.url);
                    if (parsedUrl.query.name) {
                        const users = yield this.usersDBAccess.getUsersByName(parsedUrl.query.name);
                        this.response.writeHead(ServerModels_1.HTTP_CODES.OK, { 'Content-Type': 'application/json' });
                        this.response.write(JSON.stringify(users));
                    }
                    else {
                        this.response.statusCode = ServerModels_1.HTTP_CODES.BAD_REQUEST;
                        this.response.write('Missing name parameter in the request!');
                    }
                }
                else {
                    this.response.statusCode = ServerModels_1.HTTP_CODES.UNAUTHORIZED;
                    this.response.write('Unauthorized operation!');
                }
            }
            catch (error) {
                this.response.statusCode = ServerModels_1.HTTP_CODES.INTERNAL_SERVER_ERROR;
                this.response.write('Internal error: ' + error.message);
            }
        });
    }
    operationAuthorized(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenId = this.request.headers.authorization;
            if (tokenId) {
                const tokenRights = yield this.tokenValidator.validateToken(tokenId);
                if (tokenRights.accessRights.includes(operation)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        });
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map