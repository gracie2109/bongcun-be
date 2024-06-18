import createHttpError from 'http-errors';
import mongoose from 'mongoose'

import ServicesModel from "../models/services.model";
import ServiceOfPets from "../models/serviceOfPets";
import PetsModel from "../models/pets.model";
import PusherClient from "../../configs/pusher";
import CategoriesModel from "../models/categories.model";

export const createNewServie = async (payload) => {

    const isServiceExist = await ServicesModel.exists({ name: payload.name });
    if (isServiceExist)   throw createHttpError.BadRequest(`Service cannot be duplicated!`);

    return ServicesModel.create(payload)
};

// export const updateServiceById = async(payload) => {
//     const existService = await ServicesModel.exist({ id: payload.id});
//     if(!existService) throw createHttpError.BadRequest(`Not found service`);
//
//
// }

export const getAllService = async (payload) => {
    try {

        return await ServicesModel
                    .find().populate("total_service_of_pet")
                    // .sort({ createdAt: -1  })
    }catch (error) {
        throw createHttpError.BadRequest("Can't get list services");
    }
}


export const getServiceById = async (payload) => {
    try {
        const id = payload.id;
        if (!id) throw createHttpError.BadRequest(`Id cannot be null!`);
        return await ServicesModel.findOne({ _id: id  }).exec();
    }catch (e) {
        throw createHttpError.NotFound("Service not found!");
    }

};

export const setServicePriceOfPet  = async (payload) => {
    if(payload.data.length > 0) {
        const mapItem = payload.data.map((i) => {
            return {
                weightId:i.weightId,
                price:i.price,
                petId:payload.petId,
                serviceId:payload.serviceId
            }
        });
       await ServiceOfPets.insertMany(mapItem)
    }
}


export const getServiceByPetId = async (payload) => {
    const existPetId = await PetsModel.findOne({ _id: payload.petId });
    if(!existPetId)  throw createHttpError.BadRequest(`PetId cannot be null!`);
    let allServices = await ServiceOfPets
                                        .find({  petId: payload.petId })
                                        .populate('serviceId')
                                        .populate('weightId')
    let check = Object.groupBy(allServices, ({serviceId}) => serviceId._id)
    return {
        petId:existPetId,
        data:check
    }
}

export const updateServicePriceOfPet  = async (payload) => {
   try {
       const bulkOps = payload.map(update => ({
           updateOne: {
               filter: { _id: update.id },
               update: { $set: { price: update.price } },
           }
       }));
       const data =  await ServiceOfPets.bulkWrite(bulkOps);
       await PusherClient.trigger("my-channel", "my-event", {
            message: "Price change now",
        });

       return data
   }catch (e) {
       console.log("updateServicePriceOfPet fail", e);
       throw createHttpError.BadRequest(e);
   }
}


export const getServiceOfAllPets = async () => {
    try {
        const pets = await PetsModel.find();
        if(pets) {
            const servicesByPets = [];
            for (const pet of pets) {
                try {
                    const services = await getServiceByPetId({ petId: pet._id });
                    servicesByPets.push(services);
                } catch (error) {
                    console.error(`Error getting services for pet ${pet._id}:`, error.message);
                }
            }

            return servicesByPets;
        }
    }catch (err)  {
            console.log("getServiceOfAllPets fail", err)
    }
}

















export const getServiceByPetIdNewVersion = async (payload) => {


    const data = await ServiceOfPets.aggregate()
        .match({
            petId: new mongoose.Types.ObjectId(payload.petId)
        })
        .lookup({
            from: 'services',
            localField: 'serviceId',
            foreignField: '_id',
            as: 'services',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name:1
                    },

                }
            ]
        })
        .unwind('$serviceId')
        .lookup({
            from: 'weights',
            localField: 'weightId',
            foreignField: '_id',
            as: 'weights',
            pipeline: [
                {
                    $project: {
                        _id: 1,
                        name:1
                    }
                }
            ]
        })
        .unwind('$weightId')

    return data
}



export const removeService = async (id) => {
    const existedClass = await ServicesModel.findOne({ _id: id }).populate('total_service_of_pet')
    if (!existedClass) throw createHttpError.NotFound('Cannot find class to delete')
    if (existedClass.total_service_of_pet > 0)
        throw createHttpError.Conflict('Cannot delete Service due to there are category in this product !')
    await ServicesModel.deleteOne({ _id: id })
    return {
        message: 'Service has been permanently deleted',
        statusCode: 200
    }
}