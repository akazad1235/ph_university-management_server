import { TProduct } from './product.interface';
import { Product } from './product.model';

// store product into DB
const createProductIntoDB = async (productData: TProduct) => {
  //create model instance
  const product = new Product(productData);
  const result = await product.save();
  return result;
};

// get all products
const getAllProductFromDB = async (payload: Record<string, unknown>) => {
  let searchTerm = '';
  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }
  // if searchTerm/query have empty it's get all product otherwise expected products are get.
  const products = await Product.find({
    $or: [{ name: { $regex: `\\b${searchTerm}\\b`, $options: 'i' } }],
  }); // Case-insensitive search
  return products;
};

// get single product
const getSingleProductFromDB = async (productId: string) => {
  const product = await Product.findOne({ _id: Object(productId) });
  if (!product) {
    throw new Error('product not found');
  }
  return product;
};

// update product information
const updateProductFromDB = async (productId: string, updateData: object) => {
  const product = await Product.findByIdAndUpdate(
    { _id: Object(productId) },
    { $set: updateData },
    { new: true },
  );
  return product;
};

//delete product
const deleteProductFromDB = async (productId: string) => {
  const product = await Product.updateOne(
    { _id: Object(productId) },
    { isDeleted: true },
  );
  return product;
};

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
export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
};
