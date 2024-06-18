import cloudinary from "../../configs/cloudinary";
import * as multer from "multer"
import {HttpStatusCode} from "axios";

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
};



const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image.preview, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url);
                return resolve(result.secure_url);
            }
            console.log(error.message);
            return reject({ message: error.message });
        });
    });
};


export const uploadControllers = async (req, res) => {

   try {
       const fields = req.body;
       console.log("uploadControllers", fields)
       if(Array.isArray(fields)) {
           const uploads = fields.map((base) => uploadImage(base));
           const response = await Promise.all(uploads);
            return res.status(HttpStatusCode.OK).json({
                data: response,
                text:"multi upload"
            })
       }else{
           const singleRes = await uploadImage(fields);
           return res.status(HttpStatusCode.OK).json({
               data: singleRes,
               text:"single_upload"
           })
       }
   }catch(error) {
       console.log("upload fail",error.message);
   }
}