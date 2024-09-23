import React, {useEffect} from 'react';
import FeaturesStore from "../store/FeaturesStore.js";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/Legal-Contents.jsx";

const PrivacyPage = () => {
    const {LegalDetailsRequest}=FeaturesStore()

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("privacy")
        })()

    }, []);


    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default PrivacyPage;