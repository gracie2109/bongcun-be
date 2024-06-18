import Joi from 'joi';


export const validateNewBrand = (payload) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(5)
            .max(250)
            .required(),

        images:Joi.any(),
        status:Joi.boolean().optional().default(true),
        desc: Joi.string().optional(),
    })
    return schema.validate(payload)
}


export const validateGetDetail = (payload) => {
    const schema = Joi.object({
       id:Joi.string().required()
    })
    return schema.validate(payload)
}