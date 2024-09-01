import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

// Sub variant schema
const variantSchema = new Schema(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }, //disable sub schema _id
);

// Sub inventory schema
const inventorySchema = new Schema(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false }, //disable sub schema _id
);
// Product schema
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
  isDeleted: { type: Boolean, default: false },
});
// Customize the toJSON method to exclude __v
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

// Query Middleware
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// Query Middleware
productSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

// Exclude isDeleted from JSON response
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.isDeleted;
    return ret;
  },
});

export const Product = model<TProduct>('Product', productSchema);
