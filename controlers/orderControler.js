const userModel = require("../models/userModel")
const productsModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const userControl = require('../controlers/userControler')
const tab = require("./tabSelection")
const cartModel = require("../models/cartModel")
const orderModel = require("../models/orderModel")
var mongoose = require("mongoose");


const orderConfirmPage=async(req,res)=>{
    req.session.addressData=req.body;
    // copy starts
    const cart = await cartModel.find({ username: req.session.username })
     // const count = await cartModel.find().count();
        const cartPrice = await cartModel.aggregate([
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

        
        const subTotal = cartPrice.length > 0 ? (cartPrice[0].totalSum+0) : 0;//without shipping charge total
        const total = subTotal == 0 ? 0 : subTotal + 50;//shipping charge 50 is included here bacause its is flat rate
        const addDate=new Date();
        // const today = new Date().toISOString().split('T')[0];
        if (cart) {
           res.render("orderconfirm", { cart, total, subTotal });
        } else {
            res.render("orderconfirm", { cart: 0, total: 0, subTotal: 0 });
        }
    
    // copy ends
   

}



const addOrder=async (req,res)=>{
    try {
        const cart = await cartModel.find({ username: req.session.username })
        console.log(req.session.username)    
       
        // const count = await cartModel.find().count();       
      
        const addDate=new Date();
        // const today = new Date().toISOString().split('T')[0];
        const orderid = require('otp-generator')
        const id = orderid.generate(10, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });

        if (cart) {
            for(let i=0;i<cart.length;i++){
            const newOrder=new orderModel({
              
                orderId:id,
                username:req.session.username,
                name:req.session.addressData.name,
                orderDate:addDate,
                price:cart[i].price,
                status:"placed",
                adminCancel:0,
                product:cart[i].product,
                quantity:cart[i].quantity,
                address:{
                    houseName:req.session.addressData.housename,
                    city:req.session.addressData.city,
                    state:req.session.addressData.state,
                    pincode:req.session.addressData.pincode,
                    country:req.session.addressData.country,
                    phone:req.session.addressData.phone
                }
           
                

            })
            await newOrder.save()
        }
        //for deleting the cart db of that user after order placed
        await cartModel.deleteMany({ username: req.session.username })


            res.render("orderPlacedMessage", { id, addDate});
        } else {
           res.redirect("/checkout")
        }
    }
    catch (e) {
        console.log("error while saving data to odrder DB ORDER CONTROLER controller" + e)
        res.status(500).send("internal server error");
    }


}

module.exports = { addOrder,orderConfirmPage }