import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import InvoiceList from "../components/invoice/Invoice-List.jsx";

const OrderPage = () => {
    return (
        <Layout>
            <InvoiceList/>
        </Layout>
    );
};

export default OrderPage;