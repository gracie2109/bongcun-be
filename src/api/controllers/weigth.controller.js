
import * as WeightService from "../services/weight.service"
import { useCatchAsync } from "../../helpers/useCatchAsync"
import { HttpStatusCode } from '../../configs/statusCode.config'
import {createWeight} from "../services/weight.service";


//[POST] /api/weight/new-weight-by-default
export const createWeightByDefaultValue = useCatchAsync(async (req, res) => {
    try {
        const data = await WeightService.createUseDefaultData(req.body);
        return res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


//[GET] /api/weight/get-all-weight
export const getAllWeight = useCatchAsync(async (req, res) => {
    try {
        const data = await WeightService.getAllWeight();
        return res.status(HttpStatusCode.OK).json({
            data
        })
    } catch (error) {
    
        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

//[GET] /api/weight/assign-weights
export const assignWeight = useCatchAsync(async (req, res) => {
    try {
        const data = await WeightService.createWeight();
        return res.status(HttpStatusCode.OK).json({ data });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

