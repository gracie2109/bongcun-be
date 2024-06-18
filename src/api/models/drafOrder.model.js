
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const draftOrderSchema = new mongoose.Schema({


}, {
     collection: 'draft_order',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const DraftOrder = mongoose.model('Images', draftOrderSchema);
export default DraftOrder;