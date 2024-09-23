const {SaveWishListServices,RemoveWishListServices, WishListServices}=require("../services/WishListServices")


exports.WishList=async (req,res)=>{
    let result=await WishListServices(req);
    return res.status(200).json(result);
}


exports.SaveWishList=async (req,res)=>{
    let result= await SaveWishListServices(req)
    return res.status(200).json(result)
}


exports.RemoveWishList=async (req,res)=>{
    let result= await RemoveWishListServices(req)
    return res.status(200).json(result)
}