import createHttpError from "http-errors";

import Product from '../models/product.model';
import ProductImage from '../models/productImages.model';
import ProductOption from '../models/productOption.model';
import ProductVariant from '../models/productVariant.model';
import ProductVariantOption from "../models/product_variant_option.model";



import mongoose from "mongoose";
import slugify from "slugify";

export async function createProduct(draftProduct) {
    try {
        // 1. Lưu thông tin Product
            const isHasVariant = draftProduct.variants.length > 0
        const product_info = {...draftProduct.generalInfo, ...draftProduct.organize, isHasVariant:isHasVariant, price:draftProduct.price, inventory_quantity: draftProduct.inventory_quantity};

        const product = await Product.create(product_info)

        // 4. Lưu thông tin ProductOption
        const variants = draftProduct.variants;
        if (variants) {
            for (const variant of variants) {
                const productOption = new ProductOption({
                    product_id: product._id,
                    title: variant.name
                });
                await productOption.save();

                // 5. Lưu thông tin ProductVariant
                const productVariants = draftProduct.productVariants;
                if (productVariants) {
                    for (const productVariant of productVariants) {
                        const productVariantData = new ProductVariant({
                            ...productVariant,
                            product_id: product._id,
                        });
                        await productVariantData.save();
                    }
                }

                // 6. Lưu thông tin ProductOptionValue
                const values = variant.value;
                if (values) {
                    for (const value of values) {
                        const productOptionValue = new ProductOptionValue({
                            value: value.value,
                            product_option_id: productOption._id,
                            // Lấy product_variant_id từ ProductVariant đã được lưu
                            product_variant_id: productVariants.find(pv => pv.title === value.label)?._id
                        });
                        await productOptionValue.save();
                    }
                }
            }
        }

        console.log('Product created successfully.');
    } catch (error) {
        console.error('Error creating product:', error);
    }
}


export async function createProduct2(draftProduct) {
    try {
        const existProduct = await Product.exists({title: draftProduct.generalInfo.title});
        if(existProduct) throw  createHttpError.BadRequest("Can't duplicate product");

        // 1. Lưu thông tin Product
        const isHasVariant = draftProduct.variants.length > 0;
        const slug = draftProduct.generalInfo.handle ? draftProduct.generalInfo.handle : slugify(draftProduct.generalInfo.title)
        const product_info = {
            ...draftProduct.generalInfo,
            ...draftProduct.organize,
            handle:slug,
            isHasVariant:isHasVariant
        };

        const product = await Product.create(product_info)

        //save productOption and productOptionValue

        if(draftProduct.variants) {
            draftProduct.variants.forEach(function(variant) {
                variant.value.forEach(function(valueObj) {
                    const productOption = new ProductOption({
                        title: variant.name,
                        value: valueObj.value,
                        product_id: product._id
                    });
                    productOption.save();
                });
            });

            await createProductVariantOptions(draftProduct.productVariants, product._id)
                .then(productOptionValue => {
                    console.log('ProductVariantOptions created:', productOptionValue);
                    createProductVariants(draftProduct.productVariants, productOptionValue,product._id)
                        .then(productVariantsResult => {
                            console.log('ProductVariants created:', productVariantsResult);
                        })
                        .catch(error => {
                            console.error('Error creating ProductVariants:', error);
                        });
                })
                .catch(error => {
                    console.error('Error creating ProductVariantOptions:', error);
                });
        }
        return product
    } catch (error) {
        console.error('Error creating product:', error);
    }
}

const createProductVariantOptions = async (productVariants, productId) => {
    const productVariantOptions = [];

    for (const variant of productVariants) {
        for (const variantData of variant.data) {
            const foundOption = await ProductOption.findOne({
                $and:[
                    {
                        title:variantData.variant_name
                    },
                    {
                        value:variantData.variant_data
                    }
                ]
            })
            if (foundOption) {
                productVariantOptions.push(foundOption);
            }
        }
    }


    return await  ProductVariantOption.insertMany({
        product_option_id: productVariantOptions?.map((i) => i._id),
        product_id: productId
    })
};




const createProductVariants = async (productVariants, productVariantOptions, productId) => {
    const productVariantsResult = [];

    for (let i = 0; i < productVariants.length; i++) {
        const variant = productVariants[i];
        const productVariantOptionId = productVariantOptions[i]._id; // Lấy id của ProductVariantOption tương ứng

        const productVariant = new ProductVariant({
            title: variant.title,
            material: variant.material,
            price: variant.price,
            sku: variant.sku,
            inventory_quantity: variant.inventory_quantity,
            ean: variant.ean,
            upc: variant.upc,
            barcode: variant.barcode,
            product_variant_option_id: productVariantOptionId,
            product_id: productId
        });

        const savedProductVariant = await productVariant.save();
        productVariantsResult.push(savedProductVariant);
    }

    return productVariantsResult;
};

export async function getListProduct () {
   const data =  await Product.aggregate()
       .lookup({
            from: 'brands',
           localField: 'brand_id',
           foreignField: '_id',
           as: 'brand',
           pipeline:[
               {
                   $project:{
                       name: 1,
                       _id: 1,
                       images:1,
                       slug:1
                   }
               }
           ]
       })
       .addFields({
           brand: { $arrayElemAt: ["$brand", 0] }
       })
       .lookup({
            from: 'categories',
               localField: 'category_ids',
               foreignField: '_id',
               as: 'categories',
           pipeline:[
               {
                   $project:{
                       name: 1,
                       _id: 1,
                       images:1,
                       slug:1
                   }
               }
           ]
       });


  return data
}

export async function getDetailProduct({id}) {
    const existProduct = await Product.exists({_id: id});
    if(!existProduct) throw createHttpError.NotFound('Cannot find product');

    const productInfo = await Product.aggregate()
        .match({
            _id:new mongoose.Types.ObjectId(id)
        })
        .lookup({
            from: 'brands',
            localField: 'brand_id',
            foreignField: '_id',
            as: 'brand',
            pipeline:[
                {
                    $project:{
                        name: 1,
                        _id: 1,
                        images:1,
                        slug:1
                    }
                }
            ]
        })
        .addFields({
            brand: { $arrayElemAt: ["$brand", 0] }
        })
        .lookup({
            from: 'categories',
            localField: 'category_ids',
            foreignField: '_id',
            as: 'categories',
            pipeline:[
                {
                    $project:{
                        name: 1,
                        _id: 1,
                        images:1,
                        slug:1
                    }
                }
            ]
        })
        .addFields({
            categories: { $arrayElemAt: ["$categories", 0] }
        })


    const productImages = await ProductImage.aggregate()
        .match({
            product_id:new mongoose.Types.ObjectId(id)
        })
        .lookup({
            from: 'images',
            foreignField: '_id',
            localField: '_image_id',
            as: 'images'
        })


    const productVariant = await ProductVariant.aggregate()
        .match({
            product_id:new mongoose.Types.ObjectId(id)
        })
        .lookup({
            from: 'product_variant_option',
            foreignField: '_id',
            localField: 'product_variant_option_id',
            as: 'variant_option'
        })
        .addFields({
            variant_option: { $arrayElemAt: ["$variant_option", 0] }
        })




    const options = await ProductOption.aggregate([
        {
            $match: {
                product_id:new mongoose.Types.ObjectId(id)
            }
        },
        {
            $group: {
                _id: "$title",
                data: {
                    $push: {
                        value: "$value",
                        _id: "$_id"
                    }
                }
            }
        },
        {
            $project: {
                title: "$_id",
                data: 1,
                _id: 0
            }
        }
    ])


    const newData = {...productInfo[0], images:productImages,productVariant:productVariant,options:options}


    return newData
}

