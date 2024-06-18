import 'dotenv/config';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken'
import {useCatchAsync} from '../../helpers/useCatchAsync'
import UserModel from '../models/user.model'
import {customersRole} from "../../constants/customers"
import {getUserByEmail} from "../services/customers.service";
import redisClient from '../../database/redis'
import { AuthRedisKeyPrefix } from '../../types/redis.type'
import {HttpStatusCode} from "../../configs/statusCode.config";
import path from "path";
import TokenModel from "../models/token.model";
import {sendMail} from "../services/mail.service";
import {forgotPasswordTemplate} from "../../helpers/mailTemplates";

export const verifyAccount = useCatchAsync(async (req, res) => {

    try {
        const token = req.query._token;
        if (!token) {
            throw createHttpError.Unauthorized('Access token must be provided!')
        }

        const getToken = await TokenModel.findOne({_id: req.query._id});
        if(!getToken){
            return res.sendFile(path.resolve(path.join(__dirname, "../../views/email-verified.html")))
        }
        if(!getToken.isVerify) {
            const { auth } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const updateUserData =
                req.query._role === customersRole.CUSTOMERS ? { isVerified: true, employmentStatus: true } : { isVerified: true }
            await UserModel.findOneAndUpdate({ email: auth }, updateUserData, {
                new: true
            });
            await TokenModel.updateOne({_id: req.query._id}, {isVerify: true} )
            res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com")
            res.setHeader('Cross-origin-Embedder-Policy', 'same-origin')
            res.setHeader('Access-Control-Allow-Origin', '*')
            return res.sendFile(path.resolve(path.join(__dirname, "../../views/send-mail-response.html")))
        }else{
            return res.sendFile(path.resolve(path.join(__dirname, "../../views/email-verified.html")))
        }
    }catch (e) {
        console.log("verify dail", e)
    }
})


export const signInAccount = useCatchAsync(async (req, res) => {
    const user =  await getUserByEmail(req.body.email);
    const checkPassword = user && user.verifyPassword(req.body.password || "");

    if (!user) {
        throw createHttpError.NotFound('Cannot find user!')
    }
    if(!checkPassword) {
        throw createHttpError.NotFound('Password wrong!')
    }
    if(user) {
        if(user.isVerified) {
            const accessToken = jwt.sign({ payload: user }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            })
            const refreshToken = jwt.sign({ payload: user }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '30d'
            })
            await Promise.all([
                redisClient.set(AuthRedisKeyPrefix.ACCESS_TOKEN + user._id, accessToken, {
                    EX: 60 * 60
                }),
                redisClient.set(AuthRedisKeyPrefix.REFRESH_TOKEN + user._id, refreshToken, {
                    EX: 60 * 60 * 24 * 30
                })
            ]);

            res.cookie('access_token', accessToken, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true,
                 secure: true,
                sameSite: 'none'
            })

            return res.status(HttpStatusCode.CREATED).json({
                user: user,
                accessToken,
                refreshToken,
                status:200
            })

        }else{
            return res.status(HttpStatusCode.UNAUTHORIZED).json({
                message: "Your account not verify!",
                status: 401
            })
        }

    }
})

export const signout = useCatchAsync(async (req, res) => {
	const userRedisTokenKeys = {
		accessToken: AuthRedisKeyPrefix.ACCESS_TOKEN + req.profile._id,
		refreshToken: AuthRedisKeyPrefix.REFRESH_TOKEN + req.profile._id
	}
	const accessToken = await redisClient.get(userRedisTokenKeys.accessToken)

	if (!accessToken)
		return res.status(400).json({
			message: 'Failed to revoke token',
			statusCode: 400
		})
	// Delete user's access & refresh token in Redis
	await Promise.all([
		redisClient.del(userRedisTokenKeys.accessToken),
		redisClient.del(userRedisTokenKeys.refreshToken)
	])
	// Reset all client's cookies
	req.logout((err) => {
		if (err) throw err
	})
	res.clearCookie('access_token')
	res.clearCookie('uid')
	res.clearCookie('connect.sid', { path: '/' })

	return res.status(202).json({
		message: 'Signed out!',
		statusCode: 202
	})
});

export const forgotPassword = useCatchAsync(async(req, res) => {
    try {
        const {email} = req.body;
        const user = await getUserByEmail(email)
        const domain = req.protocol + '://' + req.get('host');
        const accessToken = jwt.sign({ payload: user }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '7d'
        })

         await sendMail(
            forgotPasswordTemplate({
                redirectDomain: domain,
                data: {
                    email:email,
                    user:user,
                    recover_path: `http://localhost:3000/recover/_email=${email}&_key=${accessToken}`
                },
            })
        );
        console.log("data_sendmail stt", data)

            return res.status(200).json({
                message: 'Please check mail to get new code',
                statusCode: 202
            })


    }catch (e) {
        console.log("ee",e)
    }
})