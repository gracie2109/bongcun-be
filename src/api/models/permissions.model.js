import mongoose from "mongoose";


const PermissionsSchema = new mongoose.Schema({
    name: {type: String},
    status:{type:Boolean},
    pername: {type: String}

}, {
    collection: 'permissions',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Permissions = mongoose.model('Permissions', PermissionsSchema);
export default Permissions;