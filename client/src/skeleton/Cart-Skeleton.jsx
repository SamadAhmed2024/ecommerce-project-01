import React from 'react';
import Lottie from "lottie-react";
import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";

const CartSkeleton = () => {
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card p-4">
                        <ul className="list-group list-group-flush">
                            {
                                Array.from({length: 4}).map((_, i) => {
                                    return (<li className="list-group-item d-flex align-items-start">
                                            <Lottie style={{width: "100px"}} animationData={ImagePlaceholder}
                                                    loop={true}/>
                                            <div className="p-3">
                                                <Skeleton count={3} style={{width: "200px"}}/>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSkeleton;