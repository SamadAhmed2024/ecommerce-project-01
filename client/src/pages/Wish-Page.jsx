import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import WishList from "../components/wish/Wish-List.jsx";
import Brands from "../components/product/Brands.jsx";

const WishPage = () => {
    return (
        <Layout>
            <WishList/>
            <Brands/>
        </Layout>
    );
};

export default WishPage;