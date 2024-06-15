"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes2 = exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user'), (0, validateRequest_1.default)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingControllers.createBooking);
router.get('/', (0, auth_1.default)('admin'), booking_controller_1.BookingControllers.getAllBookings);
const router2 = express_1.default.Router();
router2.get('/', (0, auth_1.default)('user'), booking_controller_1.BookingControllers.getUserBookings);
exports.BookingRoutes = router;
exports.BookingRoutes2 = router2;
