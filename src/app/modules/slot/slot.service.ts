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
    Number(startTimeSlot.split(':')[0]) * serviceDuration +
    Number(startTimeSlot.split(':')[1]);
  const endTimeInMinutes =
    Number(endTimeSlot.split(':')[0]) * serviceDuration +
    Number(endTimeSlot.split(':')[1]);

  const totalDurationInMinutes = endTimeInMinutes - startTimeInMinutes;

  const numberOfSlots = totalDurationInMinutes / serviceDuration;

  //! generating slots
  const timeIntervals: {
    startTime: string;
    endTime: string;
  }[] = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const startTime =
      (Number(startTimeSlot.split(':')[0]) + i).toString() + ':00';
    const endTime =
      (Number(endTimeSlot.split(':')[0]) - (numberOfSlots - 1) + i).toString() +
      ':00';

    timeIntervals.push({ startTime, endTime });
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
