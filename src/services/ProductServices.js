const mongoose =require('mongoose');
const BrandModel=require("../models/BrandModel");
const CategoryModel=require("../models/CategoryModel");
const ProductSliderModel=require("../models/ProductSliderModel");
const ProductModel=require("../models/ProductModel");
const ReviewModel=require("../models/ReviewModel");

const ObjectId= mongoose.Types.ObjectId;


const BrandListService=async ()=>{
     try {
        let data = await BrandModel.find();
        return { status:"success", data:data}
   }
   catch (e) {
         return { status:"fail", data:e}.toString()
     }
}


const CategoryListService = async () => {
    try {
        let data= await CategoryModel.find();
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const SliderListService = async () => {
    try {
        let data= await ProductSliderModel.find();
        return {status:"success",data:data}
    }
    catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const ListByBrandServices = async (req) => {

 try {

     let BrandID= new ObjectId(req.params.BrandID)

     let MatchStage={$match:{brandID:BrandID}};
     let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
     let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

     let UnwindBrandStage={$unwind:"$brand"};
     let UnwindCategoryStage={$unwind:"$category"};

     let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0}}

     //query
     let data = await ProductModel.aggregate([
         MatchStage,
         joinWithBrandStage,joinWithCategoryStage,
         UnwindBrandStage,UnwindCategoryStage,
         ProjectionStage

     ])

     return {status:"success",data:data}

     }
     catch (e) {
     return {status:"fail",data:e}.toString()

    }

}


const ListByCategoryService = async (req) => {

    try {

        let CategoryID= new ObjectId(req.params.CategoryID)

        let MatchStage={$match:{categoryID:CategoryID}};
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0}}

        //query
        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage

        ])

        return {status:"success",data:data}

    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }

}


const ListByRemarkService = async (req) => {

    try {

        let Remark= req.params.Remark

        let MatchStage={$match:{remark:Remark}};
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0}}

        //query
        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage

        ])

        return {status:"success",data:data}

    }
    catch (e) {
        return {status:"fail",data:e}.toString()

    }

}


const ListBySmilierService=async (req)=>{
    try {
        let CategoryID =  new ObjectId(req.params.CategoryID)
        let MatchStage = {$match:{categoryID:CategoryID}}

        let limitStage={$limit:3}

        let joinWithBrandStage = {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithCategoryStage = {$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}

        let ProjectionStage = {$project:{"brand._id":0,"brand.createdAt":0,"brand.updatedAt":0,"category._id":0,"category.createdAt":0,"category.updatedAt":0}}

        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage,limitStage
        ])
        return {status:"success",data:data}



    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const DetailsService= async (req)=>{
    try {
        let ProductID= new ObjectId(req.params.ProductID)

        let MatchStage={$match: {_id: ProductID}}
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let joinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}}

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwindDetailsStage={$unwind:"$details"}

        let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0,"details.createdAt":0,"details.updatedAt":0,}}


        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            joinWithDetailsStage,
            UnwindBrandStage,UnwindCategoryStage,
            UnwindDetailsStage,ProjectionStage,
        ])

        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",data:e}.toString()

    }
}


const ListByKeywordService=async (req)=>{
    try {
        let SearchRegex={"$regex":req.params.Keyword,"$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}

        let MatchStage={$match:SearchQuery}
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let joinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"details"}}

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwindDetailsStage={$unwind:"$details"}

        let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0,"details.createdAt":0,"details.updatedAt":0,}}

        let data = await ProductModel.aggregate([
            MatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            joinWithCategoryStage,joinWithDetailsStage,
            ProjectionStage,
        ])

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const ReviewListService =async (req)=>{
    try {
        let ProductID=new ObjectId(req.params.ProductID)
        let MatchStage={$match: {productID: ProductID}}

        let joinWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"profile"}}
        let UnwindProfileStage={$unwind:"$profile"}

        let ProjectionStage={$project:{"des":1,"rating":1,"profile.cus_name":1,"_id":0}}

        let data=await ReviewModel.aggregate([
            MatchStage,
            joinWithProfileStage,
            UnwindProfileStage,
            ProjectionStage
        ])


        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const CreateReviewService =async (req)=>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;

        let data=await ReviewModel.create({
            productID:reqBody["productID"],
            userID:user_id,
            des:reqBody["des"],
            rating:reqBody["rating"],
        })

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}


const ListByFilterService =async (req)=>{
    try {
        let MathConditions = {};
        if(req.body["categoryID"]){
            MathConditions.categoryID = new ObjectId(req.body["categoryID"]);
        }
        if(req.body["brandID"]){
            MathConditions.brandID = new ObjectId(req.body["brandID"]);
        }
        let MatchStage = {$match: MathConditions};



        let AddFieldsStage = {
            $addFields: { numericPrice: {$toInt: "$price"}}
        };
        let PriceMin = parseInt(req.body["PriceMin"]);
        let PriceMax = parseInt(req.body["PriceMax"]);
        let PriceMatchConditions = {};
        if(!isNaN(PriceMin)){
            PriceMatchConditions["numericPrice"] = {$gte: PriceMin};
        }
        if(!isNaN(PriceMax)){
            PriceMatchConditions["numericPrice"] = {...(PriceMatchConditions ["numericPrice"] || {}), $lte: PriceMax };
        }
        let PriceMatchStage = {$match: PriceMatchConditions};

        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};

        let UnwindBrandStage={$unwind:"$brand"};
        let UnwindCategoryStage={$unwind:"$category"};

        let ProjectionStage={$project:{"brand._id":0,"category._id":0,"categoryID":0,"brandID":0,"brand.createdAt":0,"brand.updatedAt":0,"category.createdAt":0,"category.updatedAt":0}}

        //query
        let data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            joinWithBrandStage,joinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,
            ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}




module.exports= {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandServices,
    ListByCategoryService,
    ListByRemarkService,
    ListBySmilierService,
    DetailsService,
    ListByKeywordService,
    ReviewListService,
    CreateReviewService,
    ListByFilterService
}