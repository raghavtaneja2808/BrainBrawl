const express = require("express");
const router = express.Router();
const { getGeminiStream } = require("../services/gemini");
const ensureAuth = require("../middleware/ensureAuth");

router.post("/", async (req, res) => {
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
router.post("/submit", ensureAuth, async (req, res) => {
  const { score, correctAnswers, totalQuestions, timeSpent } = req.body;

  if (!score && score !== 0) return res.status(400).json({ error: "Missing score" });

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const accuracy = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    user.score += score;
    user.accuracy = Math.round((user.accuracy + accuracy) / 2);

    // You can also update maps or daily stats here

    await user.save();
    res.json({ message: "Quiz result submitted", updatedUser: user });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(500).json({ error: "Failed to submit result" });
  }
});

module.exports = router;
