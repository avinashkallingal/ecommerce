const userModel = require("../models/userModel")
const productsModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const userControl = require('../controlers/userControler')
const tab = require("./tabSelection")
const cartModel = require("../models/cartModel")
var mongoose = require("mongoose");


const showCart = async (req, res) => {
    const cart = await cartModel.find({ username: req.session.username })
    console.log(req.session.username)
    const cartPrice=await cartModel.aggregate([
        { $match: { username: req.session.username } },
        {
          $project: {
            _id: 1,
            multiply: {
              $multiply: [
                { $toDouble: "$price" },
                { $toDouble: "$quantity" }
              ]
            }
          }
        },
        {
          $group: {
            _id: null, 
            totalSum: { $sum: "$multiply" }
          }
        }
      ])
      
      const cartPriceFound=cartPrice[0].totalSum;
      console.log(cartPrice[0].totalSum+"  totoal price ")
    if (cart) {
        res.render("cart", { cart,cartPriceFound })
    }
}

const addCart = async (req, res) => {
    try {

        const id = new mongoose.Types.ObjectId(req.params.productId)
        const quantityCheck = await cartModel.find({ $and: [{ username: req.session.username }, { productid: req.params.productId }] })
        // const categoryName = await product.find({ $and: [{ display: 1},{ category: params }]} );
        console.log(quantityCheck + " checking already product is there in cart")
        if (quantityCheck.length != 0) {
            console.log(" cart found")
            console.log(quantityCheck)
            await cartModel.updateOne({ productid: req.params.productId }, {
                $inc: { quantity: req.body.quantity }
            })
            res.redirect("/cart")
        }
        else {

            const productName = req.params.productName
            const userName = req.session.username
            console.log(req.session.username)
            const products = await productsModel.find({ _id: id })
            console.log(products)
            if (products) {
                const newCart = new cartModel({
                    username: userName,
                    product: products[0].productname,
                    productid: products[0]._id,
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
    }
    catch (e) {
        console.log("error while adding product to cart DB in cart controller " + e)
    }

}


const updateQuantityPlus = async (req, res) => {
    const product=req.params.productId
    const quantity=req.body.quantity;
    console.log("quantity update process")
        await cartModel.updateOne({productid:product},{ $inc: { quantity: 1 } })
    res.redirect("/cart")
}


const updateQuantityMinus = async (req, res) => {
    const product=req.params.productId
    const quantity=req.body.quantity;
      await cartModel.updateOne({productid:product},{ $inc: { quantity: -1 } })
    res.redirect("/cart")
}




const deleteCartElemet = async (req, res) => {
    const id = req.params.productId
    console.log(req.params.productId+" argument from cart page")
    try {
        await cartModel.deleteOne({productid:id})
        console.log("cart deleted")
        res.redirect("/cart")

    }
    catch (e) {
        console.log("error in cart control while deleting the cart elements"+e)

    }
}

module.exports = { showCart, addCart, deleteCartElemet,updateQuantityPlus,updateQuantityMinus }