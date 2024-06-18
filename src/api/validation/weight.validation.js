import Joi from 'joi';


export const validateNewService = (payload) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(30)
			.required(),
        value:Joi.string(),
		status: Joi.boolean()
	})
	return schema.validate(payload)
}