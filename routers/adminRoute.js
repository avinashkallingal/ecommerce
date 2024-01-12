const express = require("express")
const adminControl = require("../controlers/adminControler")
const session = require("express-session")
const path=require('path')
const router = express.Router();

router.get("/",adminControl.adminLogin)
router.post("/verify",adminControl.adminCheck)
router.get("/home/:username",adminControl.isAdmin,adminControl.home_page)
router.get("/logout",adminControl.checkUserOut)


module.exports = router;