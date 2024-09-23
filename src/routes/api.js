const express=require('express');
const ProductController=require('../controller/ProductController');
const UserController=require("../controller/UserController")
const WishListController=require("../controller/WishListController")
const CartListController=require("../controller/CartListController");
const InvoiceController=require("../controller/InvoiceController");
const FeaturesController=require("../controller/FeaturesController");

const AuthVerification=require("../middlewares/AuthVerification")



const router=express.Router();


// Product
router.get("/ProductBrandList",ProductController.ProductBrandList)
router.get("/ProductCategoryList",ProductController.ProductCategoryList)
router.get("/ProductSliderList",ProductController.ProductSliderList)

router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:Remark",ProductController.ProductListByRemark)

router.get("/ProductListBySimilar/:CategoryID",ProductController.ProductListBySimilar)
router.get("/ProductDetails/:ProductID",ProductController.ProductDetails)

router.get("/ProductListByKeyword/:Keyword",ProductController.ProductListByKeyword)
router.get("/ProductReviewList/:ProductID",ProductController.ProductReviewList)

router.post("/ProductListByFilter",ProductController.ProductListByFilter)


// user
router.get("/UserOTP/:email",UserController.UserOTP)
router.get("/VerifyLogin/:email/:otp",UserController.VerifyLogin)
router.get("/UserLogout",AuthVerification,UserController.UserLogout)
router.post("/CreateProfile",AuthVerification,UserController.CreateProfile)
router.post("/UpdateProfile",AuthVerification,UserController.UpdateProfile)

router.get("/ReadProfile",AuthVerification,UserController.ReadProfile)



//wish
router.post("/SaveWishList",AuthVerification,WishListController.SaveWishList)
router.post("/RemoveWishList",AuthVerification,WishListController.RemoveWishList)
router.get("/WishList",AuthVerification,WishListController.WishList)


// cart list
router.get("/CartList",AuthVerification,CartListController.CartList)
router.post("/SaveCartList",AuthVerification,CartListController.SaveCartList)
router.post("/RemoveCartList",AuthVerification,CartListController.RemoveCartList)
router.post("/UpdateCartList/:CartID",AuthVerification,CartListController.UpdateCartList)


// Invoice & Payment
router.get("/CreateInvoice",AuthVerification,InvoiceController.CreateInvoice)

router.get("/InvoiceList",AuthVerification,InvoiceController.InvoiceList)
router.get("/InvoiceProductList/:invoice_id",AuthVerification,InvoiceController.InvoiceProductList)

router.post("/PaymentSuccess/:trxID",AuthVerification,InvoiceController.PaymentSuccess)
router.post("/PaymentFail/:trxID",AuthVerification,InvoiceController.PaymentFail)
router.post("/PaymentCancel/:trxID",AuthVerification,InvoiceController.PaymentCancel)
router.post("/PaymentIPN/:trxID",AuthVerification,InvoiceController.PaymentIPN)


// Features List
router.get("/FeatureList",FeaturesController.FeatureList)
router.get("/LegalDetails/:type",FeaturesController.LegalDetails)



// Create Review
router.post("/CreateReview",AuthVerification,ProductController.CreateReview)




module.exports=router;