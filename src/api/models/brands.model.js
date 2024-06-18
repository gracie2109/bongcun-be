
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';


const brandsSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    images: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        lowercase: true,
    },
    desc: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})
brandsSchema.plugin(mongooseLeanVirtuals)
brandsSchema.plugin(mongooseAutoPopulate);

const BrandsModel = mongoose.model('Brands', brandsSchema);
export default BrandsModel