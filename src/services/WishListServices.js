const WishModel=require("../models/WishModel")
const mongoose = require("mongoose");
const ObjectID=mongoose.Types.ObjectId

const WishListServices =async (req) => {
    try {
        let user_id=new ObjectID(req.headers.user_id);
        let matchStage={$match:{userID:user_id}}

        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage={$unwind:"$product"}

        let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage={$unwind:"$brand"}

        let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"}


        let projectionStage={
            $project:{
                '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0,'category.createdAt':0,'category.updatedAt':0,'brand.updatedAt':0,
                'brand.createdAt':0,"product.createdAt":0,"product.updatedAt":0

            }
        }

        let data=await WishModel.aggregate([
            matchStage,
            JoinStageProduct,
            JoinStageBrand,
            JoinStageCategory,
            unwindProductStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage
        ])

        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:"Something Went Wrong !"}
    }
}

const SaveWishListServices = async (req) => {
        try {
            let user_id=req.headers.user_id;
            let reqBody=req.body;
            reqBody.userID=user_id;
            await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true});

            return {status:"success",data:"Wish List Save Success"}

        }catch (e) {
            return {status:"fail",data:"Something went wrong"}
        }
}

const RemoveWishListServices = async (req) => {
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await WishModel.deleteOne(reqBody);

        return {status:"success",data:"Wish List Delete Success"}

    }catch (e) {
        return {status:"fail",data:"Something went wrong"}
    }
}



module.exports={
    SaveWishListServices,
    RemoveWishListServices,
    WishListServices,
}