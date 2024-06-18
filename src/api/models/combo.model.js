
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const comboSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    price:{
        type:String,
        required: true
    },
    images:{
        type:Array
    },
    desc: {
        type: String
    },
    status:{
        type: Boolean,
        default: true
    }

}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})
comboSchema.plugin(mongooseLeanVirtuals)
comboSchema.plugin(mongooseAutoPopulate);

const ComboModel = mongoose.model('Combo', comboSchema);
export default ComboModel