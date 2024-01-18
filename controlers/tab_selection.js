const product = require("../models/productsModel")



const allProducts = async (req, res) => {
    try {
        const allProduct = await product.find({ display: 1 });
        if (allProduct) {
            return allProduct
        } else {
            console.log("details not found!!")
        }
    } catch (error) {
        console.log(error.message)
        // res.redirect('/error?message= something went wrong!')
    }
}



const vegitables = async (req, res) => {
    try {
        const vegitable = await product.find({ $and: [{ display: 1},{ category: "Vegitable" }]} );
        console.log(vegitable)
        if (vegitable) {
            return vegitable
        } else {
            console.log("details not found!!")
        }
    } catch (error) {
        console.log(error.message)
        // res.redirect('/error?message= something went wrong!')
    }
}

const fruits = async (req, res) => {
    try {
        const fruit = await product.find({ category: "Fruit" });
        if (fruit) {
            return fruit
        } else {
            console.log("details not found!!")
        }
    } catch (error) {
        console.log(error.message)
        // res.redirect('/error?message= something went wrong!')
    }
}

const breads = async (req, res) => {
    try {
        const bread = await product.find({ category: "Bread" });
        if (bread) {
            return bread
        } else {
            console.log("details not found!!")
        }
    } catch (error) {
        console.log(error.message)
        // res.redirect('/error?message= something went wrong!')
    }
}


// const vegitables = async (req, res) => {
//     console.log("hi vegitable clicked")
//     const vegitable = await product.find({ category: "Vegitable" });
//     req.session.vegitable = vegitable;
//     res.redirect(`/home/${req.session.username}`)
// }

// const fruits = async (req, res) => {
//     console.log("hi fruits clicked")
//     const fruit = await product.find({ category: "Fruit" });
//     req.session.fruit = fruit;
//     res.redirect(`/home/${req.session.username}`)
// }

// const breads = async (req, res) => {
//     console.log("hi bread clicked")
//     const bread = await product.find({ category: "Bread" });
//     req.session.bread = bread;
//     res.redirect(`/home/${req.session.username}`)
// }


module.exports = { allProducts, vegitables, fruits, breads }