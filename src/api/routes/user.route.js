import express from 'express'
import {createNewAccount, getAllCustomers,getDetailUser}  from '../controllers/customers.controller'
const router = express.Router();


router.post('/customers/new-account',createNewAccount)
router.get('/customers/get-all',getAllCustomers);
router.get('/user/get-user/:id',getDetailUser)

export default router