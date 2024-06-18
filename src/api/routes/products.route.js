import express from 'express'
import * as ProductController from "../controllers/product.controller"
import {getDetailProducts, getListProductsOption} from "../controllers/product.controller";

const router = express.Router();

// [POST] /api/product/create-product
router.post('/product/create-product', ProductController.createProduct)

router.get('/product/get-list', ProductController.getListProducts);
router.get('/product/get-detail/:id', ProductController.getDetailProducts);
router.get('/a', ProductController.getListProductsOption);


export default router