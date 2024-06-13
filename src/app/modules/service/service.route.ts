import express from 'express';
import { ServiceControllers } from './service.controller';
import { ServiceValidations } from './service.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService
);

router.get('/:id', ServiceControllers.getSingleService);

router.get('/', ServiceControllers.getAllServices);

router.put(
  '/:id',
  validateRequest(ServiceValidations.updateServiceValidationSchema),
  ServiceControllers.updateService
);

router.delete('/:id', ServiceControllers.deleteService);

export const ServiceRoutes = router;
