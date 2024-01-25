const userModel = require("../models/userModel")
const tab = require("./tabSelection")
const bcrypt = require("bcrypt")
const sendEmail = require("../utils/sendEmail")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const otpGenerator = require('otp-generator')
const productsModel = require("../models/productModel")
const categoryModel = require('../models/categoryModel')
const session=require('express-session')





//for render login page and checking session value is there in session storage
const login_page = (req, res) => {
    invalidUser = req.query.errUser;
    invalidPass = req.query.errPassword
    message = req.query.message
    console.log(req.session.isUserAuth + " session is there or not")
    if (req.session.isUserAuth) {
        res.redirect("/home")
    }
    else {

        res.render("userLogin", { invalidUser, invalidPass, message });
    }
}

const isUser = (req, res, next) => {
    if (req.session.isUserAuth) {
        next();
    }
    else {

        res.redirect("/?message=login again");
    }
}






//for rendering signup page
const signup_page = (req, res) => {
    var message = req.query.message
    res.render("userSignup", { message });

}






// adding user on signup post method
const verifyEmail = async (req, res) => {
    const userFound = await userModel.findOne({ username: req.body.username });
    const userEmail = await userModel.findOne({ email: req.body.email });
    console.log("database check")
    try {
        if (userFound) {

            console.log("user found")
            res.redirect("/signup?message=user already exist");
        }
        else if (userEmail) {
            console.log("email found")
            res.redirect("/signup?message=try another email");
        }
        else {
            req.session.content = req.body;

            const result = {
                id: req.body.id,
                name: req.body.username,
                email: req.body.email,
                phone: req.body.phone
            }
            // const token=await jwt.sign(result,secret,{
            //     expiresIn:86400,
            // })


            const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

            req.session.otp = OTP;
            console.log(req.session.otp + " in otp generator function")

            sendEmail(result.email, result.name, OTP)
            res.redirect("/adduser/verify_page")
            console.log("database check2")

        }
    }
    catch (e) {
        console.log(e.message);
        res.redirect("/error?message=something went wrong while signing up")
    }

}











const homePage = async (req, res) => {
    const allProduct = await tab.allProducts();
    const categoryName = await tab.categoryName();
    console.log(categoryName+" category name")
    // const category = await categoryModel.find({})
    // console.log(category)
    var username = req.session.username
    res.render("index", { username, allProduct,categoryName })
}


const homePageCategory = async (req, res) => {
    console.log("category clicked")
    const params=req.params.category
    console.log(params+" category name is this")
    const categoryName = await tab.categoryName();
    const category = await tab.category(params);
    var username = req.session.username
    res.render("index", { username, category,categoryName })
}


// const home_page_vegitable = async (req, res) => {
//     console.log("vegitable clicked")
//     const vegitable = await tab.vegitables();
//     var username = req.session.username
//     res.render("index", { username, vegitable })
// }

// const home_page_fruit = async (req, res) => {
//     const fruit = await tab.fruits();
//     var username = req.session.username
//     res.render("index", { username, fruit })
// }


// const home_page_bread = async (req, res) => {
//     const bread = await tab.breads();
//     var username = req.session.username
//     res.render("index", { username, bread })
// }




// const home_page=(req,res)=>{
//     const allProduct=tab.allProducts();
//      username=req.params.username;
//          allProduct=req.session.allProduct
//      if(req.session.vegitable){
//          vegitable=req.session.vegitable}
//          else{
//              vegitable="";
//          }
//      if()
//      fruit=req.session.fruit
//      bread=req.session.bread
//      console.log(req.params.username)
//      console.log(req.session.allProduct)
//      res.render("index",{username,allProduct,vegitable,fruit,bread})
//  }




const verify_page = async (req, res) => {
    message = req.query.message;
    res.render("emailVerify_page", { message })
}






const addUser = async (req, res) => {
    const token_check = req.body.otp;
    const token_link = req.query.token
    console.log(req.session.otp + " in adduser function")
    console.log(req.body.otp + " typed otp")

    try {
        if (token_check == req.session.otp || token_link == req.session.otp) {

            //copy

            const hashPassword = await bcrypt.hash(req.session.content.password, 10);
            const email = req.session.content.email;
            const newUser = new userModel({
                username: req.session.content.username,
                email: req.session.content.email,
                password: hashPassword,
                phone: req.session.content.phone,
                isAdmin: 0,
                userBlock: 0
            })

            await newUser.save();
            res.redirect("/?message=user created ,please login")


            //copy
        }
        else {
            res.redirect("/adduser/verify_page?message=wrong otp")
        }

    } catch (error) {

        // For security proposes, error will always be 'Invalid or expired token'
        console.error(error)

        // But you can dig it up by checking `.parent` Error
        console.error(error.parent);

    }


}













//user login authentication and adding a session value for that user
const checkUserIn = async (req, res) => {
    try {
        const checkUser = await userModel.findOne({ username: req.body.username });
        if (checkUser) {
            const checkPass = await bcrypt.compare(req.body.password, checkUser.password);
            if (checkPass) {
                if(checkUser.userBlock==0){
                req.session.isUserAuth = true;
                req.session.email = checkUser.email;
                req.session.username = checkUser.username
                console.log(req.session.username + "session storage")
                console.log(checkUser.username + "db storage")
                // res.send("hiii its home")
                res.redirect(`/home`)
                }
                else{
                    res.redirect("/?errUser=Admin blocked this user")
                }

            } else {
                res.redirect("/?errPassword=invalid password")
            }
        }
        else {
            res.redirect("/?errUser=invalid username")
        }

    }
    catch (e) {
        console.log("e.message")
        res.redirect("/?error?message=something went wrong while signing up")
    }
}


const productDetails=async (req,res)=>{
    try{
       const username=req.session.username
    const product=await productsModel.find({productname:req.params.productname})
    if(product){
        console.log("found product")
        console.log(product)
    res.render("shopdetails",{product,username})
    
    }}
    catch(e){
        console.log("error in user control productdetails function"+e)
    }
    }






const checkUserOut = async (req, res) => {
    await req.session.destroy()
    console.log("session end ,sign out")
    res.redirect('/?message=sign out successfully')
}

// const checkUserOut_live = async (req, res) => {
//     console.log("live session area")
//     if (req.session.isUserAuth) {
//         await req.session.isUserAuth.destroy()
//     } else {
//         res.status(401).send('Unauthorized');
//         console.log("no sessions found")
//     }
// }





module.exports = { login_page, signup_page, addUser, checkUserIn, isUser, verify_page,homePageCategory, checkUserOut, homePage, verifyEmail,productDetails }