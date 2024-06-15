"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("./slot.model");
const createSlotIntoDB = (paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(paylod === null || paylod === void 0 ? void 0 : paylod.service);
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service id is not available');
    }
    const serviceDuration = service === null || service === void 0 ? void 0 : service.duration;
    const startTimeSlot = paylod === null || paylod === void 0 ? void 0 : paylod.startTime;
    const endTimeSlot = paylod === null || paylod === void 0 ? void 0 : paylod.endTime;
    const startTimeInMinutes = Number(startTimeSlot.split(':')[0]) * 60 +
        Number(startTimeSlot.split(':')[1]);
    const endTimeInMinutes = Number(endTimeSlot.split(':')[0]) * 60 + Number(endTimeSlot.split(':')[1]);
    const totalDurationInMinutes = endTimeInMinutes - startTimeInMinutes;
    const numberOfSlots = Math.ceil(totalDurationInMinutes / serviceDuration);
    //! generating slots
    const timeIntervals = [];
    for (let i = 0; i < numberOfSlots; i++) {
        const start = startTimeInMinutes + i * serviceDuration;
        const end = start + serviceDuration;
        const startTime = String(Math.floor(start / 60)).padStart(2, '0') +
            ':' +
            String(start % 60).padStart(2, '0');
        const endTime = String(Math.floor(end / 60)).padStart(2, '0') +
            ':' +
            String(end % 60).padStart(2, '0');
        if (end <= endTimeInMinutes) {
            timeIntervals.push({ startTime, endTime });
        }
    }
    const slots = timeIntervals.map((time) => {
        return {
            service: paylod === null || paylod === void 0 ? void 0 : paylod.service,
            date: paylod === null || paylod === void 0 ? void 0 : paylod.date,
            startTime: time === null || time === void 0 ? void 0 : time.startTime,
            endTime: time === null || time === void 0 ? void 0 : time.endTime,
        };
    });
    const result = yield slot_model_1.Slot.create(slots);
    return result;
});
const getAllAvailableSlotFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = {};
    if (query === null || query === void 0 ? void 0 : query.date) {
        queryObj.date = query.date;
    }
    if (query === null || query === void 0 ? void 0 : query.serviceId) {
        queryObj.service = query.serviceId;
    }
    queryObj.isBooked = { $ne: 'booked' };
    const result = yield slot_model_1.Slot.find(queryObj).populate('service');
    return result;
});
exports.SlotService = {
    createSlotIntoDB,
    getAllAvailableSlotFromDB,
};
