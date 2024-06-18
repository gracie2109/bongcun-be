
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const discountConditionCustomerGroupSchema = new mongoose.Schema({
    customer_group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerGroup',
    },
    condition_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DiscountCondition',
    }
}, {
    collection: 'discount_condition_customer_group',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DiscountConditionCustomerGroup = mongoose.model('DiscountConditionCustomerGroup', discountConditionCustomerGroupSchema);
export default DiscountConditionCustomerGroup;