"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        phone: zod_1.z.string({ required_error: 'Phone Number is required' }),
        role: zod_1.z.nativeEnum(user_constant_1.USER_ROLE),
        address: zod_1.z.string({ required_error: 'Address is required' }),
    }),
});
exports.UserValidations = {
    createUserValidationSchema,
};
