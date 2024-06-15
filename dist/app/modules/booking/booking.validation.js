"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidations = void 0;
const zod_1 = require("zod");
const booking_constant_1 = require("./booking.constant");
const createBookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        customer: zod_1.z
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .optional(),
        serviceId: zod_1.z.string({
            required_error: 'Service is required',
        }),
        slotId: zod_1.z.string({ required_error: 'Slot is required' }),
        vehicleType: zod_1.z.enum(booking_constant_1.vehicleType),
        vehicleBrand: zod_1.z.string({ required_error: 'Vehicle Brand is required' }),
        vehicleModel: zod_1.z.string({ required_error: 'Vehicle Model is required' }),
        manufacturingYear: zod_1.z.number().int().max(new Date().getFullYear(), {
            message: 'Year cannot be in the future',
        }),
        registrationPlate: zod_1.z.string({
            required_error: 'Registration Plate Model is required',
        }),
    }),
});
exports.BookingValidations = {
    createBookingValidationSchema,
};
