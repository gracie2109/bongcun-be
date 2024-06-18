import DiscountModel from "../models/discount.model";
import DiscountRuleModel from "../models/discount_rule.model";
import DiscountConditionProductModel from "../models/dicount_condition_product.model";
import { discount_conditions} from "../../constants/discount"
import createHttpError from "http-errors";
import mongoose from "mongoose";
import * as http from "http";
import PetsModel from "../models/pets.model";

export const createDiscount = async (payload) => {
    try {

        const existDiscount = await DiscountModel.exists({
            code: payload.general.code
        });
        if(existDiscount) throw createHttpError.BadRequest(`Discount voucher code cannot be duplicated!`);

        const forDiscountRule = {
            value: payload.general.amount,
            type: payload.discountType,
            allocation:payload.allocation,
        }
        const discount_rule = await DiscountRuleModel.create(forDiscountRule)

        if(discount_rule){
            const forDiscount = {
                code: payload.general.code,
                discount_rule_id:discount_rule._id,
                starts_at: payload.config.startDate,
                ends_at:payload.config.expiry,
                usage_limit:payload.config.unLimit,
                condition_option:payload.condition_option,
                desc:payload.general.desc
            }
            const discount = await DiscountModel.create(forDiscount);
            if(payload.condition_option === discount_conditions.PRODUCTS){
                await DiscountConditionProductModel.create({
                    data: payload.condition_data,
                    discount_id: discount._id,
                    discount_rule_id: discount_rule._id
                })
            }
        }

    }catch (e) {
        console.log("errr",e);
        throw  e
    }
}

// export const useDiscountVoucher = async() => {
//     return await DiscountModel.find()
// }

export const getListVoucher = async() => {
   return await DiscountModel.find().exec()
}


export const getDetailVoucher = async(payload) => {
    try {
        const existVoucher = await DiscountModel.exists({_id: payload.id});
        if(!existVoucher) {
            throw createHttpError.BadRequest(`Not found this voucher!`);

        }
        const conditionOption = "products";

        let conditionCollection;
        if (conditionOption === "products") {
            conditionCollection = "discount_condition_product";
        } else if (conditionOption === "customer_group") {
            conditionCollection = "discount_condition_customer_group";
        }
        const detail = await DiscountModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(payload.id)
                }
            },
            {
                $lookup: {
                    from: "discount_rule",
                    localField: "discount_rule_id",
                    foreignField: "_id",
                    as: "rule",

                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                type:1,
                                allocation: 1
                            },

                        }
                    ]
                }
            },
            {
                $unwind:{
                    path: "$rule",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: conditionCollection,
                    let: { discount_id: "$_id" },
                    as: "condition_data",
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$discount_id", "$$discount_id"] },
                            },
                        }
                    ],
                }
            } ,
            {
                $unwind: "$condition_data"
            },
            {
                $project: {
                    _id: 0,
                    code: 1,
                    desc: 1,
                    starts_at: {
                        $cond: {
                            if: { $eq: ["$starts_at.status", false] },
                            then: "unlimited",
                            else: "$starts_at"
                        }
                    },
                    ends_at: {
                        $cond: {
                            if: { $eq: ["$ends_at.status", false] },
                            then: "unlimited",
                            else: "$ends_at"
                        }
                    },
                    usage_limit: {
                        $cond: {
                            if: { $eq: ["$usage_limit.status", false] },
                            then: "unlimited",
                            else: "$usage_limit"
                        }
                    },
                    usage_count: 1,
                    condition_option: 1,
                    rule: 1,
                    data: "$condition_data.data",
                }
            }
        ]);
        return detail[0]
    }catch (err) {
        throw  err
    }
}

const applyVoucher = (payload) => {

}

export const deleteVoucher = async (payload) => {
  try {
      const existVoucher = await DiscountModel.findOne({_id: payload.id});
      if(!existVoucher) {
          throw createHttpError.BadRequest(`Not found this voucher!`);
      }
      if(existVoucher.usage_count > 0) {
          throw createHttpError.BadRequest(`Can't delete this voucher`)
      }
      else  {
          await DiscountModel.deleteOne({ _id: payload.id });
          await DiscountRuleModel.findOneAndDelete({_id: existVoucher.discount_rule_id});
          if(existVoucher.condition_option === "products"){
              await DiscountConditionProductModel.findOneAndDelete({discount_id: payload.id})
          }

      }


  }catch (e) {
      throw  e
  }
}