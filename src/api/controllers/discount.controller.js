import 'dotenv/config'
import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import * as DiscountService from '../services/discount.service'
import { useCatchAsync } from "../../helpers/useCatchAsync"
import { HttpStatusCode } from '../../configs/statusCode.config'
import {validateNewDiscount} from "../validation/discount.validation"
import {getListVoucher, useDiscountVoucher} from "../services/discount.service";

// [POST] /api/discount/new-discount
export const createNewDiscount = useCatchAsync(async (req, res) => {
    try {
        const data = await DiscountService.createDiscount(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Discount voucher created successfully!"
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/discount/get-list
export const getListDiscount = useCatchAsync(async (req, res) => {
    try {
        const data = await DiscountService.getListVoucher();
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Discount fetch  successfully!"
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


//[GET] /api/discount/use-discount/:discount_id
export const getDetailVoucher = useCatchAsync(async (req, res) => {
    try {
        const data = await DiscountService.getDetailVoucher(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Get detail discount successfully!",
            code: HttpStatusCode.OK
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});




export const deleteVoucher = useCatchAsync(async (req, res) => {
    try {
        await DiscountService.deleteVoucher(req.params);
        return res.status(HttpStatusCode.OK).json({
            message: "Delete discount successfully!",
            code: HttpStatusCode.OK
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});






