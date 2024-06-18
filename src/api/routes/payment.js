import express from 'express'
import * as ShippingController from "../controllers/shippingProvider.controller";
import * as PaymentController from "../controllers/payment.controller";

const router = express.Router();

router.post('/payment/calc-shipping-fee',ShippingController.getShippingFee)
router.post("/order/createPaymentUrl", PaymentController.createPayment);
router.get("/order/order_vnpay_return",PaymentController.returnURL)


export default router