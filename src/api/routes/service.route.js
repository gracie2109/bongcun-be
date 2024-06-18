import express from 'express'
import * as ServiceController from "../controllers/services.control";
import {getAllServices} from "../controllers/services.control";


const router = express.Router();

router.post('/services/new-service',ServiceController.createNewService);
router.get('/services/get-all', ServiceController.getAllServices)

// [GET] /api/services/get-service-by-id
router.get('/services/get-service-by-id/:id', ServiceController.getServiceById)

//[POST] /api/services/set-service-price-of-pet
router.post('/services/set-service-price-of-pet',ServiceController.setServicePriceOfPet);

//[GET] /api/services/get-service-of-pet
router.get('/services/get-service-of-pet/:petId', ServiceController.getServiceOfPetId);

//[PATCH] /api/services/update-service-price-of-pet
router.patch('/services/update-service-of-pet', ServiceController.updateServicePriceOfPet);

//[GET] /api/services/get-service-of-all-pet
router.get('/services/get-service-of-all-pet', ServiceController.getServiceOfAllPets);

//[GET] /api/services/get-service-of-pet-new-ver
router.get('/services/get-service-of-pet-new-ver/:petId', ServiceController.getServiceOfPetIdNewVer);
router.delete('/services/delete/:id', ServiceController.removeService)

export default router