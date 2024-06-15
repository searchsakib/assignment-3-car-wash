"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slot = void 0;
const mongoose_1 = require("mongoose");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
    versionKey: false,
});
//! This is the culprit , so much time went to debug this, now its solution in slot.service.ts
// slotSchema.pre('find', function (next) {
//   this.find({ isBooked: { $ne: 'booked' } });
//   next();
// });
exports.Slot = (0, mongoose_1.model)('Slot', slotSchema);
