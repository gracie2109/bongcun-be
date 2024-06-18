import 'dotenv/config'
import {Request, Response} from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken';
import {validateSigninData, validateSignupData} from "../validation/customers.validation";
import * as UserService from '../services/customers.service'
import {customersGender, customersRole} from "../../constants/customers";
import {useCatchAsync} from "../../helpers/useCatchAsync"
import {HttpStatusCode} from '../../configs/statusCode.config'
import {sendMail} from "../services/mail.service";
import {getVerificationEmailTemplate} from "../../helpers/mailTemplates";
import RolesModel from "../models/roles.model";
import TokenModel from "../models/token.model";
import newsModel from "../models/news.model";


// [POST] /api/customers/new-account
export const createNewAccount = useCatchAsync(async (req, res) => {
    try {


        const newUser = await UserService.createNewAccount({...req.body});
        const token = jwt.sign({auth: newUser.email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const newTokenCreate = await TokenModel.create({
            value: token,
            isVerify: false,
            user_id: newUser._id
        })
        const domain = req.protocol + '://' + req.get('host');

        const sendStt = await sendMail(
            getVerificationEmailTemplate({
                redirectDomain: domain,
                user: newUser,
                token,
                tokenId: newTokenCreate._id
            })
        )


        return res.status(HttpStatusCode.OK).json({
            message: "Please check email to verify account"
        });

    } catch (e) {
        console.log("Register failue =>>", e);
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            message: e
        })
    }


})


// [POST] /api/customers/new-account
export const getAllCustomers = useCatchAsync(async (req, res) => {
    const data = await UserService.getAllCustomers();
    return res.status(HttpStatusCode.OK).json({
        data: data,
    });
})


export const getDetailUser = useCatchAsync(async(req, res) => {
    const data = await UserService.getDetailUser(req.params);
    return res.status(HttpStatusCode.OK).json({
        data: data,
    });
})