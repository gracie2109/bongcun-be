import CustomersModel from "../models/user.model";
import createHttpError from 'http-errors';
import ServicesModel from "../models/services.model";
import PetsModel from "../models/pets.model";




export const createNewAccount = async (payload) => {
		const existedEmail = await CustomersModel.exists({
					email: payload.email
		})

		if (existedEmail) {
			throw createHttpError.BadRequest(`User email  cannot be duplicated!`)
		}

		return await new CustomersModel({ ...payload }).save()

}

export const getAllCustomers = async (payload) => {
	try {
		return await CustomersModel.find().sort({ createdAt: -1 })
	}catch (error) {
		throw  error
	}
}

export const getUserByEmail = async (email) =>{
	const user =await  CustomersModel.findOne({email: email});
	return user
}




export const getDetailUser = async (payload) => {
	const existUser = await CustomersModel.exists({_id: payload.id});
	if (!existUser)   throw createHttpError.BadRequest(`User with id ${payload.id}} not found!`)

	const user = await CustomersModel.findById(payload.id).populate('roles',['name', '_id']
	).select('-password').exec();
	return user
}
