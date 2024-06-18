import { HttpError, isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';
import { HttpStatusCode } from '../configs/statusCode.config';
import { JsonWebTokenError } from 'jsonwebtoken';

class HttpException {
    constructor(error) {
        this.message = error.message;
        this.statusCode = isHttpError(error)
            ? error.status
            : error instanceof JsonWebTokenError
            ? HttpStatusCode.UNAUTHORIZED
            : HttpStatusCode.INTERNAL_SERVER_ERROR;
    }
}

export { HttpException };