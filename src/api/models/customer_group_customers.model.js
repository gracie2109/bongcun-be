
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const customerGroupCustomerSchema = new mongoose.Schema({
   customer_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Customers',
   },
    customer_group_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerGroup',
    }

}, {
    collection: 'customer_group_customers',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const CustomerGroupCustomer = mongoose.model('CustomerGroupCustomer', customerGroupCustomerSchema);
export default CustomerGroupCustomer;