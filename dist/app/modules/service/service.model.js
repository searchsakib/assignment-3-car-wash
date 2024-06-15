"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    versionKey: false,
});
//! Prevents from getAllServicesFromDB to access the deleted data
serviceSchema.pre('find', function () {
    this.find({ isDeleted: { $ne: true } });
});
//! Prevents from getSingleServiceFromDB to access the deleted data
serviceSchema.pre('findOne', function () {
    this.find({ isDeleted: { $ne: true } });
});
//! Prevents from updateServiceIntoDB to access the deleted data
serviceSchema.pre('findOneAndUpdate', function () {
    this.find({ isDeleted: { $ne: true } });
});
//! Prevents from deleteServiceFromDB to access the deleted data
serviceSchema.pre('findOneAndDelete', function () {
    this.find({ isDeleted: { $ne: true } });
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
