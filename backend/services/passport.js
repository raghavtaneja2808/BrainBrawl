const passport=require("passport");
const mongoose=require("mongoose");
const User=mongoose.model("users");
const bcrypt=require('bcryptjs');
const multiavatar = require('@multiavatar/multiavatar');
const GoogleStrategy=require('passport-google-oauth20').Strategy;
const LocalStrategy=require('passport-local').Strategy
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Callback URL:", `${process.env.SERVER_URL}/auth/google/callback`);

passport.serializeUser((user,done)=>{
    console.log("Serializing User: ",user)
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    console.log("Desrializing User",id)
    User.findById(id).then(user=>{done(null,user)})
})

passport.use(new LocalStrategy({usernameField:"email"},async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: "User not found" });
console.log(user.password)
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Incorrect password" });
    
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
)
);

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:`${process.env.SERVER_URL}/auth/google/callback`
},async (accessToken,refreshToken,profile,done)=>{
    console.log(profile)
    const user=await User.findOne({googleID:profile.id})
    if(!user){  const user=await new User({googleID:profile.id,email:profile.emails[0].value,password:profile.id,name:profile.displayName,verified:true,photo:multiavatar(profile.displayName)}).save() 
        done(null,user) }
    else{done(null,user)};console.log(user);


}))
