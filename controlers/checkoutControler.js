const userModel = require("../models/userModel")
const productsModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const userControl = require('../controlers/userControler')
const tab = require("./tabSelection")
const cartModel = require("../models/cartModel")
var mongoose = require("mongoose");

const showCheckout=(req,res)=>{
    res.render("checkout")
}




module.exports = { showCheckout }