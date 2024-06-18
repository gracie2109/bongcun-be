
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';



const servicesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    status: {
        type: Boolean,
        default: true
    },
    desc:{
        type: String,
    },
    serviceTime: Array

}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})
servicesSchema.plugin(mongooseAutoPopulate)
servicesSchema.virtual('total_service_of_pet', {
    localField: '_id',
    foreignField: 'serviceId',
    ref: 'ServiceOfPets',
    count: true,
    justOne: false,
    options: { lean: true }
})

const ServicesModel = mongoose.model('Services', servicesSchema);
export default ServicesModel;
