import PetsModel from "../models/pets.model";
import createHttpError from "http-errors";
import NewsModel from "../models/news.model";
import {toSentenceCase} from "../../helpers/toSentenceCase"
import CategoriesModel from "../models/categories.model";
export const createNewPets = async (payload) => {
    try {
        const isPostExist = await PetsModel.exists({ name: payload.name });
        if (isPostExist) {
            throw createHttpError.BadRequest(`Post cannot be duplicated!`);
        }
        const payloadData = {
            ...payload,
            name:toSentenceCase(payload.name)
        }
        return  await PetsModel.create(payloadData);

    }catch (e) {
        console.log("ƯEEE", e)
        throw createHttpError.BadRequest(e);
    }
};

export const getAllPets = async () => {
    const data = await PetsModel.find().populate("totalServiceOfPet")
    return data
}

export const editPets = async(payload) =>{
    const filter =  { _id: payload._id }
    return  await PetsModel.findOneAndUpdate(filter, payload,{new: true, upsert: true});
}

export const deletePet = async (payload) => {
    const existedClass = await PetsModel.findOne({ _id: payload._id }).populate('totalServiceOfPet')
    if (!existedClass) throw createHttpError.NotFound('Cannot find class to delete')
    if (existedClass.totalServiceOfPet > 0)
        throw createHttpError.Conflict('Cannot delete pet due to there are category in this product !')
    await PetsModel.deleteOne({ _id: payload._id })
    return {
        message: 'Category has been permanently deleted',
        statusCode: 200
    }
}

