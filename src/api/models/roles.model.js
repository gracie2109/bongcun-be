import mongoose from "mongoose";


const RolesSchema = new mongoose.Schema({
    name: {type: String, required: true,unique: true },
    value:{type: String, required: true,unique: true },
    status:{type:Boolean, default: true},
    permissions:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Permissions"
        }
    ],
    isCanDelete:{
        type:Boolean,
        default: true
    }


}, {
    collection: 'roles',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Roles = mongoose.model('Roles', RolesSchema);
export default Roles;