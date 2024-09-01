"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./moduler/product/product.route");
const zod_1 = __importDefault(require("zod"));
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
//call only product routes
app.use('/api/products', product_route_1.ProductRoutes);
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'server connected success',
            data: null,
        });
    }
    catch (error) {
        res.status(200).json({
            success: false,
            message: error,
            data: null,
        });
    }
});
//route not fund handler
app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
app.use((error, req, res, next) => {
    if (error instanceof zod_1.default.ZodError) {
        // If it's a Zod validation error
        res.status(400).json({
            success: false,
            message: error.errors, // Detailed validation errors
        });
    }
    else {
        res.status(400).json({
            success: false,
            message: error.message || 'something not working',
        });
    }
    next();
});
exports.default = app;
