import bcrypt, { genSaltSync } from 'bcrypt'
import 'dotenv/config'
import mongoose from 'mongoose'
import mongooseAutoPopulate from 'mongoose-autopopulate'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'
import {customersGender, customersRole, customerStatus} from "../../constants/customers"

const customerSchema = new mongoose.Schema({
    email:{
        type: String,
        trim:true,
        unique: true,
        required:true
    },
    phoneNumber:{
        type: String,

    },
    password:{
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
        enum: Object.values(customersGender)
    },
    images:{
        type: Array
    },
    bio:{
        type: String,
        require: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        require: false
    },
    socials:{
        type:Array,
        require: false
    },
    status:{
        type: String,
        enum: Object.values(customerStatus),
        default: customerStatus.ACTIVE
    },
    employmentStatus:{
        type: Boolean,
        default: false
    },
    roles:[
        {
           type: mongoose.Types.ObjectId, ref:"Roles", required: false
        }
    ]

},{
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


customerSchema.methods.verifyPassword = function (password) {
	if (!password) return false
	return bcrypt.compareSync(password, this.password)
}

customerSchema.pre('save', function (next) {
	if (this.password) {
		this.password = bcrypt.hashSync(this.password, genSaltSync(+process.env.SALT_ROUND))
	}
	next()
})
customerSchema.plugin(mongooseLeanVirtuals)
customerSchema.plugin(mongooseAutoPopulate)




const CustomersModel = mongoose.model('Customers', customerSchema)
export default CustomersModel