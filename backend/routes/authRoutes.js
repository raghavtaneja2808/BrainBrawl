const { default: mongoose } = require("mongoose");
const sgMail = require('@sendgrid/mail');
const ensureAuth = require("../middleware/ensureAuth");
const multiavatar = require('@multiavatar/multiavatar');
module.exports=(app)=>{
    const User=mongoose.model("users");
    const bcrypt=require('bcryptjs');
    app.post("/sign-up", async (req, res) => {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        if (!existingUser.verified) {
          const otp = Math.floor(100000 + Math.random() * 900000);
          req.session.otp = otp;
          req.session.email = email;
          sgMail.setApiKey(process.env.SEND_GRID_KEY);
          const msg = {
            to: email,
            from: process.env.SENDGRID_VERIFIED_EMAIL || "primoel968@proton.me",
            subject: "Your OTP for Brain Brawl🧠",
            text: `Your OTP is: ${otp}`,
            html: `<h1><strong>Your OTP: ${otp}</strong></h1>`,
          };
          try {
            await sgMail.send(msg);
            console.log("Email sent with OTP:", otp);
            return res.send({ status:true,message:"Your Email already exists, OTP sent for verification" });
          } catch (error) {
            console.error(error);
            return res.status(500).send({ status:false,message: "Error sending OTP email" });
          }
        }
        return res.send({ status:true,message:"Your Email is already associated, please Login with Your Password" });
      }
    
      try {
        const newUser = new User({ name, email, password: password, verified: false,photo:multiavatar(name) });
        await newUser.save();
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session.otp = otp;
        req.session.email = email;
        sgMail.setApiKey(process.env.SEND_GRID_KEY);
        const msg = {
          to: email,
          from: process.env.SENDGRID_VERIFIED_EMAIL || "primoel968@proton.me",
          subject: "Your OTP for Brain Brawl🧠",
          text: `Your OTP is: ${otp}`,
          html: `<h1><strong>Your OTP: ${otp}</strong></h1>`,
        };
        await sgMail.send(msg);
        console.log("Email sent with OTP:", otp);
        return res.send({ status: true ,message:"Email sent on "+email});
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Error creating user" });
      }
    });
    

app.post("/verify-otp", async (req, res) => {
  console.log("Verify OTP request recieved");
  console.log(req.body)
    const { otp } = req.body;
    console.log("User otp recieved :",otp)
    console.log(`session email ${req.session.email} , session otp ${req.session.otp}`)
    if (!req.session.otp || !req.session.email) {
      return res.status(400).send({ message: "OTP expired or invalid",status:false });
    }

    if (req.session.otp !== parseInt(otp)) {
      return res.status(400).send({ message: "Incorrect OTP",status:false });
    }
    try {
      const user = await User.findOneAndUpdate(
        { email: req.session.email },
        { verified: true },
        { new: true }
      );
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
      req.logIn(user, (err) => {
        if (err) return next(err);
  
        req.session.otp = null;
        req.session.email = null;
  
        res.send({ message: true, user });
      });
    } catch (error) {
      console.error("Error during OTP verification:", error);
      res.status(500).send({ message: "Verification failed" ,status:false});
    }  });
  
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return res.status(500).json({ message: "Server error"+err ,status:false});
      if (!user) return res.status(400).json({ message: info.message ,status:false});
  
      req.logIn(user, (err) => {
        if (err) return res.status(500).json({ message: "Login error" });
        res.json({ message: true, user });
      });
    })(req, res, next);
  });
const passport=require("passport")
app.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

app.get('/auth/google/callback',passport.authenticate('google'),
(req, res) => {
    res.redirect(process.env.CLIENT_URL);
  });
app.get('/current_user',(req,res)=>{
    console.log("Accessing current user request recieved",req.user);
    res.send(req.user);
}
)
app.get("/check-session", (req, res) => {
    console.log("Session data:", req.session);
    res.send(req.session);
});

app.get("/logout", (req, res, next) => {
    console.log("Logout route hit"); // Should see this 
  req.logout((err) => {
      if (err) {
          return next(err); // Pass error to Express error handler
      }
      console.log("logout successfull");
      res.send({ message: true });
  });
});

}
