import { Schema, model } from 'mongoose';
import { TService } from './service.interface';

const serviceSchema = new Schema<TService>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

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

export const Service = model<TService>('Service', serviceSchema);
