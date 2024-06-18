
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import CustomersModel from "./user.model";

const weightSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  value:{
    type:String,
    unique: true
  }

}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})
weightSchema.plugin(mongooseLeanVirtuals)
weightSchema.plugin(mongooseAutoPopulate);

const WeightsModel = mongoose.model('Weight', weightSchema)
export default WeightsModel