import { HttpException } from '../types/httpException.type';

export const useCatchAsync = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
        const httpException = new HttpException(error);
        return res.status(httpException.statusCode).json(httpException);
    });


