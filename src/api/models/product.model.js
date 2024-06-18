
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productSchema = new mongoose.Schema({
    title:{type: String, required: true, unique: true, trim:true},
    subtitle:{type: String},
    description:{type: String},
    handle:{type:String, unique: true},
    status:{type:String, enum: Object.values(productStatus), default: productStatus.DRAFT},
    thumbnail: {type:String},
    material:{type: String},
    discountable:{type:Boolean, default: false},
    width:{type: String},
    height:{type: String},
    weight:{type: String},
    length:{type: String},
    metadata:{type: JSON},
    price:{type:Number},
    inventory_quantity:{type: Number},
    isHasVariant:{type:Boolean, default: false},
    tags:[
        {
            value: String,
            label: String
        }
    ],
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
        default: null
    },
    category_ids:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            default: null

        }
    ,


}, {
    timestamps: true,
    versionKey: false,
    autoIndex: true,
    toJSON: { virtuals: true, transform: true },
    toObject: { virtuals: true, transform: true }
})

// productSchema.virtual('totalVariant', {
//     localField: '_id',
//     foreignField: 'product_id',
//     ref: 'ProductVariant',
//     count: true,
//     justOne: false,
//     options: { lean: true },
// })

const Product = mongoose.model('Product', productSchema);
export default Product;