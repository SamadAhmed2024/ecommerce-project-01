import React, {useState} from 'react';
import ProductImages from "./ProductImages.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/Details-Skeleton.jsx";
import parse from "html-react-parser";
import Reviews from "./Reviews.jsx";
import CartStore from "../../store/CartStore.js";
import toast from "react-hot-toast";
import CartSubmitButton from "../cart/CartSubmitButton.jsx";
import WishStore from "../../store/WishStore.js";
import WishSubmitButton from "../wish/WishSubmitButton.jsx";

const Details = () => {

    const {Details}=ProductStore()
    const {CartForm,CartFormChange,CartSaveRequest,CartListRequest}=CartStore()
    const {WishSaveRequest,WishListRequest}=WishStore()
    
    const [Quantity,SetQuantity]=useState(1)
    
    const IncrementQuantity = () => {
        SetQuantity(Quantity=> Quantity+1)
    }

    const DecrementQuantity = () => {
        if(Quantity>1){
            SetQuantity(Quantity=> Quantity-1)
        }
    }
    
    const AddToCart = async (productID) => {
        let res = await CartSaveRequest(CartForm,productID,Quantity);
        if(res){
            toast.success("Cart Item Added")
            await CartListRequest()
        }
    }

    const AddWish = async (productID) => {
        let res = await WishSaveRequest(productID);
        if(res){
            toast.success("Wish Item Added")
            await WishListRequest()
        }
    }

    if(Details===null){
        return <DetailsSkeleton/>
    }else {
        return (
            <div>
                <div className="container mt-2">

                    <div className="row">
                        <div className="col-md-7 p-3">
                            <ProductImages/>
                        </div>
                        <div className="col-md-5 p-3">
                            <h4>{Details[0]["title"]}</h4>
                            <p className="text-muted bodySmal my-1">Brand: {Details[0]["brand"]["brandName"]}</p>
                            <p className="text-muted bodySmal my-1">Category: {Details[0]["category"]["categoryName"]}</p>
                            <p className="bodySmal mb-2 mt-1">{Details[0]["shortDes"]}</p>
                            {
                                Details[0]["discount"]?(
                                    <span className="text-dark bodyXLarge">Price:<strike className="text-secondary"> {Details[0]["price"]} </strike> {Details[0]["discountPrice"]} </span>
                                ): (
                                    <span>{Details[0]["price"]}</span>
                                )
                            }

                            <div className="row">
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Size</label>
                                    <select value={CartForm.size} onChange={(e) => {
                                        CartFormChange("size", e.target.value)
                                    }} className="form-control my-2 form-select">
                                        <option value="">Size</option>
                                        {
                                            Details[0]["details"]["size"].split(",").map((item, i) => {
                                                return <option value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Color</label>
                                    <select value={CartForm.color} onChange={(e) => {
                                        CartFormChange("color", e.target.value)
                                    }} className="form-control my-2 form-select">
                                        <option value="">Color</option>
                                        {
                                            Details[0]["details"]["color"].split(",").map((item, i) => {
                                                return <option value={item}>{item}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="bodySmal">Quantity</label>
                                    <div className="input-group my-2">
                                        <button onClick={DecrementQuantity} className="btn btn-outline-secondary">-
                                        </button>
                                        <input value={Quantity} type="text"
                                               className="form-control bg-light text-center" readOnly/>
                                        <button onClick={IncrementQuantity} className="btn btn-outline-secondary">+
                                        </button>
                                    </div>
                                </div>
                                <div className="col-4 p-2">
                                    <CartSubmitButton onClick={async () => {await AddToCart(Details[0]["_id"])}} className="btn w-100 btn-success" text="Add to Cart"/>
                                </div>
                                <div className="col-4 p-2">
                                    <WishSubmitButton onClick={async () => {await AddWish(Details[0]["_id"])}} className="btn w-100 btn-success" text="Add to Wish"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">

                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                        aria-selected="true">Specification
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                        data-bs-target="#pills-profile" type="button" role="tab"
                                        aria-controls="pills-profile" aria-selected="false">Review
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                 aria-labelledby="pills-home-tab">
                                {
                                    parse(Details[0]['details']['des'])
                                }
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                 aria-labelledby="pills-profile-tab">
                                <Reviews/>
                            </div>

                        </div>


                    </div>


                </div>
            </div>
        );
    }

};

export default Details;