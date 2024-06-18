import {scheduleStatus} from "../../constants/schedule"
import 'dotenv/config'
import mongoose from 'mongoose';
const scheduleServiceSchema = new mongoose.Schema({
   customer_mail:{
       type: String
   },
    customer_phoneNumber: {
       type: String,
    },
    services:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services',
            default: null
        }
    ,
    pet_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        default: null
    },
    customer_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers',
        default: null
    },
    status:{
       type: String,
        enum: Object.values(scheduleStatus),
        default: scheduleStatus.BOOKING
    },
    timer:{
       type: JSON
    }
}, {
    collection: 'schedule_service',
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    autoIndex: true
})


const ScheduleService = mongoose.model('ScheduleService', scheduleServiceSchema);
export default ScheduleService;