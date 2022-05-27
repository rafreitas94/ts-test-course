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
exports.Utils = void 0;
const url_1 = require("url");
class Utils {
    static parseUrl(url) {
        if (!url) {
            throw new Error('Empty url!');
        }
        return (0, url_1.parse)(url, true);
    }
    // Dummy object test example
    static getRequestBasePath(req) {
        const url = req.url;
        if (url) {
            const parsedUrl = this.parseUrl(url);
            if (parsedUrl.pathname) {
                return parsedUrl.pathname.split('/')[1];
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    }
    static getRequestBody(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let body = '';
                request.on('data', (data) => {
                    body += data;
                });
                request.on('end', () => {
                    try {
                        resolve(JSON.parse(body));
                    }
                    catch (jsonError) {
                        reject(jsonError);
                    }
                });
                request.on('error', (error) => {
                    reject(error);
                });
            });
        });
    }
}
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map