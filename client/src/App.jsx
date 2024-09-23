import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ProductByBrand from "./pages/Product-By-Brand.jsx";
import ProductByCategory from "./pages/Product-By-Category.jsx";
import ProductByKeyword from "./pages/Product-By-Keyword.jsx";
import ProductDetails from "./pages/Product-Details.jsx";
import AboutPage from "./pages/About-Page.jsx";
import RefundPage from "./pages/Refund-Page.jsx";
import PrivacyPage from "./pages/Privacy-Page.jsx";
import TermsPage from "./pages/Terms-Page.jsx";
import HowToBuy from "./pages/How-To-Buy.jsx";
import ContactPage from "./pages/Contact-Page.jsx";
import ComplainPage from "./pages/Complain-Page.jsx";
import LoginPage from "./pages/Login-Page.jsx";
import OTPPage from "./pages/OTP-Page.jsx";
import ProfilePage from "./pages/Profile-Page.jsx";
import CartPage from "./pages/Cart-Page.jsx";
import WishList from "./components/wish/Wish-List.jsx";
import WishPage from "./pages/Wish-Page.jsx";
import OrderPage from "./pages/Order-Page.jsx";
import InvoiceDetails from "./components/invoice/Invoice-Details.jsx";
import InvoicePage from "./pages/Invoice-Page.jsx";


function ScrollToTopOnNavigation() {
    const { pathname } = useLocation();
    useEffect(() => {
        const scroll = () => {
            window.scrollTo(0, 0);
        };
        requestAnimationFrame(scroll);
    }, [pathname]);
    return null;
}


const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTopOnNavigation/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/by-brand/:id" element={<ProductByBrand/>}/>
                <Route path="/by-category/:id" element={<ProductByCategory/>}/>
                <Route path="/by-keyword/:keyword" element={<ProductByKeyword/>}/>
                <Route path="/details/:id" element={<ProductDetails/>}/>

                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/refund" element={<RefundPage/>}/>
                <Route path="/privacy" element={<PrivacyPage/>}/>
                <Route path="/terms" element={<TermsPage/>}/>
                <Route path="/howtobuy" element={<HowToBuy/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/complain" element={<ComplainPage/>}/>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/otp" element={<OTPPage/>}/>

                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/wish" element={<WishPage/>}/>
                <Route path="/order" element={<OrderPage/>}/>
                <Route path="/invoice/:id" element={<InvoicePage/>}/>

            </Routes>
        </BrowserRouter>
    );
};

export default App;