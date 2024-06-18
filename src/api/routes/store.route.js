import express from 'express'
import * as StoreController from "../controllers/store.controller";


const router = express.Router();

router.post('/store/create',StoreController.createNewStore)
router.get('/store/get-store',StoreController.getStore)
router.patch('/store/edit-store',StoreController.editStore)
export default router