import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import CartList from "../components/cart/Cart-List.jsx";
import Categories from "../components/product/Categories.jsx";

const CartPage = () => {
    return (
        <Layout>
            <CartList/>
            <Categories/>
        </Layout>
    );
};

export default CartPage;