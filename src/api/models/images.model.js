
import 'dotenv/config'
import mongoose from 'mongoose'
import {productStatus} from "../../constants/product"
const ImageSchema = new mongoose.Schema({
    url: {type: String, require: true},

}, {
    // collection: 'images',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Images = mongoose.model('Images', ImageSchema);
export default Images;