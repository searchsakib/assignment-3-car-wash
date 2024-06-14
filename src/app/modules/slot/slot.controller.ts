import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Slot } from './slot.model';
import { SlotService } from './slot.service';

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotService.createSlotIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Slots created successfully',
    data: result,
  });
});

const getAllAvailableSlot = catchAsync(async (req, res) => {
  const result = await SlotService.getAllAvailableSlotFromDB(req.query);
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length
      ? 'Available slots retrieved successfully'
      : 'No Data Found',
    data: result,
  });
});

export const SlotControllers = {
  createSlot,
  getAllAvailableSlot,
};
