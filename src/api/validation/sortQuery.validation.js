import Joi from 'joi'

export const checkIsValidSortObject = (sortObject) => {
    return Joi.object({
        _sort: Joi.string().required(),
        _order: Joi.string().required()
    }).validate(sortObject)
}
