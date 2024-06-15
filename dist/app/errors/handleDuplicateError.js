"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const errorSources = [
        {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: err === null || err === void 0 ? void 0 : err.message,
        errorMessages: errorSources,
    };
};
exports.default = handleDuplicateError;
