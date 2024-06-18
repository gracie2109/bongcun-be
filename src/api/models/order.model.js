
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const OrderSchema = new mongoose.Schema({
    status:{
        type: Number
    },
    total_price:{
        type: String,
    },
    txnRef:{
        type:String
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})

OrderSchema.plugin(mongooseAutoPopulate);


const PetsModel = mongoose.model('Order', OrderSchema);
// PetsModel.createIndexes()
export default PetsModel