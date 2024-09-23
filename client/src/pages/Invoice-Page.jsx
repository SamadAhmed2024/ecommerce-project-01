import React from 'react';
import Layout from "../components/layout/Layout.jsx";
import InvoiceDetails from "../components/invoice/Invoice-Details.jsx";

const InvoicePage = () => {
    return (
        <Layout>
            <InvoiceDetails/>
        </Layout>
    );
};

export default InvoicePage;