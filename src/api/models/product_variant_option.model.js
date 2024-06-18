
import 'dotenv/config'
import mongoose from 'mongoose';



const productVariantOptionSchema = new mongoose.Schema({
    product_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    product_option_id: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductOption',
        }
    ],


}, {
    collection: 'product_variant_option',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ProductVariantOption = mongoose.model('ProductVariantOption', productVariantOptionSchema);
export default ProductVariantOption;