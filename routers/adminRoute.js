const express = require("express")
const adminControl = require("../controlers/adminControler")
const addProducts = require("../controlers/addProductsControler.js")
const upload=require("../controlers/multerControler.js")
const multer = require('multer');



const session = require("express-session")
const path=require('path')
const router = express.Router();

router.get("/",adminControl.adminLogin)
router.post("/verify",adminControl.adminCheck)
router.get("/home/:username",adminControl.isAdmin,adminControl.home_page)
router.get("/home",adminControl.isAdmin,adminControl.home_page)
router.get("/logout",adminControl.checkUserOut)


//router to show products
router.get("/productlist",adminControl.isAdmin,adminControl.showProducts)

//router to update product
router.post("/edit_products/:id",adminControl.isAdmin,upload.array('image',4),adminControl.editProduct)

//router to add product
router.get("/add_products",adminControl.isAdmin,addProducts.showProducts)//router for showing add product page
router.post("/add_products/save",adminControl.isAdmin,upload.array('image',4),addProducts.addProducts)//router for saving products ,used multer as middleware for adding multiple(4) images


// router to unlist the product
router.get('/unlist/:id',adminControl.isAdmin,adminControl.unlistProduct)


//router to list users
router.get('/listusers',adminControl.isAdmin,adminControl.listusers)

//router to block users
router.get('/block/:id',adminControl.isAdmin,adminControl.blockuser)





module.exports = router;