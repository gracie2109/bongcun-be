import express from 'express'
import * as PetsController from "../controllers/pets.controller";


const router = express.Router();

router.post('/pets/new-pets',PetsController.createNewPets)
router.get('/pets/get-all',PetsController.getAllPets)
router.patch('/pets/edit-pets',PetsController.editPets)
router.delete('/pets/delete-pet/:_id',PetsController.deletePets)

export default router