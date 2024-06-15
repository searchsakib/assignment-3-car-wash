import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';
import { vehicleType } from './booking.constant';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    slot: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    vehicleType: {
      type: String,
      enum: vehicleType,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Booking = model<TBooking>('Booking', bookingSchema);
