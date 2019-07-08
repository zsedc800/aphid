"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (middlewares) => {
    const { length } = middlewares;
    return (ctx, next) => {
        let i = 0;
        console.log('start core middleware');
        const itNext = (ctx) => {
            if (i >= length)
                return next();
            const middleware = middlewares[i];
            i++;
            return middleware(ctx, itNext);
        };
        return itNext(ctx);
    };
};
var fetch_1 = require("./fetch");
exports.FetchMiddleware = fetch_1.default;
var render_1 = require("./render");
exports.RenderMiddleware = render_1.default;
var route_1 = require("./route");
exports.RouteMiddleware = route_1.default;
