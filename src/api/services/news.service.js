import slugify from 'slugify';
import NewsModel from './../models/news.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import CustomersModel from "../models/user.model";
import cloudinary from "../../configs/cloudinary";

export const createNewPostServie = async (payload) => {
    const isPostExist = await NewsModel.exists({ name: payload.name });
    if (isPostExist) {
        throw createHttpError.BadRequest(`Post cannot be duplicated!`);
    }

    return await NewsModel.create({
        ...payload,
        slug: slugify(payload.name),
    });
};


export const getAllPost = async (payload) => {
    const data = await NewsModel.find()
    return data
}

export const getOnePost = async (payload) => {
    const id = payload.id;
    if (!id) {
        throw createHttpError.BadRequest(`Id cannot be null!`);
    }

    const data = await NewsModel.findOne({_id: id}).exec();
    if(!data) throw createHttpError.BadRequest(`Object not exist!`);
    return data
}

export const getOnePostBySlug = async (payload) => {
    const {slug} = payload;
    if (!slug) {
        throw createHttpError.BadRequest(`slug cannot be null!`);
    }

    const data = await NewsModel.findOne({slug: slug}).exec();
    if(!data) throw createHttpError.BadRequest(`Object not exist!`);
    return data
}



export const editPost = async (payload) => {
    const existedData = await NewsModel.exists({  _id: payload.id  });
    const postSelected = await NewsModel.findById(payload.id)
    if (!existedData) {
        throw createHttpError.BadRequest(`Not found Object`)
    }
    const {images} = payload;
    const oldImages = postSelected.images;

    await cloudinary.uploader.destroy(oldImages?.[0]?.public_id, { resource_type: 'image' }, async function(result, error) {
        if (error) {
            console.error('Failed to delete image:', error);
        } else {
            console.log('Image deleted successfully:', result);
            return await NewsModel.updateOne({_id: payload.id}, payload,{ new:true})
        }
    });



};


export const deletePost = async (payload) => {
        const data = NewsModel.deleteOne({
            _id: payload.id
        })
        return data

}
