const express = require("express");
const Product = require("../models/product.model");
const {authorize} = require("../middlewares/authorize");
const router = express.Router();

router.get("", async(req, res)=>{
    try{
        const products = await Product.find().lean().exec();
        res.send(products)
    }
    catch(e){
        res.send(e.message);
    }
});

router.post("", authorize(["seller", "admin"]), async(req, res)=>{
    try{
        if(req.allowed){
            const product = await Product.create(
                {
                    title:req.body.title,
                    price:req.body.price,
                    user_id:req.user._id
                }
            )
            res.send(product);
        }
        else{
            res.send("Not authorized for this operation");
        }
    }
    catch(e){
        res.send(e.message);
    }
});

router.patch("/:id", authorize(["seller", "admin"]), async(req, res)=>{
    try{
        const user = await Product.findById(req.params.id).lean().exec();

        if(req.allowed){
            if(user.user_id.toString()===req.user._id){
                const product = await Product.findByIdAndUpdate(req.params.id, req.body, {returnOriginal:false});
                res.send(product)
            }
        }
        res.send("You are not allowed for this operation")
    }
    catch(e){
        res.send(e.message);
    }
});

router.delete("/:id", authorize(["seller", "admin"]), async(req, res)=>{
    try{
        const user = await Product.findById(req.params.id).lean().exec();

        if(req.allowed){
            if(user.user_id.toString()===req.user._id){
                const product = await Product.findByIdAndDelete(req.params.id).lean().exec();
                res.send(product)
            }
        }
        res.send("You are not allowed for this operation")
    }
    catch(e){
        res.send(e.message);
    }
})



module.exports = router;