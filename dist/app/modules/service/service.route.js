"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.createServiceValidationSchema), service_controller_1.ServiceControllers.createService);
router.get('/:id', service_controller_1.ServiceControllers.getSingleService);
router.get('/', service_controller_1.ServiceControllers.getAllServices);
router.put('/:id', (0, auth_1.default)('admin'), (0, validateRequest_1.default)(service_validation_1.ServiceValidations.updateServiceValidationSchema), service_controller_1.ServiceControllers.updateService);
router.delete('/:id', (0, auth_1.default)('admin'), service_controller_1.ServiceControllers.deleteService);
exports.ServiceRoutes = router;
