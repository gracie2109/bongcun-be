import createHttpError from 'http-errors';

import RoleModel from "../models/roles.model";
import PermissionsModel from "../models/permissions.model";
import UserModel from "../models/user.model"
import slugify from "slugify";
import {data} from "express-session/session/cookie";


// export const createRoleAndPer = async() => {
//     try {
//         const checkRole = await Roles.countDocuments();
//         const checkPermissions = await Permissions.countDocuments();
//         return checkRole
//     }catch (err){
//         console.log("Create Permission fail", err)
//     }
// }

export const createPermissions = async (payload) => {
    const existData = [];
    for (const item of payload) {
        const check = await PermissionsModel.exists({name: item.name});
        existData.push(check);
    }
    const newPermissions = payload.filter((item, index) => !existData[index]);
    if (newPermissions.length === 0) {
        return null;
    }
    const data = await PermissionsModel.create(newPermissions.map(item => ({
        name: item.name,
        status: true
    })));
    return data;
}


const reduceData = (data) => {
    return data.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
}


export const getPermissions = async () => {
    const data = await PermissionsModel.find();
    const removePer = data.map((i) => i.name.replace("Permission.", ""));
    const newArray = removePer.map((ii, j) => ii.split(".")[2]);
    const namePer = Array.from(new Set(removePer.map((ii, j) => ii.split(".")[1])));
    const mainActionsArray = Array.from(new Set(newArray));
    const a = data?.map((i) => {
        return i.name.split(".")[2]
    });
    const count2 = reduceData(a);

    return {data: data, methods: mainActionsArray, countDataOfMethods: count2, namePer: namePer}

}

export const getRoles = async () => {
    const findAllSysPermissions = await RoleModel.findOne({name: "PERMISSION.SYSTEM.ALL"});

    const data = await RoleModel.find()
    return data

}


export const createRole = async (payload) => {
    try {
        console.log("payload", payload)
        const existRole = await RoleModel.exists({name: payload.name});
        if (existRole) {
            throw createHttpError.BadRequest('Cannot duplicate role');
        }

        return await RoleModel.create({...payload, value: slugify(payload.name)})
    } catch (e) {
        console.log("fail", e);
        throw e
    }
}


export const updateRole = async (payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if (!existRole) {
        console.log('not found role.')
    }
    const data = await RoleModel.updateOne({_id: payload.id}, payload, {new: true});

    return data
}


export const deleteRole = async (payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if (!existRole) throw createHttpError.NotFound('Cannot find role to delete');
    return await RoleModel.deleteOne({_id: payload.id})
}


export const getRolesDetail = async (payload) => {
    const existRole = await RoleModel.exists({_id: payload.id});
    if (!existRole) throw createHttpError.NotFound('Cannot find role');

    const detail = await RoleModel.findOne({_id: payload.id}).populate('permissions')
    return detail
}