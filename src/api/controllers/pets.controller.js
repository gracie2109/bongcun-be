import 'dotenv/config';
import createHttpError from 'http-errors';
import * as PetsService from '../services/pets.service'
import { useCatchAsync } from "../../helpers/useCatchAsync"
import { HttpStatusCode } from '../../configs/statusCode.config'
import { validateNewPets , validateEditPets, validateDetailPets} from '../validation/pets.validation';
import * as NewsService from "../services/news.service";
import {deletePet} from "../services/pets.service";


// [POST] /api/pets/new-pets
export const createNewPets = useCatchAsync(async (req, res) => {
    try {
        const { error } = validateNewPets(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }

        const data = await PetsService.createNewPets(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/pets/get-all
export const getAllPets = useCatchAsync(async (req, res) => {
    try {
        const data = await PetsService.getAllPets();
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [PATCH] /api/pets/edit-pets
export const editPets = useCatchAsync(async (req, res) => {

    try {
        const { error } = validateEditPets(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await PetsService.editPets(req.body);
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
// [DELETE] /api/pets/delete-pet
export const deletePets= useCatchAsync(async (req, res) => {

    try {
        const { error } = validateDetailPets(req.params);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await PetsService.deletePet(req.params);
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});