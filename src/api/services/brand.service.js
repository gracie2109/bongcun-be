import BrandModel from "../models/brands.model";
import createHttpError from "http-errors";
import slugify from "slugify";

export const createNewBrand = async (payload) => {
    const isPostExist = await BrandModel.exists({ name: payload.name });
    if (isPostExist) {
        throw createHttpError.BadRequest(`Post cannot be duplicated!`);
    }

    return await BrandModel.create({
        ...payload,
        slug: slugify(payload.name),
    });
};
export const getAllBrands = async () => {
    const data =  await BrandModel.find({});
    return data
};


export const getOneBrand = async (payload) => {
    const isPostExist = await BrandModel.exists({ _id: payload.id });
    if (!isPostExist) {
        throw createHttpError.BadRequest(`Not found brand!`);
    }
    const data = await BrandModel.findOne({_id: payload.id});
    return data

}
export const updateBrand = async (payload) => {
    const isPostExist = await BrandModel.exists({ _id: payload.id });
    if (!isPostExist) {
        throw createHttpError.BadRequest(`Not found brand!`);
    }
    const data = await BrandModel.updateOne({_id: payload.id}, payload, {new: true});
    return data

}
