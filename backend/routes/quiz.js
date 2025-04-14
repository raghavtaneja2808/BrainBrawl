const express = require("express");
const router = express.Router();
const { getGeminiStream } = require("../services/gemini");
const ensureAuth = require("../middleware/ensureAuth");

router.post("/generate-quiz", async (req, res) => {
  console.log("BODY:", req.body);

  const { numQuestions, difficulty, description,type } = req.body;

  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");

  try {
    const stream = await getGeminiStream({ numQuestions, difficulty, description ,type});

    let buffer = ""; 

    for await (const chunk of stream) {
      const text = chunk.text();
      buffer += text;

      const lines = buffer.split("\n");
      buffer = lines.pop();

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          res.write(JSON.stringify(json) + "\n"); 
        } catch (e) {
          buffer = line + "\n" + buffer;
        }
      }
    }
    res.end();

  } catch (err) {
    console.error("Gemini stream error:", err);
    res.status(500).send("Streaming failed.");
  }
});
router.post("/quiz/submit", ensureAuth, async (req, res) => {
  const mongoose=require("mongoose");
      const User=mongoose.model("users");

      const moment = require("moment-timezone");

      async function updateLoginStreak(user, score, timeSpent) {
        const today = moment().tz("Asia/Kolkata").startOf("day"); // use your timezone
        const lastLogin = moment(user.lastLoginDate).tz("Asia/Kolkata").startOf("day");
        const dayName = today.format("ddd");
      
        if (today.diff(lastLogin, "days") === 1) {
          user.streak += 1;
        } else if (today.diff(lastLogin, "days") > 1) {
          user.streak = 1;
        }
      
        user.lastLoginDate = new Date();
      
        const existing = user.dailyStats.find((entry) => entry.day === dayName);
        if (existing) {
          existing.score += score;
          existing.timeSpent += timeSpent;
        } else {
          user.dailyStats.push({ day: dayName, score, timeSpent });
        }
      
        await user.save();
      }
      

  const { score, correctAnswers, totalQuestions, timeSpent } = req.body;
  const getDayOfWeek = () => {
    return moment().tz("Asia/Kolkata").format("ddd");
  };
  
  if (!score && score !== 0) return res.status(400).json({ error: "Missing score" });
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
  
    user.score += score;
    // If user hasn't taken a quiz before, set their accuracy directly
    if (user.quizCount === 0) {
      user.accuracy = accuracy;
    } else {
      // If they've taken quizzes before, average the previous accuracy with the new one
      user.accuracy = Math.round((user.accuracy * user.quizCount + accuracy) / (user.quizCount + 1));
    }
    user.quizCount += 1;
  
    await user.save();
    await updateLoginStreak(user, score, timeSpent);

    res.json({ message: "Quiz result submitted", updatedUser: user });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Failed to submit result" });
  }
  
});

module.exports = router;
