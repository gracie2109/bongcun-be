import express from 'express'
import * as DiscountController  from '../controllers/discount.controller';
import {deleteVoucher} from "../controllers/discount.controller";

const router = express.Router();

router.post('/discount/new-discount',DiscountController.createNewDiscount);
router.get('/discount/get-list',DiscountController.getListDiscount);
router.get('/discount/get-detail/:id',DiscountController.getDetailVoucher);
router.delete('/discount/delete-voucher/:id',DiscountController.deleteVoucher);

// router.post('/discount/use-discount/:discount_id', DiscountController.useDiscountVoucher)
export default router
