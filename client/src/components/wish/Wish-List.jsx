import React, {useEffect} from 'react';
import WishStore from "../../store/WishStore.js";
import {Link} from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import ProductsSkeleton from "../../skeleton/Products-Skeleton.jsx";
import NoData from "../layout/No-Data.jsx";
import ProductStore from "../../store/ProductStore.js";

const WishList = () => {

    const {WishListRequest,WishList,RemoveWishListRequest}=WishStore()
    const {BrandListRequest}=ProductStore()


    useEffect(() => {

        (async ()=>{
            await WishListRequest()
            await BrandListRequest()
        })()

    }, []);

    const RemoveItem=async (productID)=>{
        await RemoveWishListRequest(productID)
        await WishListRequest()
        await BrandListRequest()
    }

    if(WishList===null){
        return (
            <div className="container">
                <div className="row">
                    <ProductsSkeleton/>
                </div>
            </div>
        )
    }else if(WishList.length===0){
        return (
            <NoData/>
        )
    }else{
        return (
            <div className="container ">
                <div className="row">
                    {
                        WishList.map((item, i) => {

                            let price = <p
                                className="bodyMedium  text-dark my-1">Price: ${item["product"]["price"]}</p>
                            if (item["product"]["discount"] === true) {
                                price =
                                    <p className="bodyMedium text-dark my-1">Price: <strike>${item["product"]["price"]}</strike> ${item["product"]["discountPrice"]}
                                    </p>
                            }
                            return (
                                <div key={i}
                                     className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">

                                    <div className="card shadow-sm h-100 rounded-3 bg-white">
                                        <img alt="img" className="w-100 rounded-top-2"
                                             src={item["product"]["image"]}/>
                                        <div className="card-body">
                                            <p className="bodySmal text-secondary my-1">{item["product"]["title"]}</p>
                                            {price}
                                            <StarRatings
                                                rating={parseFloat(item["product"]["star"])}
                                                starRatedColor="red"
                                                starDimension="15px" starSpacing="2px"/>

                                            <p>
                                                <button onClick={async ()=>{await RemoveItem(item["productID"])}} className="btn btn-outline-danger btn-sm mt-3">Remove</button>
                                                <Link to={`/details/${item["productID"]}`} className="btn btn-outline-success mx-2 btn-sm mt-3">Details</Link>
                                            </p>

                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        );
    }

};

export default WishList;