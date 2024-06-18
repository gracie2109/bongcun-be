import "dotenv/config";

import format from "date-format";
import {sortObject} from "../../helpers/sortObject";
import {stringify} from "qs";
import {generateUniqueID} from "../../helpers/uniqueId"
import crypto from "crypto"
import OrderModel from "../models/order.model";
import {VnpayResponseStatus} from "../../constants/vnpayStatus";



export const createPayment = async (req, res, next) => {
    try {
        const {bankCode, orderDescription,language,amount} = req.body
        let shortId = generateUniqueID();

        let order = await  OrderModel.create({
            txnRef: shortId,
            total_price:amount
        })
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        let tmnCode = process.env.VNP_TMNCODE;
        let secretKey = process.env.VNP_SECRET;
        let vnpUrl = process.env.VNP_URL;
        let returnUrl = process.env.VNP_RETURN_URL;
        let createDate = format.asString('yyyyMMddhhmmss', new Date());
        let orderType =220000; //Mẹ & Bé


        let orderInfo = orderDescription;
        let locale = req.body.language;
        if (locale === null || locale === '') {
            locale = 'vn';
        }

        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = order._id;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        // vnp_Params['vnp_BankCode'] = bankCode;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);
        let signData = stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + stringify(vnp_Params, { encode: false });
        res.json(vnpUrl)

    }catch (e) {
        console.log("err", e)
    }
}




export const returnURL = async (req, res) => {
    let vnp_Params = req.query;


    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = process.env.VNP_SECRET;

    let signData = stringify(vnp_Params, { encode: false });

    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    let rspCode = vnp_Params['vnp_ResponseCode'];

    if(secureHash === signed){
         await OrderModel.findOneAndUpdate({txnRef: vnp_Params['vnp_TxnRef'], status:rspCode}, {
            new: true
        });
         let message = VnpayResponseStatus.find((i) => i.code ===rspCode).message
        return res.status(201).json({
            data: {
                statusCode: rspCode,
                message:message
            }
        })
    } else{
        res.render('success', {code: '97'})
    }
}

