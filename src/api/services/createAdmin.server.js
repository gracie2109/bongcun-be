import RolesModel from "../models/roles.model";
import PermissionsModel from "../models/permissions.model";
import slugify from "slugify";
import UserModel from "../models/user.model";
import WeightsModel from "../models/weight.model";
import ServicesModel from "../models/services.model";
import {weights} from "../../constants/weight";
import {services} from "../../constants/services"
import BrandsModel from "../models/brands.model";
import {brandsSample} from "../../constants/brands";


export const createAdminServer = async (payload) => {
    try {
        const countPer = await PermissionsModel.countDocuments();
        const countRole = await RolesModel.countDocuments();
        const customerCount = await UserModel.countDocuments()
        const brandCount = await BrandsModel.countDocuments();
        if (countPer === 0 && countRole === 0 && customerCount === 0 && brandCount === 0) {
            const newPer = await PermissionsModel.create({
                name: "PERMISSION.SYSTEM.ALL",
                status: true
            });

            await RolesModel.insertMany([
                {
                    name: "Super Admin",
                    value: "super-admin",
                    permissions: [newPer._id],
                    isCanDelete: false
                },
                {
                    name: "Employee",
                    value: "employee",
                    permissions: [],
                    isCanDelete: false
                },
                {
                    name: "Customers",
                    value: "customers",
                    permissions: [],
                    isCanDelete: false
                }
            ]);
            await BrandsModel.insertMany(brandsSample)
            const role = await RolesModel.findOne({
                value: "super-admin"
            });
            await UserModel.create({
                email: payload.email,
                password: payload.password,
                username: payload.username,
                roles: [role._id],
                isVerified: true
            });
            await WeightsModel.insertMany(weights)
            // await ServicesModel.insertMany(services)
        }

            if (countPer >= 1 && countRole >= 1 && customerCount === 0) {
            const role = await RolesModel.findOne({
                value: "super-admin"
            });
            console.log("countPer", role)
            return await UserModel.create({
                email: payload.email,
                password: payload.password,
                username: payload.username,
                roles: [role._id],
                isVerified: true
            });

        }
        return {message: "Your website is ready!!"}

    } catch (e) {
        console.log("fail", e)
    }
}

