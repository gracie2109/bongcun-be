import * as BrandService from "../services/brand.service";
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {validateGetDetail, validateNewBrand} from "../validation/brand";
import createHttpError from "http-errors";
import {HttpStatusCode} from '../../configs/statusCode.config'
import {getAllBrands} from "../services/brand.service";


// [POST] /api/brands/new-brand
export const createNewBrand = useCatchAsync(async (req, res) => {
    try {
        const { error } = validateNewBrand(req.body);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }

        const data = await BrandService.createNewBrand(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/brands/get-all-brand
export const getAllBrand = useCatchAsync(async (req, res) => {
    try {
        const data = await BrandService.getAllBrands();
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/brands/get-brand-by-id/:id
export const getBrandById= useCatchAsync(async (req, res) => {
    try {
        const { error } = validateGetDetail(req.params);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await BrandService.getOneBrand(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [PATCH] /api/brands/update-by-id
export const updateBrandById= useCatchAsync(async (req, res) => {
    try {
        const data = await BrandService.updateBrand(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});