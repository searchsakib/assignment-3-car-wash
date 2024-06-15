"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const service_route_1 = require("../modules/service/service.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/services/slots',
        route: slot_route_1.SlotRoutes,
    },
    {
        path: '/slots/availability',
        route: slot_route_1.SlotRoutes2,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/my-bookings',
        route: booking_route_1.BookingRoutes2,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
