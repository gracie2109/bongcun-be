
import 'dotenv/config'
import mongoose from 'mongoose'

const servicesOfPetsSchema = new mongoose.Schema({
        petId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services',
        },
        price: {
            type: String
        },
        weightId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Weight',
        }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true, transform: true },
    toObject: { virtuals: true, transform: true },
    autoIndex: true
})


const ServiceOfPets = mongoose.model('ServiceOfPets', servicesOfPetsSchema);
export default ServiceOfPets;