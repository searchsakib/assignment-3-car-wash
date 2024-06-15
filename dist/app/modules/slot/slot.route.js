"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes2 = exports.SlotRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(slot_validation_1.SlotValidations.createSlotValidationSchema), slot_controller_1.SlotControllers.createSlot);
const router2 = express_1.default.Router();
router2.get('/', slot_controller_1.SlotControllers.getAllAvailableSlot);
exports.SlotRoutes = router;
exports.SlotRoutes2 = router2;
