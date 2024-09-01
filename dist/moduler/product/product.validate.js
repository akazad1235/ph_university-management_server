"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductSchema = void 0;
const zod_1 = require("zod");
//  variant sub schema
const validateVariantSchema = zod_1.z.object({
    type: zod_1.z.string().nonempty({ message: 'Variant type is required.' }),
    value: zod_1.z.string().nonempty({ message: 'Variant value is required.' }),
});
//  inventory sub schema
const validateInventorySchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .nonnegative({ message: 'Quantity must be a non-negative integer.' }),
    inStock: zod_1.z.boolean({ message: 'InStock must be a boolean value.' }),
});
// the product validate schema
exports.validateProductSchema = zod_1.z.object({
    name: zod_1.z.string().nonempty({ message: 'Product name is required.' }),
    description: zod_1.z
        .string()
        .nonempty({ message: 'Product description is required.' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number.' }),
    category: zod_1.z.string().nonempty({ message: 'Product category is required.' }),
    tags: zod_1.z
        .array(zod_1.z.string())
        .nonempty({ message: 'At least one tag is required.' }),
    variants: zod_1.z
        .array(validateVariantSchema)
        .nonempty({ message: 'At least one variant is required.' }),
    inventory: validateInventorySchema,
    isDeleted: zod_1.z.boolean().default(false),
});
