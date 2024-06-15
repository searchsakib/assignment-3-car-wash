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
exports.BookingServices = void 0;
const booking_model_1 = require("./booking.model");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const service_model_1 = require("../service/service.model");
const slot_model_1 = require("../slot/slot.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createBookingIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //find user from db
        const customer = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
        const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
        //check user is exists or not
        if (!customer) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Customer not found');
        }
        //check is service exists or not
        const serviceId = payload === null || payload === void 0 ? void 0 : payload.service;
        const service = yield service_model_1.Service.findById(serviceId);
        if (!service) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
        }
        // check service deleted or not
        if (service.isDeleted) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to book, service is deleted');
        }
        //check slots exists or not
        const isSlotExists = yield slot_model_1.Slot.findById(payload.slot);
        console.log('Slot ID from payload:', payload.slot);
        if (!isSlotExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Slot not found!!!');
        }
        //check slots is booked or available
        if (isSlotExists.isBooked === 'booked') {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Slot is already booked!');
        }
        //creating booking- transaction-1
        const booking = yield booking_model_1.Booking.create([Object.assign(Object.assign({}, payload), { customer: customerId })], { session });
        //updating slot status: transaction-2
        yield slot_model_1.Slot.findByIdAndUpdate(payload.slot, { isBooked: 'booked' }, { new: true, session });
        yield session.commitTransaction();
        // Populate the booking
        const populatedBooking = yield booking_model_1.Booking.findById(booking[0]._id)
            .populate('customer')
            .populate('service')
            .populate('slot');
        yield session.endSession();
        return populatedBooking;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find()
        .populate({
        path: 'customer',
        select: '-role -createdAt -updatedAt',
    })
        .populate({
        path: 'service',
        select: '-createdAt -updatedAt',
    })
        .populate({
        path: 'slot',
        select: '-createdAt -updatedAt',
    });
    return !result.length ? [] : result;
});
const getUserBookingsFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield user_model_1.User.findOne({ email: user === null || user === void 0 ? void 0 : user.email });
    const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
    const result = yield booking_model_1.Booking.find({ customer: customerId })
        .populate({
        path: 'service',
        select: '-createdAt -updatedAt',
    })
        .populate({
        path: 'slot',
        select: '-createdAt -updatedAt',
    })
        .select('-customer');
    return !result.length ? [] : result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
};
