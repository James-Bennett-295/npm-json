"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonc = exports.parseJsonc = exports.stripComments = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
function stripComments(jsonc) {
    let json = "";
    for (let i = 0; i < jsonc.length; i++) {
        if (jsonc[i] === `"`) {
            json += jsonc[i];
            while (i + 1 < jsonc.length && jsonc[++i] !== `"`)
                json += jsonc[i];
            json += jsonc[i];
            continue;
        }
        if (jsonc[i] === '/') {
            if (jsonc[++i] === '*') {
                while (1) {
                    if (i > jsonc.length) {
                        throw "JSONC contains unterminated multi-line comment";
                    }
                    if (jsonc[++i] === '*' && jsonc[i + 1] === '/')
                        break;
                }
                i++;
            }
            else {
                while (i < jsonc.length && jsonc[++i] !== '\n')
                    ;
                if (jsonc[i] === '\n')
                    json += "\n";
            }
            continue;
        }
        json += jsonc[i];
    }
    return json;
}
exports.stripComments = stripComments;
function parseJsonc(jsonc) {
    return JSON.parse(stripComments(jsonc));
}
exports.parseJsonc = parseJsonc;
function readJsonc(path) {
    return parseJsonc(node_fs_1.default.readFileSync(path, { encoding: "utf-8" }));
}
exports.readJsonc = readJsonc;
