"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const fn = () => 'foo';
(0, ava_1.default)('fn() returns foo', (t) => {
    t.is(fn(), 'foo');
});
