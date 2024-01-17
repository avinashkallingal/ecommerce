const product=require("../models/productsModel")

const allProducts=async(req,res)=>{
    console.log("hi all product clicked")
const allProduct=await product.find();
req.session.allProduct=allProduct;
res.redirect(`/home/${req.session.username}`)
}
module.exports={allProducts}