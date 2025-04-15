const express = require('express');
const router = express.Router();

// GET user by ID
router.get('/user/:id', async (req, res) => {
    const mongoose=require("mongoose");
    const User=mongoose.model("users")
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password'); // exclude password

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
