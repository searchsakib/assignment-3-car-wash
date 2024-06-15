import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { TBooking } from './booking.interface';

const createBooking = catchAsync(async (req, res) => {
  const user = req.user;
  const {
    serviceId: service,
    slotId: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = req.body;

  const modifiedObj: TBooking = {
    service: service,
    slot: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };
  const result = await BookingServices.createBookingIntoDB(modifiedObj, user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'All bookings retrieved successfully',
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.getUserBookingsFromDB(user);
  sendResponse(res, {
    statusCode: !result.length ? httpStatus.NOT_FOUND : httpStatus.OK,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'User bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
