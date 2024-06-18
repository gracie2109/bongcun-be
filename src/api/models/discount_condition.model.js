
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountConditionSchema = new mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    operator: {
        type: Number,
        require: true
    },
    discount_rule_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountRule',
    }

}, {
    collection: 'discount_condition',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DiscountCondition = mongoose.model('DiscountCondition', discountConditionSchema);
export default DiscountCondition;