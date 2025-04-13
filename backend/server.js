const express = require("express");
const cors = require("cors");
const quizRoute = require("./routes/quiz");
const mongoose=require("mongoose")
const session=require("express-session");
const passport = require("passport");
require("dotenv").config();
const testLoadRoute = require("./routes/testLoad");
const app = express();
app.set('trust proxy', true);
app.use(cors({credentials:true,origin:process.env.CLIENT_URL}));
app.use(express.json());
// app.use("/test", testLoadRoute);
app.use(express.urlencoded({ extended: true }));
const MongoStore = require("connect-mongo");
app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "sessions",
        ttl: 30 * 24 * 60 * 60 // 30 days in seconds
      }),
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.COOKIE_SECURE === "1", // HTTPS-only in prod
        sameSite: process.env.COOKIE_SECURE === "1" ? "none" : "lax", // for cross-origin
        httpOnly: true, // good for security
        // domain: '.railway.app' // Allows subdomains to access the cookie
      }      })
  );
app.use("/api/generate-quiz", quizRoute);
app.use(passport.initialize())
app.use(passport.session())
require("./models/user.js");
require("./services/passport.js")
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected"));
require('./routes/authRoutes.js')(app);
const PORT = 5000;
app.listen(PORT, () => console.log("Server started on port", PORT));
