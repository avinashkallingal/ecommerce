const express = require("express")
const userControl = require("../controlers/userControler")
const tab = require("../controlers/tab_selection")
const session = require("express-session")
const path=require('path')


const router = express.Router();



router.get("/",userControl.login_page)
router.post("/user_signin", userControl.checkUserIn)
router.get("/signup", userControl.signup_page)
router.post("/adduser/verifyemail", userControl.verifyEmail)
router.get("/adduser/verify_page",userControl.verify_page)
router.post("/adduser/verifyemail", userControl.verifyEmail)
router.all("/adduser/save", userControl.addUser)
router.get("/signout",userControl.checkUserOut)


router.get("/tab1",tab.allProducts)



router.get("/home/:username",userControl.isUser, userControl.home_page)


module.exports = router