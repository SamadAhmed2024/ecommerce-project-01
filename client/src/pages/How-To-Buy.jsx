import React, {useEffect} from 'react';
import FeaturesStore from "../store/FeaturesStore.js";
import Layout from "../components/layout/Layout.jsx";
import LegalContents from "../components/features/Legal-Contents.jsx";

const HowToBuy = () => {
    const {LegalDetailsRequest}=FeaturesStore()

    useEffect(() => {

        (async ()=>{
            await LegalDetailsRequest("howtobuy")
        })()

    }, []);


    return (
        <Layout>
            <LegalContents/>
        </Layout>
    );
};

export default HowToBuy;