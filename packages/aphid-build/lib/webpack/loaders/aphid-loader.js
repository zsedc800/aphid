"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../index.d.ts"/>
const loader_utils_1 = require("loader-utils");
const traverse_1 = __importDefault(require("@babel/traverse"));
// import t from '@babel/types';
const parser_1 = require("@babel/parser");
const generator_1 = __importDefault(require("@babel/generator"));
function default_1(source) {
    return source;
    console.log(source, 'source====');
    const callback = this.async();
    const query = loader_utils_1.getOptions(this);
    console.log(query, 'query+==');
    const ast = parser_1.parse(source);
    traverse_1.default(ast, {
        enter: (path) => { },
    });
    const output = generator_1.default(ast, source);
    console.log(output);
    callback(null, output.code);
}
exports.default = default_1;
