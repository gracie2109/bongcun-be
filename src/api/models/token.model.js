import mongoose from "mongoose";


const TokenModel = new mongoose.Schema({
    value:{type: String},
    isVerify:{type:Boolean, default: false},
    user_id:{type: mongoose.Types.ObjectId, ref: "Customers"}
}, {
    collection: 'token',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const Token = mongoose.model('Token', TokenModel);
export default Token;