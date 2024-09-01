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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validate_1 = require("./product.validate");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const validateData = product_validate_1.validateProductSchema.parse(formData);
        const result = yield product_service_1.ProductServices.createProductIntoDB(validateData);
        res.status(200).json({
            success: true,
            message: 'Product has been created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.ProductServices.getAllProductFromDB(req.query);
    try {
        res.status(200).json({
            success: true,
            message: 'All Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: 'Something went wrong!',
            data: err,
        });
    }
});
// get single product by product id
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// update single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductServices.updateProductFromDB(productId, updateData);
        res.status(200).json({
            success: true,
            message: 'Product update successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: 'Something went wrong!',
            data: err,
        });
    }
});
// update single product
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const result = yield product_service_1.ProductServices.deleteProductFromDB(productId);
    try {
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: 'Something went wrong!',
            data: err,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
