const mongoose=require("mongoose");
const express=require("express")

mongoose.connect("mongodb://0.0.0.0:27017/frutable")
.then(()=>{console.log("connection established with mongodb")})
.catch(()=>{console.error(e.message)})

const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
   caterory:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
});

module.exports=mongoose.model("products",productSchema);