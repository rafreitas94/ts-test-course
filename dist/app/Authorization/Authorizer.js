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
exports.Authorizer = void 0;
const SessionTokenDBAccess_1 = require("./SessionTokenDBAccess");
const ServerModels_1 = require("../Models/ServerModels");
const UserCredentialsDbAccess_1 = require("./UserCredentialsDbAccess");
class Authorizer {
    constructor(sessionTokenDBAccess = new SessionTokenDBAccess_1.SessionTokenDBAccess, userCredentialsDBAccess = new UserCredentialsDbAccess_1.UserCredentialsDbAccess) {
        this.sessionTokenDBAccess = sessionTokenDBAccess;
        this.userCredentialsDBAccess = userCredentialsDBAccess;
    }
    generateToken(account) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultAccount = yield this.userCredentialsDBAccess.getUserCredential(account.username, account.password);
            if (resultAccount) {
                const token = {
                    accessRights: resultAccount.accessRights,
                    expirationTime: this.generateExpirationTime(),
                    userName: resultAccount.username,
                    valid: true,
                    tokenId: this.generateRandomTokenId()
                };
                yield this.sessionTokenDBAccess.storeSessionToken(token);
                return token;
            }
            else {
                return null;
            }
        });
    }
    validateToken(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.sessionTokenDBAccess.getToken(tokenId);
            if (!token || !token.valid) {
                return {
                    accessRights: [],
                    state: ServerModels_1.TokenState.INVALID
                };
            }
            else if (token.expirationTime < new Date()) {
                return {
                    accessRights: [],
                    state: ServerModels_1.TokenState.EXPIRED
                };
            }
            return {
                accessRights: token.accessRights,
                state: ServerModels_1.TokenState.VALID
            };
        });
    }
    generateExpirationTime() {
        return new Date(Date.now() + 60 * 60 * 1000);
    }
    generateRandomTokenId() {
        return Math.random().toString(36).slice(2);
    }
}
exports.Authorizer = Authorizer;
//# sourceMappingURL=Authorizer.js.map