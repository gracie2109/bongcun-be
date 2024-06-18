
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const comboItemSchema = new mongoose.Schema({
    comboId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Combo',
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services',
    },

}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})
comboItemSchema.plugin(mongooseLeanVirtuals)
comboItemSchema.plugin(mongooseAutoPopulate);

const ComboItemModel = mongoose.model('ComboItem', comboItemSchema);
export default ComboItemModel