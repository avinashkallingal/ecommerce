const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")

const adminLogin = (req, res) => {
    if(req.session.isAdminAuth)
    {
        username=req.session.username
        res.redirect(`/admin/home/${username}`);
        res.redirect(`/home`)
    }
    else{
        res.render("login");
    }
   
}


const isAdmin=(req,res,next)=>{
    if(req.session.isAdminAuth){
        next();}
    else{
        
        res.redirect("/admin/?message=login again");
    }
}



const home_page = (req, res) => {
    var username=req.params.username
    res.render("admin_index",{username})
}

const adminCheck = async (req, res) => {
    try{
    var name = req.body.username
    var password = req.body.password
    const adminFound = await userModel.findOne({ username: req.body.username });
        console.log(adminFound)
    if (adminFound) {
        // const passCheck = await bcrypt.compare(adminFound.password, req.body.password);
        const checkPass=await bcrypt.compare(req.body.password,adminFound.password);
        console.log("password match "+checkPass)
        if (checkPass) {
            if (adminFound.isAdmin) {
                req.session.isAdminAuth=true;
                req.session.email=adminFound.email;
                req.session.username=adminFound.username
                console.log(req.session.username+"session storage")
                console.log(adminFound.username+"db storage")
                // res.send("hiii its home")
                res.redirect(`/admin/home/${req.session.username}`)
                
            }
            else{
                res.redirect("/admin/?errorMessage=authetication not permitted")
            }
        }
        else{
            res.redirect("/admin/?errPassword=invalid password")
        }
    }
    else {
        res.redirect("/admin/?errUser=invalid username")
    }
    }
    catch(e){
        console.error(e.message);
        res.redirect("/?error?message=something went wrong while signing up")
    }
}


const checkUserOut = async(req,res)=>{
    await req.session.destroy()
    console.log("session end ,sign out")
    res.redirect('/admin/?message=sign out successfully')
}

module.exports = { adminLogin, adminCheck, home_page,checkUserOut,isAdmin }