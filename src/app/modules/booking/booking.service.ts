import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';
import mongoose from 'mongoose';

const createBookingIntoDB = async (payload: TBooking, user: JwtPayload) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //find user from db
    const customer = await User.findOne({ email: user?.email });
    const customerId = customer?._id;
    //check user is exists or not
    if (!customer) {
      throw new AppError(httpStatus.NOT_FOUND, 'Customer not found');
    }
    //check is service exists or not
    const serviceId: any = payload?.service;
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new AppError(httpStatus.NOT_FOUND, 'Service not found!');
    }
    // check service deleted or not
    if (service.isDeleted) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Unable to book, service is deleted'
      );
    }
    //check slots exists or not
    const isSlotExists = await Slot.findById(payload.slot);
    console.log('Slot ID from payload:', payload.slot);
    if (!isSlotExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Slot not found!!!');
    }
    //check slots is booked or available
    if (isSlotExists.isBooked === 'booked') {
      throw new AppError(httpStatus.NOT_FOUND, 'Slot is already booked!');
    }

    //creating booking- transaction-1
    const booking = await Booking.create(
      [{ ...payload, customer: customerId }],
      { session }
    );

    // Populate the booking
    await booking[0].populate([
      { path: 'customer', model: User },
      { path: 'service', model: Service },
      { path: 'slot', model: Slot },
    ]);

    //updating slot status: transaction-2
    await Slot.findByIdAndUpdate(
      payload.slot,
      { isBooked: 'booked' },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();
    return booking[0];
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('customer')
    .populate('service')
    .populate('slot');
  return !result.length ? [] : result;
};

const getUserBookingsFromDB = async (user: JwtPayload) => {
  const customer = await User.findOne({ email: user?.email });
  const customerId = customer?._id;
  const result = await Booking.find({ customer: customerId })
    .populate('customer')
    .populate('service')
    .populate('slot');
  return !result.length ? [] : result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
};
