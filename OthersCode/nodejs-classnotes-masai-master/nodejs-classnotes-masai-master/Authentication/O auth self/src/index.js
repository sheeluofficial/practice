const express = require("express");
const {register, login} = require("../src/controllers/auth.controller");
const connect = require("../src/configs/db");
const prodController = require("../src/controllers/product.controller");
const passport = require("../src/configs/googleOauth");
const app = express();

app.use(express.json());
app.post("/register", register);
app.post("/login", login);

app.use("/product", prodController);

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));
 

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        // successRedirect: '/auth/google/succes',
        failureRedirect: '/auth/google/failure'
}),(req, res) =>{
    res.send(req.user);
}

);











app.listen(8000,()=>{
    connect();
    console.log("Listening at 8000");
});