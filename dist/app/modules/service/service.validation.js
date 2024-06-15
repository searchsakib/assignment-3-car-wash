"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const createServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        description: zod_1.z.string({ required_error: 'description is required' }),
        price: zod_1.z.number({ required_error: 'price is required' }),
        duration: zod_1.z.number({
            required_error: 'duration is required',
        }),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const updateServiceValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        duration: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ServiceValidations = {
    createServiceValidationSchema,
    updateServiceValidationSchema,
};
