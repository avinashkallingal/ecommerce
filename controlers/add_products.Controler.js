const productsModel = require("../models/productsModel")
const path = require("path")

const showProducts = (req, res) => {
    res.render("add_products")
}



//copy
const addProducts = async (req, res, next) => {
    try {

        console.log(req.body)
        let data = req.body
        console.log(data.stock)
        console.log(req.files)
        let imagePath = [];
        let len = req.files
        console.log("a data saved")
        for (let i = 0; i < len.length; i++) {
            imagePath[i] = req.files[i].path.replace(/\\/g, "/").replace('public/', '/')
        }

        // imagePath[1] = req.files[1].path.replace(/\\/g, "/").replace('public/', '/')
        // imagePath[2] = req.files[2].path.replace(/\\/g, "/").replace('public/', '/')
        // imagePath[3] = req.files[3].path.replace(/\\/g, "/").replace('public/', '/')
        console.log("a data saved 2")
        console.log(imagePath)
        const newProduct = new productsModel({

            productname: data.productname,
            category: data.category,
            price: data.price,
            description: data.description,
            imagepath: imagePath,
            list: 0,
            display: 0,
            stock: data.stock

        })
        // if(req.file){
        //     employee.avatar=req.file.path
        // }

        await newProduct.save()
        console.log("a data saved 3")
        res.redirect("/admin/add_products?success=Data Uploaded Successfully")
    }

    catch (e) {
        console.log("problem with the productdetails" + e)
    }


}
//copy




// const addProducts=async(req,res)=>{

//     console.log("adding product")



//     try{





//                 const newProduct=new productModel({
//                     name:req.body.name,
//                     price:req.body.price,
//                     caterory:req.body.caterory,
//                     discription:req.body.discription,
//                     stock:req.body.stock,

//                 })

//                 await newProduct.save();
//                 res.redirect("/?message=user created ,please login")






//     } catch ( error ) {

//         // For security proposes, error will always be 'Invalid or expired token'
//         console.error( error )

//         // But you can dig it up by checking `.parent` Error
//         console.error( error.parent );

//     }


// }
module.exports = { showProducts, addProducts }