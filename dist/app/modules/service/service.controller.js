"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const service_service_1 = require("./service.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.createServiceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Service created successfully',
        data: result,
    });
}));
const getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.getSingleServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: result ? true : false,
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result ? 'Service retrieved successfully' : 'No Data Found',
        data: result,
    });
}));
const getAllServices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.getAllServicesFromDB();
    (0, sendResponse_1.default)(res, {
        success: result.length ? true : false,
        statusCode: result.length ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result.length
            ? 'Services retrieved successfully'
            : 'No Data Found',
        data: result,
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.updateServiceIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        success: result ? true : false,
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result ? 'Service updated successfully' : 'No Data Found',
        data: result,
    });
}));
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.deleteServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: result ? true : false,
        statusCode: result ? http_status_1.default.OK : http_status_1.default.NOT_FOUND,
        message: result ? 'Service deleted successfully' : 'No Data Found',
        data: result,
    });
}));
exports.ServiceControllers = {
    createService,
    getSingleService,
    getAllServices,
    updateService,
    deleteService,
};
