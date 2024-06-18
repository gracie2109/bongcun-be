import * as CategorisService from "../services/categories.service";
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {validateGetDetail, validateNewBrand} from "../validation/brand";
import createHttpError from "http-errors";
import {HttpStatusCode} from '../../configs/statusCode.config'
import {getAllBrands} from "../services/brand.service";
import {deleteCategory, getCategoryHierarchy} from "../services/categories.service";
import {customersRole} from "../../constants/customers"
import {categories} from "../../constants/services"
import {sendMail} from "../services/mail.service";
import {getVerificationEmailTemplate} from "../../helpers/mailTemplates";
// [POST] /api/brands/new-brand
export const createNewCategories = useCatchAsync(async (req, res) => {
    try {
        const data = await CategorisService.createNewCategories(req.body);
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
export const getAllCategoriesV2 = useCatchAsync(async (req, res) => {
    try {
        const  data= await CategorisService.getAllCategoriesV2();
        return res.status(HttpStatusCode.OK).json({
            data: data
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


// [GET] /api/brands/get-brand-by-id/:id
export const getOneCategoryV2= useCatchAsync(async (req, res) => {
    try {
        const { error } = validateGetDetail(req.params);
        if (error) {
            throw createHttpError.BadRequest(error.message);
        }
        const data = await CategorisService.getDetailCategory(req.params.id);
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
export const updateCategoryById= useCatchAsync(async (req, res) => {
    try {
        const data = await CategorisService.updateCategory(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [DELETE] /api/categories/delete

export const removeClass = useCatchAsync(async (req, res) => {
    const id = req.params.id
    if (!id) throw createHttpError(HttpStatusCode.NO_CONTENT)
    const result = await CategorisService.deleteCategory(id)
    return res.status(HttpStatusCode.OK).json(result)
})
