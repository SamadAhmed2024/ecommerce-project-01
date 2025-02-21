const UserModel=require("../models/UserModel")
const ProfileModel=require("../models/ProfileModel")
const EmailHelper=require("../utility/EmailHelper")

const {EncodeToken}=require("../utility/TokenHelper")

const UserOTPService =async (req)=>{
        try {
            let email= req.params.email;
            let code = Math.floor(100000+Math.random()*900000);

            let EmailText=`Your Verification code is= ${code}`;
            let EmailSubject="Email Verification";

            await EmailHelper(email,EmailText,EmailSubject);
            await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true});

            return {status:"success",message:"6 Digit OTP has been send"};
        }catch (e) {
            return {status:"fail",message:e};
        }

}

const VerifyOTPService = async (req) => {
    try {
        let email=req.params.email;
        let otp=req.params.otp;

        // User Count
        const total=await UserModel.find({email:email,otp:otp}).count("total");

        if(total===1){

            //User ID Read
            let user_id=await UserModel.find({email:email,otp:otp}).select('_id');


            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update to 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success",message:"Valid OTP",token:token};

        }else{
            return {status:"fail",message:"Invalid OTP"};
        }


    }catch (e) {
        return {status:"fail",message:"Invalid OTP"};
    }



}


const SaveProfileServices=async (req)=>{
    try {
        let user_id= req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await ProfileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true});
        return {status:"success",data:"Profile Save Success"}

    }catch (e) {
        return {status:"fail",data:"Something went wrong"}
    }
}


const ReadProfileServices =async (req) => {
    try {
        let user_id= req.headers.user_id;
        let result =await ProfileModel.find({userID:user_id})
        return {status:"success",data:result}

    }catch (e) {
        return {status:"fail",data:"Something went wrong"}
    }
}





module.exports={
    UserOTPService,
    VerifyOTPService,
    SaveProfileServices,
    ReadProfileServices
}