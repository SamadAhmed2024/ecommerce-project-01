const {UserOTPService,VerifyOTPService,SaveProfileServices,ReadProfileServices}=require("../services/UserServices")

exports.UserOTP=async (req,res)=>{
    let result= await UserOTPService(req)
    return res.status(200).json(result)
}

exports.VerifyLogin=async (req,res)=>{
    let result=await VerifyOTPService(req);

    if(result['status']==="success"){

        // Cookie Option
        let CookieOption={expires:new Date(Date.now()+24*6060*1000),httpOnly:false};

        // Set Cookie With Response
        res.cookie('token',result['token'],CookieOption);
        return res.status(200).json(result);
    }else{
        return res.status(200).json(result);
    }

}

exports.UserLogout=async (req,res)=>{
    let CookieOption={expires:new Date(Date.now()-24*6060*1000),httpOnly:false};
    res.cookie('token',"",CookieOption);
    return res.status(200).json({status:"success"});


}

exports.CreateProfile=async (req,res)=>{
    let result= await SaveProfileServices(req);
    return res.status(200).json(result)
}

exports.UpdateProfile=async (req,res)=>{
    let result= await SaveProfileServices(req);
    return res.status(200).json(result)
}

exports.ReadProfile=async (req,res)=>{
    let result=await ReadProfileServices(req);
    return res.status(200).json(result);
}