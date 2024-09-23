import React, {useEffect} from 'react';
import Layout from "../components/layout/Layout.jsx";
import Brands from "../components/product/Brands.jsx";
import ProductStore from "../store/ProductStore.js";
import FeaturesStore from "../store/FeaturesStore.js";
import Slider from "../components/product/Slider.jsx";
import Features from "../components/product/Features.jsx";
import Categories from "../components/product/Categories.jsx";
import Products from "../components/product/Products.jsx";


const HomePage = () => {

    const {BrandListRequest,CategoryListRequest,SliderListRequest,ListByRemarkRequest}=ProductStore();
    const {FeatureListRequest}=FeaturesStore();

    useEffect(() => {

        (async ()=>{
            await SliderListRequest();
            await FeatureListRequest();
            await CategoryListRequest();
            await ListByRemarkRequest("new");
            await BrandListRequest()
        })()

    }, []);

    return (
        <Layout>
            <Slider/>
            <Features/>
            <Categories/>
            <Products/>
            <Brands/>
        </Layout>
    );
};

export default HomePage;