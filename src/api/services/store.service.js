import createHttpError from "http-errors";
import NewsModel from "../models/news.model";
import {toSentenceCase} from "../../helpers/toSentenceCase";
import StoreModel from "../models/store.model";


export const createNewStore = async (payload) => {
    const payloadData = {
        ...payload,
        name:toSentenceCase(payload.name)
    }
    return  await StoreModel.create(payloadData);

};

export const getStore = async () => {
    const data =   await StoreModel.find();
    return data
};

export const editStore = async (payload) => {
    const existStore =   await StoreModel.exists({_id: payload.id});
    if(!existStore) {
        throw createHttpError.BadRequest(`Not found store!`);
    }
    const data =  await StoreModel.updateOne(
        {
            _id: payload.id
        },
        {
            $set: payload
        },
        {
            new: true
        }
        )
    return data

};