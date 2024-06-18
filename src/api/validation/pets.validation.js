import Joi from 'joi';


export const validateNewPets = (payload) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(2)
			.max(30)
			.required(),
		status: Joi.boolean(),
		icon: Joi.string()

	})
	return schema.validate(payload)
}

export const validateEditPets = (payload) => {
	const schema = Joi.object({
		name: Joi.string()
			.min(3)
			.max(30),
		status: Joi.boolean(),
		icon: Joi.string(),
		_id: Joi.string().required()

	})
	return schema.validate(payload)
}

export const validateDetailPets = (payload) => {
	const schema = Joi.object({
		_id: Joi.string().required()

	})
	return schema.validate(payload)
}