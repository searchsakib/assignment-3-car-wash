import { Schema, model } from 'mongoose';
import { TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

//! This is the culprit , so much time went to debug this, now its solution in slot.service.ts
// slotSchema.pre('find', function (next) {
//   this.find({ isBooked: { $ne: 'booked' } });
//   next();
// });

export const Slot = model<TSlot>('Slot', slotSchema);
