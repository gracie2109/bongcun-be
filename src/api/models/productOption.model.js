
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productOptionSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    title:{
        type: String,
        trim:true
    },
    value:{
        type: String,
        trim:true
    },
    metadata:{
        type: JSON
    },

}, {
    collection: 'product_option',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductOption = mongoose.model('ProductOption', productOptionSchema);
export default ProductOption;