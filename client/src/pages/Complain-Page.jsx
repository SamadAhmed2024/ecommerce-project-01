import React, {useEffect} from 'react';
import FeaturesStore from "../store/FeaturesStore.js";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/Legal-Contents.jsx";

const ComplainPage = () => {
    const {LegalDetailsRequest}=FeaturesStore()

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("complain")
        })()

    }, []);


    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default ComplainPage;