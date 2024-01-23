const userModel = require("../models/userModel")
const productModel = require("../models/productsModel")
const bcrypt = require("bcrypt")
const userControl = require("../controlers/userControler")
var mongoose = require("mongoose");
const fs = require("fs")




const adminLogin = (req, res) => {
    if (req.session.isAdminAuth) {
        username = req.session.username
        res.redirect(`/admin/home/${username}`);
        // res.redirect(`/home`)
    }
    else {
        const errorMessage = req.query.errorMessage
        const errUser = req.query.errUser
        const errPassword = req.query.errPassword
        res.render("login", { errorMessage, errUser, errPassword });
    }

}


const isAdmin = (req, res, next) => {
    if (req.session.isAdminAuth) {
        next();
    }
    else {

        res.redirect("/admin/?errorMessage=login again");
    }
}



const home_page = (req, res) => {
    var username = req.params.username
    res.render("admin_index", { username })
}

const adminCheck = async (req, res) => {
    try {
        var name = req.body.username
        var password = req.body.password
        const adminFound = await userModel.findOne({ username: req.body.username });
        console.log(adminFound)
        if (adminFound) {
            // const passCheck = await bcrypt.compare(adminFound.password, req.body.password);
            const checkPass = await bcrypt.compare(req.body.password, adminFound.password);
            console.log("password match " + checkPass)
            if (checkPass) {
                if (adminFound.isAdmin) {
                    req.session.isAdminAuth = true;
                    req.session.email = adminFound.email;
                    req.session.username = adminFound.username
                    console.log(req.session.username + "session storage")
                    console.log(adminFound.username + "db storage")
                    // res.send("hiii its home")
                    res.redirect(`/admin/home/${req.session.username}`)

                }
                else {
                    res.redirect("/admin/?errorMessage=authetication not permitted")
                }
            }
            else {
                res.redirect("/admin/?errPassword=invalid password")
            }
        }
        else {
            res.redirect("/admin/?errUser=invalid username")
        }
    }
    catch (e) {
        console.error(e.message);
        res.redirect("/?error?message=something went wrong while signing up")
    }
}


const showProducts = async (req, res) => {
    var products = await productModel.find();
    console.log("product list got")
    // console.log(products)

    res.render("listProducts", { products })
}


const checkUserOut = async (req, res) => {
    await req.session.destroy()
    console.log("session end ,sign out")
    res.redirect('/admin/?message=sign out successfully')
}

const unlistProduct = async (req, res) => {
    try {
        console.log(req.params.id)
        let products = await productModel.find({ productname: req.params.id })
        let unlist = products[0].display
        if (unlist == 1) {
            unlist = 0
        } else {
            unlist = 1
        }
        await productModel.updateOne({ productname: req.params.id }, { display: unlist })
        res.redirect('/admin/productlist')

    } catch (e) {
        console.log('error in the unlistProduct in adminController : ' + e)
    }
}




const editProduct = async (req, res) => {
    console.log("edit product")
    console.log(req.body)
    console.log("edit product body")
    console.log(req.params.id)
    console.log(req.files)

    var id = new mongoose.Types.ObjectId(req.params.id);
    console.log(id)


    try {
        let imagePath = [];
        let len = req.files
        
        if (req.files.length != 0) {
            console.log("image is there")
            for (let i = 0; i < len.length; i++) {
                imagePath[i] = req.files[i].path.replace(/\\/g, "/").replace('public/', '/')
            }

            await productModel.updateOne({ _id: id },
                {
                    $set:
                    {
                        productname: req.body.name,
                        price: req.body.price,
                        category: req.body.category,
                        description: req.body.description,
                        stock: req.body.stock,
                        imagepath: imagePath
                    }
                }
            )
        } else {
            await productModel.updateOne({ _id: id },
                {
                    $set:
                    {
                        productname: req.body.name,
                        price: req.body.price,
                        category: req.body.category,
                        description: req.body.description,
                        stock: req.body.stock,
                    }
                }
            )
        }

        // copy


        // imagePath[1] = req.files[1].path.replace(/\\/g, "/").replace('public/', '/')
        // imagePath[2] = req.files[2].path.replace(/\\/g, "/").replace('public/', '/')
        // imagePath[3] = req.files[3].path.replace(/\\/g, "/").replace('public/', '/')
        console.log("a data saved 2")
        console.log(imagePath)



        // copy

        res.redirect("/admin/productlist")
    }
    catch (e) {
        console.log("error while product update in admin controller" + e)
    }
}


const listusers = async (req, res) => {
    const users = await userModel.find();

    res.render("list_users", { users })
}



const blockuser = async (req, res) => {
    try {
        console.log(req.params.id)
        let users = await userModel.find({ username: req.params.id })
        let block = users[0].userBlock
        if (block == 0) {
            block = 1
        } else {
            block = 0
        }
        await userModel.updateOne({ username: req.params.id }, { userBlock: block })
        // userControl.checkUserOut_live();
        res.redirect('/admin/listusers')

    } catch (e) {
        console.log('error in the blockProduct in adminController : ' + e)
    }

}

module.exports = { adminLogin, adminCheck, home_page, checkUserOut, isAdmin, showProducts, unlistProduct, editProduct, listusers, blockuser }