import create from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/Utility.js";

const CartStore=create((set)=>({

    IsCartSubmit:false,
    CartForm:{productID:"",color:"",size:""},
    CartFormChange:(name,value)=>{
        set((state)=>({
            CartForm:{
                ...state.CartForm,
                [name]:value
            }
        }))
    },

    CartSaveRequest:async (PostBody,productID,Quantity)=>{
        try {
            set({IsCartSubmit:true})
            PostBody.productID=productID
            PostBody.qty=Quantity
            let res=await axios.post(`/api/v1/SaveCartList`,PostBody)
                if(res.data["status"]==="success"){
                    return true
                }else {
                    return false
                }
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({IsCartSubmit:false})
        }
    },

    CartList:null,
    CartCount:0,
    CartTotal:0,
    CartVatTotal:0,
    CartPayableTotal:0,
    CartListRequest:async ()=>{
        try {
            let res=await axios.get(`/api/v1/CartList`)
            set({CartList:res.data["data"]})
            set({CartCount:(res.data["data"]).length})
            let total=0
            let vat =0
            let payable = 0
            res.data["data"].forEach((item,i)=>{
                if(item["product"]["discount"]===true){
                    total=total+parseInt(item["qty"])*parseInt(item["product"]["discountPrice"])
                }else{
                    total=total+parseInt(item["qty"])*parseInt(item["product"]["price"])
                }
            })

            vat =total*0.05
            payable=vat+total
            set({CartTotal:total})
            set({CartVatTotal:vat})
            set({CartPayableTotal:payable})

        }catch (e) {
            unauthorized(e.response.status)
        }
    },

    RemoveCartListRequest:async (CartID)=>{
        try {
            set({CartList:null})
            await axios.post(`/api/v1/RemoveCartList`,{"_id":CartID})
        }catch (e) {
            unauthorized(e.target.status)
        }
    },

    CreateInvoiceRequest:async ()=>{
        try {
            set({isCartSubmit:true})
            let res=await axios.get(`/api/v1/CreateInvoice`)
            window.location.href=res.data["data"]["GatewayPageURL"]
        }catch (e) {
            unauthorized(e.response.status)
        }finally {
            set({isCartSubmit:false})
        }
    },

    InvoiceList:null,
    InvoiceListRequest:async ()=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceList`)
            set({InvoiceList:res.data["data"]})
        }catch (e) {
            unauthorized(e.response.status)
        }
    },

    InvoiceDetails:null,
    InvoiceDetailsRequest:async (id)=>{
        try {
            let res=await axios.get(`/api/v1/InvoiceProductList/${id}`)
            set({InvoiceDetails:res.data["data"]})
        }catch (e) {
            unauthorized(e.response.status)
        }
    }




}))


export default CartStore;