const express = require("express");
const cors = require("cors");
const quizRoute = require("./routes/quiz");

require("dotenv").config();
const testLoadRoute = require("./routes/testLoad");
const app = express();
app.use(cors());
app.use(express.json());
// app.use("/test", testLoadRoute);
app.use("/api/generate-quiz", quizRoute);

const PORT = 5000;
app.listen(PORT, () => console.log("Server started on port", PORT));
