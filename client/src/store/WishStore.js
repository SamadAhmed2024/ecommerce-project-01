import create from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/Utility.js";

const WishStore=create((set)=>({

    IsWishSubmit:false,
    WishSaveRequest:async (productID)=>{
        try {
            set({IsWishSubmit:true})
            let res = await axios.post(`/api/v1/SaveWishList`,{productID:productID});
            if(res.data["status"]==="success"){
                return true
            }else {
                return false
            }
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({IsWishSubmit:false})
        }
    },

    WishList:null,
    WishCount:0,
    WishListRequest:async ()=>{
        try {
            let res = await axios.get(`/api/v1/WishList`)
            set({WishList:res.data["data"]})
            set({WishCount:(res.data["data"]).length})
        }catch (e) {
            unauthorized(e.response.status)
        }
    },

    RemoveWishListRequest:async (productID)=>{
        try {
            set({WishList:null})
            await axios.post(`/api/v1/RemoveWishList`,{"productID":productID})
        }catch (e) {
            unauthorized(e.response.status)
        }
    }

}))

export default WishStore;