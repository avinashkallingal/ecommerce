const express = require("express")
const userControl = require("../controlers/userControler")
const tab = require("../controlers/tabSelection")
const session = require("express-session")
const path=require('path')
const productsModel = require("../models/productModel")
const cartControl = require('../controlers/cartControler')
const checkoutControl = require('../controlers/checkoutControler')
const orderControl = require('../controlers/userOrderControler')


const router = express.Router();



router.get("/",userControl.login_page)
router.post("/user_signin", userControl.checkUserIn)
router.get("/signup", userControl.signup_page)
router.post("/adduser/verifyemail", userControl.verifyEmail)
router.get("/adduser/verify_page",userControl.verify_page)
router.post("/adduser/verifyemail", userControl.verifyEmail)
router.all("/adduser/save", userControl.addUser)
router.get("/signout",userControl.checkUserOut)






router.get("/home",userControl.isUser, userControl.homePage)
router.get("/home/:category",userControl.isUser, userControl.homePageCategory)



// router.get("/home/vegitable",userControl.isUser, userControl.home_page_vegitable)
// router.get("/home/fruit",userControl.isUser, userControl.home_page_fruit)
// router.get("/home/bread",userControl.isUser, userControl.home_page_bread)




//router to show product details
router.get('/productdetails/:productname',userControl.isUser,userControl.productDetails)

//router to show cart
router.get("/cart", cartControl.showCart)

//router to submit to cart
router.post("/addToCart/:productId", cartControl.addCart)
router.get("/addToCart/:productId", cartControl.addCartSigleProduct)

//Rrouter for updating quantity value
router.get("/updateQuantityMinus/:productId",cartControl.updateQuantityMinus)
router.get("/updateQuantityPlus/:productId",cartControl.updateQuantityPlus)

//router for delete cart elements
router.get("/cartElementDelete/:productId",cartControl.deleteCartElemet)

//router to show checkout page
router.get("/checkout",checkoutControl.showCheckout)

//router to add data to order DB
router.post("/confirmpage",orderControl.orderConfirmPage)
router.get("/addtoorder",orderControl.addOrder)






module.exports = router