
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountConditionProductSchema = new mongoose.Schema({
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    discount_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
    },
    discount_rule_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountRule',
    }
}, {
    collection: 'discount_condition_product',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DiscountConditionProduct = mongoose.model('DiscountConditionProduct', discountConditionProductSchema);
export default DiscountConditionProduct;