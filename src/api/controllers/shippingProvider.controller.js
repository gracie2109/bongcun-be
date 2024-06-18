import "dotenv/config";
import axios from 'axios';



export const getShippingFee = async (req, res, next) => {
    try {
        const { districtID, wardId, products } = req.body;
        let totalShippingFee = 0;

        const requests = products.map(async (product) => {
            const response = await axios.post(
                process.env.GHN_API_CALC_SHIPPING_FEE,
                {
                    from_district_id: Number(process.env.MY_STORE_DISTRICT_ID),
                    from_ward_code: process.env.MY_STORE_WARD_ID,
                    service_id: 53320,
                    service_type_id: null,
                    to_district_id: Number(districtID),
                    to_ward_code: wardId,
                    coupon: null,
                    insurance_value: Number(product.price),
                    height: Number(product.height),
                    length: Number(product.length),
                    weight: Number(product.weight),
                    width: Number(product.width)
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': process.env.GHN_TOKEN,
                        'ShopId': process.env.GHN_SHOP_ID
                    },

                }
            );
                return response.data.data.total ? response.data.data.total : 0;
        });

        const shippingFees = await Promise.all(requests);
        totalShippingFee = shippingFees.reduce((acc, fee) => acc + fee, 0);

        return res.status(201).json({
            data: totalShippingFee
        });

    } catch (err) {
        console.error("Error in getShippingFee function:", err);
        return res.status(500).json({
            error: err.message
        });
    }
};


