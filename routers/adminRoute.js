const express = require("express")
const adminControl = require("../controlers/adminControler")
const addProducts = require("../controlers/add_products.Controler.js")
const upload=require("../controlers/multerControler.js")
const multer = require('multer');



const session = require("express-session")
const path=require('path')
const router = express.Router();

router.get("/",adminControl.adminLogin)
router.post("/verify",adminControl.adminCheck)
router.get("/home/:username",adminControl.isAdmin,adminControl.home_page)
router.get("/logout",adminControl.checkUserOut)

// router.post("/uploads",multer.cpUpload,(req,res)=>{
// console,log("image uploaded")
// })
router.get("/add_products",addProducts.showProducts)
router.post("/add_products/save",upload.single('avatar'),addProducts.addProducts)


module.exports = router;