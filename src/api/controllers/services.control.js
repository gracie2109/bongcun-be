import 'dotenv/config';
import createHttpError from 'http-errors';
import {useCatchAsync} from "../../helpers/useCatchAsync"
import {HttpStatusCode} from '../../configs/statusCode.config'
import {validateNewService, validateSetServiceOfPet} from "../validation/services.validation";
import * as ServicesS from "../services/service.services";
import * as PetService from "../services/pets.service";
import error from "multer/lib/multer-error";


//[POST] /api/services/new-service
export const createNewService = useCatchAsync(async (req, res) => {
    try {
        const {error} = validateNewService(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await ServicesS.createNewServie(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// export const updateService  = useCatchAsync(async (req, res) => {
//
// })





// [GET] /api/services/get-all
export const getAllServices = useCatchAsync(async (req, res) => {
    try {
        const data = await ServicesS.getAllService();
        const pets = await PetService.getAllPets()
        return res.status(HttpStatusCode.OK).json({
            data, pets
        })
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/services/get-service-by-id/:_id

export const getServiceById = useCatchAsync(async (req, res) => {
    try {
        const data = await ServicesS.getServiceById(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data
        })
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


//[POST] /api/services/set-service-price-of-pet
export const setServicePriceOfPet = useCatchAsync(async (req, res) => {
    try {
        const {error} = validateSetServiceOfPet(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const newPost = await ServicesS.setServicePriceOfPet(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: newPost,
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

//[GET] /api/services/get-service-of-pet
export const getServiceOfPetId = useCatchAsync(async (req, res) => {
    try {

        const newPost = await ServicesS.getServiceByPetId(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: newPost,
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
//[GET] /api/services/get-service-of-pet-new-ver
export const getServiceOfPetIdNewVer = useCatchAsync(async (req, res) => {
    try {

        const newPost = await ServicesS.getServiceByPetIdNewVersion(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: newPost,
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

//[PATCH] /api/services/update-service-price-of-pet
export const updateServicePriceOfPet = useCatchAsync(async (req, res) => {
    try {
        const data = await ServicesS.updateServicePriceOfPet(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

//[GET] /api/services/get-service-of-all-pet
export const getServiceOfAllPets = useCatchAsync(async (req, res) => {
    try {

        const data = await ServicesS.getServiceOfAllPets();
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


export const removeService = useCatchAsync(async (req, res) => {
    const id = req.params.id
    if (!id) throw createHttpError(HttpStatusCode.NO_CONTENT)
    const result = await ServicesS.removeService(id)
    return res.status(result.statusCode).json(result)
})
