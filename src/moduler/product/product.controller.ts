import { NextFunction, Request, Response } from 'express';
import { ProductServices } from './product.service';
import { validateProductSchema } from './product.validate';

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const formData = req.body;
    const validateData = validateProductSchema.parse(formData);
    const result = await ProductServices.createProductIntoDB(validateData);
    res.status(200).json({
      success: true,
      message: 'Product has been created successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// get all products
const getAllProducts = async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductFromDB(req.query);
  try {
    res.status(200).json({
      success: true,
      message: 'All Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};
// get single product by product id
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    const result = await ProductServices.updateProductFromDB(
      productId,
      updateData,
    );
    res.status(200).json({
      success: true,
      message: 'Product update successfully!',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};
// update single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);
  try {
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: 'Something went wrong!',
      data: err,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
