const mongoose=require("mongoose");
const express=require("express")

mongoose.connect("mongodb://0.0.0.0:27017/frutable")
.then(()=>{console.log("connection established with mongodb on collection cart")})
.catch(()=>{console.error(e.message)})

const cartSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    product:{
        type:String,
        required:true
    },
   image:{
    type:Array,
    required:true
    },
    price:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:1
    }
 
});

module.exports=mongoose.model("cart",cartSchema);