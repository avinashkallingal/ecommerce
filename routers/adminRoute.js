const express = require("express")
const adminControl = require("../controlers/adminControler")
const addProducts = require("../controlers/add_productsControler.js")
const upload=require("../controlers/multerControler.js")
const multer = require('multer');



const session = require("express-session")
const path=require('path')
const router = express.Router();

router.get("/",adminControl.adminLogin)
router.post("/verify",adminControl.adminCheck)
router.get("/home/:username",adminControl.isAdmin,adminControl.home_page)
router.get("/logout",adminControl.checkUserOut)

// add product router starts
router.get("/add_products",addProducts.showProducts)//router for showing add product page
router.post("/add_products/save",upload.array('image',4),addProducts.addProducts)//router for saving products ,used multer as middleware for adding multiple(4) images
// add product router ends



module.exports = router;