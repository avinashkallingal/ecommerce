const express = require("express")
const adminControl = require("../controlers/adminControler")
const addProducts = require("../controlers/addProductsControler.js")
const upload=require("../controlers/multerControler.js")
const multer = require('multer');
const adminOrderControl = require("../controlers/adminOrderControler.js")



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

//router to list category
router.get('/listcategory',adminControl.isAdmin,adminControl.listCategory)

//router to add category
router.post('/addCategory',adminControl.isAdmin,adminControl.addCategory)

//router to edit category
router.post('/editCategory/:id',adminControl.isAdmin,adminControl.editCategory)

//router to unlist category
router.get('/unlistCategory/:id',adminControl.isAdmin,adminControl.unlistCategory)



//router to block users
router.get('/block/:id',adminControl.isAdmin,adminControl.blockuser)


//router to list orders
router.get('/orderlist',adminControl.isAdmin,adminOrderControl.listOrders)

router.get('/statusUpdate',adminControl.isAdmin,adminOrderControl.updateStatus)

router.get('/cancelOrder',adminControl.isAdmin,adminOrderControl.cancelOrder)






module.exports = router;