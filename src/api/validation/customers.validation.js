import Joi from 'joi';


export const validateSigninData = (payload) => {
	const schema = Joi.object({
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),

		password: Joi.string().required(),
		email: Joi.string()
		.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		fullName:Joi.string(),
		phoneNumber:Joi.string(),
		dob: Joi.any(),
		gender:Joi.any(),
		images:Joi.any(),
		role:Joi.string(),
		bio:Joi.string()
	})
	return schema.validate(payload)
}


export const validateSignupData = (payload) => {
	const schema = Joi.object({
		username: Joi.string().alphanum()
			.min(3)
			.max(30)
			.required(),
		password: Joi.string().required(),
		email: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		verify: Joi.string().required(),
	})
	return schema.validate(payload)
}