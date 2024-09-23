const {CartListServices, SaveCartListServices, RemoveCartListServices, UpdateCartListServices}=require("../services/CartListServices")


exports.CartList=async (req,res)=>{
    let result= await CartListServices(req);
    return res.status(200).json(result)
}

exports.SaveCartList=async (req,res)=>{
    let result= await SaveCartListServices(req);
    return res.status(200).json(result)
}

exports.RemoveCartList=async (req,res)=>{
    let result= await RemoveCartListServices(req);
    return res.status(200).json(result)
}

exports.UpdateCartList=async (req,res)=>{
    let result= await UpdateCartListServices(req);
    return res.status(200).json(result)
}