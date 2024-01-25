const userModel = require("../models/userModel")
const productsModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const userControl = require('../controlers/userControler')
const tab = require("./tabSelection")
const cartModel = require("../models/cartModel")


const showCart = async(req, res) => {
    const cart=await cartModel.find({username:req.session.username})
    if(cart){
    res.render("cart",{cart})
    }
}

const addCart = async (req, res) => {
    try {
        const productName = req.params.productName
        const userName = req.session.username
        console.log(req.session.username)
        const products = await productsModel.find({ productname: productName })
        console.log(products)
        if (products) {
            const newCart = new cartModel({
                username: userName,
                product: products[0].productname,
                image: products[0].imagepath,
                price: products[0].price,
                quantity: req.body.quantity
            })

            await newCart.save();
            res.redirect("/cart")
        }
        else {
            console.log("product is not there")
        }
    }
    catch (e) {
        console.log("error while adding product to cart DB in cart controller " + e)
    }

}

module.exports = { showCart, addCart }