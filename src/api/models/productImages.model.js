
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const productImageSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    image_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images',
    }
}, {
    collection: 'product_image',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductImage = mongoose.model('ProductImage', productImageSchema);
export default ProductImage;