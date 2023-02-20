const passport = require("passport");
require("dotenv").config();
const User = require("../models/user.model");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    var user = await User.find({email:profile.email}).lean().exec();

    if(user.length===0){
       user = await User.create({
        email:profile.email,
        password:"1234",
        role:["customer"]
      })
    }
    console.log(user)
    return done(null, {user, accessToken});
}
));

module.exports = passport;