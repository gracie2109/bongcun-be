
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const customerGroupSchema = new mongoose.Schema({
    name: {
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
    collection: 'customer_group',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const CustomerGroup = mongoose.model('CustomerGroup', customerGroupSchema);
export default CustomerGroup;