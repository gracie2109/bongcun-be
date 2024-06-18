import * as ComboController from "../controllers/combo.controller";
import express from "express";

const router = express.Router();

// [POST] /api/combo/new-combo-services
router.post('/combo/new-combo-services',ComboController.createNewComboService);

// [GET] /api/combo/get-all-combo-services
router.get('/combo/get-all-combo-services',ComboController.getAllComboService);


export default router