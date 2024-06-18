import Joi from 'joi';


export const validateNewPost = (payload) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(5)
			.max(250)
			.required(),

        images:Joi.any(),
		tags:Joi.any().optional(),
		preview: Joi.string().min(5).required(),
		content:Joi.string().min(5).required(),
		status:Joi.boolean().optional(),
        user_id: Joi.any().optional(),
	})
	return schema.validate(payload)
}


