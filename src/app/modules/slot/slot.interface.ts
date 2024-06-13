import { Types } from 'mongoose';
import { BOOKING_STATUS } from './slot.constant';

export type TBookingStatus = keyof typeof BOOKING_STATUS;

export type TSlot = {
  service: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: TBookingStatus;
};
