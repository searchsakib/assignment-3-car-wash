import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

export const SlotRoutes = router;
