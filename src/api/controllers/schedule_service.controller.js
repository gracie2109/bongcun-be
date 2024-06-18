import 'dotenv/config';
import ScheduleService from "../models/schedule_service.model"
import {HttpStatusCode} from "../../configs/statusCode.config";
import ServicesModel from "../models/services.model";
import PetsModel from "../models/pets.model";
import {sendMail} from "../services/mail.service";
import { sendScheduleServiceResponse} from "../../helpers/mailTemplates";

export const bookingScheduleService = async (req, res) => {
    try {
        const service = await ServicesModel.findOne({_id: req.body.services})
        const pet = await PetsModel.findOne({_id: req.body.pet_id});

        const domain = req.protocol + '://' + req.get('host');
        const {timer} = req.body;
        const newDate = `${timer.date.day}/${timer.date.month}/${timer.date.year}`;
        const newTime = `${timer.time.hour}:${timer.time.minute}`;
        const data = {
            email: req.body.customer_mail,
            phoneNumber: req.body.customer_phoneNumber,
            service: service.name,
            pet: pet.name,
            date:newDate,
            time:newTime
        }
        await ScheduleService.create(req.body);
        await sendMail(
            sendScheduleServiceResponse({
                redirectDomain: domain,
                data: data,
            })
        )

        return res.status(HttpStatusCode.OK).json({
            message: "Please check mail",
            data: data
        })


    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
};


export const allScheduleService = async(req, res) => {
    try {
            const data = await ScheduleService.find()
                .populate("pet_id", "name")
                .populate("services", "name")
                .exec();


            const date = req.params;

            const transformedData = data.map(item => {
                return {
                    ...item.toObject(),
                    serviceData: item.services,
                    services: item.services._id,
                    dateString: `${item.timer.date.day}/${item.timer.date.month}/${item.timer.date.year}` ,
                    timeString: `${item.timer.time.hour}:${item.timer.time.minute}`
                };
            });

        return res.status(HttpStatusCode.OK).json({
                message: "GET SUCCESS!",
                data: transformedData,
                date:date
            })
    }catch (e) {
        console.log("errr",e);
        throw  e
    }
}