import { z } from 'zod';
import { vehicleType } from './booking.constant';

const createBookingValidationSchema = z.object({
  body: z.object({
    customer: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional(),
    serviceId: z.string({
      required_error: 'Service is required',
    }),
    slotId: z.string({ required_error: 'Slot is required' }),
    vehicleType: z.enum(vehicleType),
    vehicleBrand: z.string({ required_error: 'Vehicle Brand is required' }),
    vehicleModel: z.string({ required_error: 'Vehicle Model is required' }),
    manufacturingYear: z.number().int().max(new Date().getFullYear(), {
      message: 'Year cannot be in the future',
    }),
    registrationPlate: z.string({
      required_error: 'Registration Plate Model is required',
    }),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
