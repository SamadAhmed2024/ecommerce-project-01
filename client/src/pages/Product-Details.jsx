import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import Details from "../components/product/Details.jsx";
import Brands from "../components/product/Brands.jsx";
import {useParams} from "react-router-dom";
import ProductStore from "../store/ProductStore.js";

const ProductDetails = () => {

    const {BrandList,DetailsRequest,ReviewsListRequest,BrandListRequest}=ProductStore()
    const {id}=useParams()

    useEffect(() => {

        (async ()=>{
            await DetailsRequest(id);
            await ReviewsListRequest(id);
            BrandList===null?await BrandListRequest():null;
        })()

    }, [id]);


    return (
        <Layout>
            <Details/>
            <Brands/>
        </Layout>
    );
};

export default ProductDetails;