import React from 'react';
import UserSubmitButton from "./UserSubmitButton.jsx";
import UserStore from "../../store/UserStore.js";
import {useNavigate} from "react-router-dom";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";


const OtpForm = () => {

    let navigate = useNavigate()
    let {OTPFormData,OTPFormOnChange,VerifyLoginRequest}=UserStore()

    const OnFormSubmit = async () => {

        if(ValidationHelper.IsEmpty(OTPFormData.otp)){
            toast.error("Valid Pin Required")
        }else {
            let res = await VerifyLoginRequest(OTPFormData.otp)
            res?navigate("/"):(toast.error("Something Went Wrong"))
        }
    }


    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provide</p>
                        <input value={OTPFormData.otp} onChange={(e)=>{OTPFormOnChange("otp",e.target.value)}} placeholder="Verification" type="text" className="form-control"/>
                        <UserSubmitButton onClick={OnFormSubmit} submit={false} className="btn mt-3 btn-success" text="Submit"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpForm;