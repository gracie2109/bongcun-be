import 'dotenv/config';
import createHttpError from 'http-errors';
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {validateNewPets} from "../validation/pets.validation";
import * as ProductService from "../services/product.service";
import {HttpStatusCode} from "../../configs/statusCode.config";
import {getListProduct} from "../services/product.service";
import ProductOption from "../models/productOption.model";


// [POST] /api/product/create-product


export const createProduct = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.createProduct2(req.body)
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message:"Created product successfully!"
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


export const getListProducts = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.getListProduct()
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

export const getListProductsOption = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductOption.find()
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});



export const getDetailProducts = useCatchAsync(async (req, res) => {
    try {
        const data = await ProductService.getDetailProduct(req.params)
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});