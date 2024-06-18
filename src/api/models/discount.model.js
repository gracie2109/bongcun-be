
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
import {customersGender} from "../../constants/customers";
import {discount_conditions} from "../../constants/discount";
const discountSchema = new mongoose.Schema({
   code:{
       type: String,
       require:true
   },
    desc:{
     type: String
    },
    discount_rule_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountRule',
    },
    is_disable: {
        type: Boolean
    },
    starts_at:{
       type: JSON
    },
    ends_at:{
       type: JSON
    },
    usage_limit:{
       type: JSON,
        require: true
    },
    usage_count:{
        type: Number,
        default: 0
    },
    condition_option: {
       type: String,
        enum: Object.values(discount_conditions)
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Discount = mongoose.model('Discount', discountSchema);
export default Discount;