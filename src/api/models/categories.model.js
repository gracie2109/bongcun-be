
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseDelete from 'mongoose-delete'

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    children:{
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true
})
categoriesSchema.plugin(mongooseLeanVirtuals)
categoriesSchema.plugin(mongooseAutoPopulate);

categoriesSchema.plugin(mongooseDelete, {
    overrideMethods: ['find', 'findOne'],
    deletedAt: true
});
categoriesSchema.virtual('totalProduct', {
    localField: '_id',
    foreignField: 'category_id',
    ref: 'Product',
    count: true,
    justOne: false,
    options: { lean: true }
})




const CategoriesModel = mongoose.model('Categories', categoriesSchema);
export default CategoriesModel