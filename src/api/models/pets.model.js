
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const petsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true
  },
  status:{
    type: Boolean,
    default: true
  },
  icon:{
    type:String
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: { virtuals: true },
  autoIndex: true
})

petsSchema.plugin(mongooseAutoPopulate);
petsSchema.virtual('totalServiceOfPet', {
  localField: '_id',
  foreignField: 'petId',
  ref: 'ServiceOfPets',
  count: true,
  justOne: false,
  options: { lean: true },
})

const PetsModel = mongoose.model('Pet', petsSchema);
// PetsModel.createIndexes()
export default PetsModel