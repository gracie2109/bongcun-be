
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountRuleSchema = new mongoose.Schema({
    desc: {
        type: String
    },
    type: {
        type: String,
        require: true,
    },
    value: {
        type: Number,
        require: true
    },
    allocation:{
        type: String
    },
}, {
     collection: 'discount_rule',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DiscountRule = mongoose.model('DiscountRule', discountRuleSchema);
export default DiscountRule;