const express = require("express");
const User = require("../models/user.model");

const transporter = require("../configs/transporter")

const router = express.Router();

router.get("", async(req, res)=>{
    try{
        let page = req.query.page || 1
        let size = req.query.size || 5
        const user = await User.find()
        .skip((page-1) * size)
        .limit(size)
        .lean().exec();

        
        const items = await User.find().countDocuments();
        const pages=Math.ceil(items/size)
        console.log(pages)
        res.send({user, pages});
    }
    catch(e){
        res.send(e.message);
    }

});


router.post("", async(req, res)=>{
    try{
        const user =await User.create(req.body);
        console.log(user)
        await transporter.sendMail({
            from: 'admin@masai.com', 
            to: user.email, 
            subject: `Welcome to THIS LIFE ${user.first_name} ${user.last_name}`, 
            text: `Hi, ${user.first_name}, Please confirm your email`, 
            html: `<h2>Hi, ${user.first_name}, Please confirm your email</h2>`, 
        });

        await transporter.sendMail({
            from: 'admin@masai.com', 
            to: "admin1@masai.com, admin2@masai.com, admin3@masai.com, admin4@masai.com, admin5@masai.com ", 
            subject: ` ${user.first_name} ${user.last_name} has registered with us`, 
            text: `Please welcome ${user.first_name} ${user.last_name}`, 
            html: `<h2>Please welcome ${user.first_name} ${user.last_name}</h2>`, 
        });

        res.send("Registration successful,Please Check your email")

    }
    catch(e){
        res.send(e.message);
    }
});


module.exports = router;