import express from 'express'
import * as BrandController  from '../controllers/brand.controller'
const router = express.Router();

// [POST] /api/brands/new-brand
router.post('/brands/new-brand',BrandController.createNewBrand);

// [GET] /api/brands/get-all-brand
router.get('/brands/get-all-brand',BrandController.getAllBrand);

// [GET] /api/brands/get-brand-by-id/:id
router.get('/brands/get-brand-by-id/:id',BrandController.getBrandById);

// [PATCH] /api/brands/update-by-id
router.patch('/brands/update-by-id',BrandController.updateBrandById);

export default router
