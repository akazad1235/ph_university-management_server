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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// store product into DB
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    //create model instance
    const product = new product_model_1.Product(productData);
    const result = yield product.save();
    return result;
});
// get all products
const getAllProductFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = '';
    if (payload === null || payload === void 0 ? void 0 : payload.searchTerm) {
        searchTerm = payload.searchTerm;
    }
    // if searchTerm/query have empty it's get all product otherwise expected products are get.
    const products = yield product_model_1.Product.find({
        $or: [{ name: { $regex: `\\b${searchTerm}\\b`, $options: 'i' } }],
    }); // Case-insensitive search
    return products;
});
// get single product
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findOne({ _id: Object(productId) });
    if (!product) {
        throw new Error('product not found');
    }
    return product;
});
// update product information
const updateProductFromDB = (productId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndUpdate({ _id: Object(productId) }, { $set: updateData }, { new: true });
    return product;
});
//delete product
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.updateOne({ _id: Object(productId) }, { isDeleted: true });
    return product;
});
//search product
// const searchProductFromDB = async (payload: Record<string, unknown>) => {
//   let searchTerm = '';
//   if (payload?.searchTerm) {
//     searchTerm = payload.searchTerm as string;
//   }
//   const searchAbleFields = ['name'];
//   const searchedProduct = await Product.find({
//     $or: searchAbleFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });
//   return searchedProduct;
// };
// expert all service method
exports.ProductServices = {
    createProductIntoDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
