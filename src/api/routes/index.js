import express, { Router } from 'express'
import UserRouter from './user.route';
import NewsRouter from './news.route';
 import PetsRouter from './pet.route';
import ServiceRouter from './service.route';
import WeightRouter from './weight.route';
import StoreRoute from './store.route';
import BrandsRoute from './brand.route';
import CategoriesRoute from './categories.route';
import ComboRoute from "./combo.route";
import ProductRoute from "./products.route";
import PaymentRoute from "./payment";
import AuthRoute from "./auth.route";
import DiscountRoute from "./discount.route";
import ScheduleServiceRoute from "./schedule_service.route";
import RoleAndPerRoute from "./role_and_per.route";
import UploadRoute from "./upload.route";

const rootRouters = [
	UserRouter,
	NewsRouter,
	PetsRouter,
	WeightRouter,
	ServiceRouter,
	StoreRoute,
	BrandsRoute,
	CategoriesRoute,
	ComboRoute,
	ProductRoute,
	PaymentRoute,
	AuthRoute,
	DiscountRoute,
	ScheduleServiceRoute,
	RoleAndPerRoute,
	UploadRoute
]

const router = express.Router();

rootRouters.forEach((route) => {
	router.use(route)
})

export default router