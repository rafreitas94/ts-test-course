"use strict";
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
    /* istanbul ignore next */
    static toUpperCase(arg) {
        return arg.toUpperCase();
    }
}
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map