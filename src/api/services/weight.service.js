import WeightModel from "../models/weight.model";
import createHttpError from "http-errors";
import {weights} from '../../constants/weight';


export const createUseDefaultData = async (payload) => {
    try {
        console.log("services", payload)
        const data = await WeightModel.insertMany(payload,{
            ordered: true
        })
        return data
    } catch (error) {
        throw error;
    }
};


export const createWeight = async (payload) => {
    try {
        const data = await WeightModel.insertMany(weights,{
            ordered: true
        })
        return data

    } catch (error) {
        throw error;
    }
}

export const getAllWeight = async () => {
    const data = await WeightModel.find();
    return data
}