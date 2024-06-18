import 'dotenv/config';
import createHttpError from 'http-errors';
import * as NewsService from '../services/news.service'
import { useCatchAsync } from "../../helpers/useCatchAsync"
import { HttpStatusCode } from '../../configs/statusCode.config'
import { validateEditPost, validateNewPost } from '../validation/news.validation';

// [POST] /api/news/new-post
export const createNewPost = useCatchAsync(async (req, res) => {
    try {
        const { error } = validateNewPost(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }

        const newPost = await NewsService.createNewPostServie(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: newPost,
        });
    } catch (error) {
    
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/news/get-all
export const getAllPost = useCatchAsync(async (req, res) => {
    try {
        const data = await NewsService.getAllPost();
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
// [GET] /api/news/:id
export const getDetailPost = useCatchAsync(async (req, res) => {

    try {
        const data = await NewsService.getOnePost(req.params);
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {
    
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
// [GET] /api/news/:slug
export const getDetailPostBySlug = useCatchAsync(async (req, res) => {

    try {
        const data = await NewsService.getOnePostBySlug(req.params);
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});



//[DELETE] /api/news/:id
export const deletePost= useCatchAsync(async (req, res) => {

    try {
        const data = await NewsService.deletePost(req.params);
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [PATCH] /api/news/:id/edit-post
export const editPost = useCatchAsync(async (req, res) => {
    try {
        const newPost = await NewsService.editPost(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: newPost,
        });
    } catch (error) {
    
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});