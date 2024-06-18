
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    status:{
        type: Boolean
    },
    desc:{
        type:String
    },
    logo:{
        type: Array,
        default: []
    },
    favicon: {
        type: Array,
        default: []
    },
    address:{
        type: String
    },
    map: {
        type: String
    },
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})
storeSchema.plugin(mongooseLeanVirtuals)
storeSchema.plugin(mongooseAutoPopulate);

const PetsModel = mongoose.model('Store', storeSchema);
export default PetsModel