import React from 'react';
import parse from "html-react-parser"
import FeaturesStore from "../../store/FeaturesStore.js";
import LegalContentSkeleton from "../../skeleton/Legal-Content-Skeleton.jsx";
const LegalContents = () => {

    const {LegalDetails}=FeaturesStore()

    if(LegalDetails===null){
        return <LegalContentSkeleton/>
    }else{
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            {
                                parse(LegalDetails[0]["description"])
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default LegalContents;