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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionTokenDBAccess = void 0;
const nedb_1 = __importDefault(require("nedb"));
class SessionTokenDBAccess {
    constructor(nedb = new nedb_1.default('databases/sessionToken.db')) {
        this.nedb = nedb;
        this.nedb.loadDatabase();
    }
    storeSessionToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.nedb.insert(token, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    getToken(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.nedb.find({ tokenId: tokenId }, (err, docs) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (docs.length == 0) {
                            resolve(undefined);
                        }
                        else {
                            resolve(docs[0]);
                        }
                    }
                });
            });
        });
    }
}
exports.SessionTokenDBAccess = SessionTokenDBAccess;
//# sourceMappingURL=SessionTokenDBAccess.js.map