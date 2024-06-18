import * as StoreService from "../services/store.service"
import {useCatchAsync} from "../../helpers/useCatchAsync";
import {HttpStatusCode} from "../../configs/statusCode.config"

// [POST] /api/store/create
export const createNewStore = useCatchAsync(async (req, res) => {
    try {
        const data = await StoreService.createNewStore(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/store/getStores
export const getStore = useCatchAsync(async (req, res) => {
    try {
        const data = await StoreService.getStore();
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [GET] /api/store/edit-store/:id
export const editStore = useCatchAsync(async (req, res) => {
    try {
        const data = await StoreService.editStore(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
        });
    } catch (error) {
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});