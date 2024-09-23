import React, {useEffect} from 'react';
import FeaturesStore from "../store/FeaturesStore.js";
import LegalContents from "../components/features/Legal-Contents.jsx";
import Layout from "../components/layout/Layout.jsx";

const AboutPage = () => {

    const {LegalDetailsRequest}=FeaturesStore()

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("about")
        })()

    }, []);


    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default AboutPage;