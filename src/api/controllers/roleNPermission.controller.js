import 'dotenv/config';
import ScheduleService from "../models/schedule_service.model"
import {HttpStatusCode} from "../../configs/statusCode.config";
import { useCatchAsync } from "../../helpers/useCatchAsync"
import * as RoleAndPerService from "../services/role_per.service";


// [POST] /api/role/createRole
export const createRole = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.createRole(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: ""
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});
// [GET] /api/role/createRole
export const getRoles = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.getRoles();
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: ""
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

// [DELETE] /api/role/delete-role/:id
export const deleteRole = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.deleteRole(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Delete role successfully!"
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


// [POST] /api/permissions/create-permission
export const createPermissions = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.createPermissions(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Create permission successfully!"
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

export const getPermissions = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.getPermissions();
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: "Get permissions successfully!"
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});




// [GET] /api/role/detail/:id
export const getDetailRole = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.getRolesDetail(req.params);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: ""
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});


export const updateRole = useCatchAsync(async (req, res) => {
    try {
        const data = await RoleAndPerService.updateRole(req.body);
        return res.status(HttpStatusCode.OK).json({
            data: data,
            message: ""
        });
    } catch (error) {

        return res.status(error.status || HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            error: error.message || 'Internal Server Error',
        });
    }
});

