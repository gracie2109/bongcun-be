import * as ComboController from "../services/combo.service";
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {HttpStatusCode} from "../../configs/statusCode.config"


// [POST] /api/combo/new-combo-services
export const createNewComboService = useCatchAsync(async (req, res) => {
    try {
        // const { error } = validateNewBrand(req.body);
        // if (error) {
        //     throw createHttpError.BadRequest(error.message);
        // }

        const data = await ComboController.createCombo(req.body);

        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/combo/get-all-combo-services
export const getAllComboService = useCatchAsync(async (req, res) => {
    try {
        const data = await ComboController.getAllComboService();
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [PATCH] /api/combo/update-combo-service
export const updateComboService = useCatchAsync(async (req, res) => {
    try {
        const data = await ComboController.updateCombo(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});