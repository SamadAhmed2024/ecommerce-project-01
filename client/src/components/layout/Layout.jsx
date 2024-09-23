import React from 'react';
import AppNavbar from "./AppNavbar.jsx";
import Footer from "./Footer.jsx";
import {Toaster} from "react-hot-toast";

const Layout = (props) => {
    return (
        <>
         <AppNavbar/>
         {props.children}
         <Toaster position={"bottom-center"}/>
         <Footer/>
        </>
    );
};

export default Layout;