import ComboModel from "../models/combo.model";
import ComboItemModel from "../models/comboItems.model";
import createHttpError from "http-errors";


export const createCombo= async (payload) => {
        const isComboExist = await ComboModel.exists({ name: payload.name });
        if (isComboExist) {
            throw createHttpError.BadRequest(`Combo cannot be duplicated!`);
        }
        const combo = await ComboModel.create(payload);
        if(combo) {
            const upload = payload.serviceData.map((item) => {
                return {
                    serviceId:item,
                    comboId: combo._id
                }
            })
           const comboItems = await ComboItemModel.insertMany(upload);
            return  {
                combo:combo,
                comboItems: comboItems
            }
        }
        return combo

}


export const getAllComboService = async () => {
    try {
        const comboData = await ComboModel.aggregate([
            {
                $lookup: {
                    from: 'comboitems',
                    localField: '_id',
                    foreignField: 'comboId',
                    as: 'comboData'
                }
            }
        ]);


        if (!comboData) {
            throw createHttpError.HTTP_STATUS_BAD_REQUEST(`Combos not found`);
        }


        for (const combo of comboData) {
            await ComboItemModel.populate(combo.comboData, { path: 'serviceId' });
        }

        return comboData.map(combo => ({
            combo,

        }));
    } catch (error) {
        console.error(error);
        throw createHttpError.HTTP_STATUS_BAD_GATEWAY('Internal server error');
    }
};

// export const updateCombo= async (payload) => {
//     const isComboExist = await ComboModel.exists({ _id: payload._id });
//     if (isComboExist) {
//         throw createHttpError.BadRequest(`Not found`);
//     }
//     const combo = await ComboModel.updateOne(
//         {
//             _id: payload._id
//         },
//         {
//             $set:payload
//         },
//         {
//             upsert:true
//         }
//     );
//     if(combo) {
//         const upload = payload.serviceData.map((item) => {
//             return {
//                 serviceId:item,
//                 comboId: combo._id
//             }
//         })
//         const comboItems = await ComboItemModel.updateMany(upload);
//         return  {
//             combo:combo,
//             comboItems: comboItems
//         }
//     }
//     return combo
//
// }

export const updateCombo = async (payload) => {
    const comboId = payload.id;


    try {
        // Kiểm tra xem combo tồn tại hay không
        const existingCombo = await ComboModel.findById(comboId);
        if (!existingCombo) {
            throw new  createHttpError.HTTP_STATUS_BAD_REQUEST( "Combo not found");
        }

        // Kiểm tra xem có combo khác có cùng tên không (ngoại trừ combo đang cập nhật)
        const isComboExist = await ComboModel.exists({ name: payload.name, _id: { $ne: comboId } });
        if (isComboExist) {
            throw createHttpError.BadRequest( "Combo name already exists" );
        }

        // Cập nhật thông tin combo
        const updatedCombo = await ComboModel.findByIdAndUpdate(comboId, payload, { new: true });

        // Cập nhật danh sách các dịch vụ trong combo nếu có
        if (payload.serviceData && payload.serviceData.length > 0) {
            // Lặp qua từng dịch vụ mới và cập nhật hoặc thêm vào danh sách combo
            for (const serviceId of payload.serviceData) {
                // Kiểm tra xem mục combo đã tồn tại hay chưa
                const existingComboItem = await ComboItemModel.findOne({ comboId, serviceId });
                if (!existingComboItem) {
                    // Nếu không tồn tại, thêm vào danh sách
                    await ComboItemModel.create({ comboId, serviceId });
                }
            }
        }

        return  updatedCombo
    } catch (error) {
      console.log("error",error)
    }
};
