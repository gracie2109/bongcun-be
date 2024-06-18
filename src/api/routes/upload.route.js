import express from 'express'
import {uploadControllers} from "../controllers/upload.controller";
const router = express.Router();

router.post('/upload/upload-file',uploadControllers)


export default router