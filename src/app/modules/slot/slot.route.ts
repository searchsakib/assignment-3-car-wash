import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';

const router = express.Router();
const router2 = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot
);

router2.get('/', SlotControllers.getAllAvailableSlot);

export const SlotRoutes = router;
export const SlotRoutes2 = router2;
