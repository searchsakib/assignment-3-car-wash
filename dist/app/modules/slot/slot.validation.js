"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
const zod_1 = require("zod");
const createSlotValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string({ required_error: 'Service is required' }),
        date: zod_1.z.string({ required_error: 'Date is required' }).date(),
        startTime: zod_1.z.string({ required_error: 'Start Time is required' }),
        endTime: zod_1.z.string({ required_error: 'End Time is required' }),
        isBooked: zod_1.z.enum(['available', 'booked', 'canceled']).optional(),
    }),
});
exports.SlotValidations = {
    createSlotValidationSchema,
};
