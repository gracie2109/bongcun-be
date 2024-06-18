import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import redisClient from '../../database/redis'
import useCatchAsync from '../../helpers/useCatchAsync'
import { AuthRedisKeyPrefix } from '../../types/redis.type'
import { customersRole } from '../../constants/customers';


export default function AuthGuard(req, res, next) {

}