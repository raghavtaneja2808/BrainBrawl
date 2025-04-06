// routes/testLoad.js
const express = require("express");
const router = express.Router();
const { getGeminiStream } = require("../services/gemini");

router.get("/spam", async (req, res) => {
  const description = "history of India";
  const difficulty = "easy";
  const type = "multiple";
  const numQuestions = 1;

  const totalRequests = 20;
  let successCount = 0;
  let failureCount = 0;

  for (let i = 0; i < totalRequests; i++) {
    try {
      console.log(`📤 Sending request ${i + 1}/${totalRequests}`);
      const stream = await getGeminiStream({ numQuestions, difficulty, description, type });

      // Just read the stream to simulate real usage
      for await (const chunk of stream) {
        const text = chunk.text(); // no parsing
      }

      successCount++;
    } catch (err) {
      console.error(`❌ Request ${i + 1} failed:`, err.message);
      failureCount++;
    }
  }

  res.json({
    message: "Test load complete",
    successCount,
    failureCount,
  });
});

module.exports = router;
