import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ServiceRoutes } from '../modules/service/service.route';
import { SlotRoutes, SlotRoutes2 } from '../modules/slot/slot.route';
import {
  BookingRoutes,
  BookingRoutes2,
} from '../modules/booking/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/services/slots',
    route: SlotRoutes,
  },
  {
    path: '/slots/availability',
    route: SlotRoutes2,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/my-bookings',
    route: BookingRoutes2,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
