const express = require("express");
const cors = require("cors");
const quizRoute = require("./routes/quiz");
const details=require("./routes/details")
const mongoose=require("mongoose")
const session=require("express-session");
const passport = require("passport");
const http = require('http');
const setupChatChallenge = require('./services/chatChallenge');
require("dotenv").config();
const testLoadRoute = require("./routes/testLoad");
const app = express();
const server = http.createServer(app); // ✅ wrap express with http
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
  app.use(passport.initialize())
app.use(passport.session())
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*', // or specific frontend domain
    methods: ['GET', 'POST']
  }
});
setupChatChallenge(io);
app.use("/api", quizRoute);
require("./models/user.js");
require("./services/passport.js")
mongoose.connect(process.env.MONGO_URI).then(()=>console.log("DB connected"));
require('./routes/authRoutes.js')(app);
app.use("/details",details);
const PORT = 5000;
server.listen(PORT, () => console.log("Server + Socket.io started on port", PORT));
