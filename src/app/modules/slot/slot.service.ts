import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Service } from '../service/service.model';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlotIntoDB = async (paylod: TSlot) => {
  const service = await Service.findById(paylod?.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service id is not available');
  }

  const serviceDuration = service?.duration;
  const startTimeSlot = paylod?.startTime;
  const endTimeSlot = paylod?.endTime;

  const startTimeInMinutes =
    Number(startTimeSlot.split(':')[0]) * 60 +
    Number(startTimeSlot.split(':')[1]);
  const endTimeInMinutes =
    Number(endTimeSlot.split(':')[0]) * 60 + Number(endTimeSlot.split(':')[1]);

  const totalDurationInMinutes = endTimeInMinutes - startTimeInMinutes;

  const numberOfSlots = Math.ceil(totalDurationInMinutes / serviceDuration);

  //! generating slots
  const timeIntervals = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const start = startTimeInMinutes + i * serviceDuration;
    const end = start + serviceDuration;

    const startTime =
      String(Math.floor(start / 60)).padStart(2, '0') +
      ':' +
      String(start % 60).padStart(2, '0');
    const endTime =
      String(Math.floor(end / 60)).padStart(2, '0') +
      ':' +
      String(end % 60).padStart(2, '0');

    if (end <= endTimeInMinutes) {
      timeIntervals.push({ startTime, endTime });
    }
  }

  const slots = timeIntervals.map((time) => {
    return {
      service: paylod?.service,
      date: paylod?.date,
      startTime: time?.startTime,
      endTime: time?.endTime,
    };
  });

  const result = await Slot.create(slots);
  return result;
};

// const getAllAvailableSlotFromDB = async () => {
//   const result = await Slot.find();
//   return result;
// };

export const SlotService = {
  createSlotIntoDB,
  // getAllAvailableSlotFromDB,
};
