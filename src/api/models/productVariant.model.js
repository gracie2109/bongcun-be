
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productVariantSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    product_variant_option_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariantOption',
    },
    title:{  type:String,  required: true  },
    sku:{type:String},
    barcode:{type:String},
    ean: {type:String},
    upc: {type:String},
    inventory_quantity:{type: Number},
    material: {type:String},
    weight: {type:String},
    length: {type:String},
    height: {type:String},
    width: {type:String},
    metadata:{type:JSON},
    price:{type:Number}

}, {
    collection: 'product_variant',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);
export default ProductVariant;