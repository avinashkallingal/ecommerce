const mongoose=require("mongoose");
const express=require("express")

mongoose.connect("mongodb://0.0.0.0:27017/frutable")
.then(()=>{console.log("connection established with mongodb")})
.catch(()=>{console.error(e.message)})

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model("products",productSchema);