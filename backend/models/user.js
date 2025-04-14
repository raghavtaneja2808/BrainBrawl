const { Schema, default: mongoose } = require("mongoose");

const userSchema = Schema({
    googleID: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: String,
    verified: { type: Boolean, required: true },
    score: { type: Number, default: 0 },
    accuracy: { type: Number, default: 0 },
    quizCount: { type: Number, default: 0 }, // To track how many quizzes the user has completed
    questionsSolvedMap: { type: Map, of: Number, default: {} },
    totalTimeSpent: { type: Number, default: 0 },
    timeSpentMap: { type: Map, of: Number, default: {} },
    streak: { type: Number, default: 0 },
    lastLoginDate: { type: Date, default: Date.now },
    dailyStats: [
        {
          day: { type: String, required: true }, // 'Mon', 'Tue', etc.
          score: { type: Number, default: 0 },
          timeSpent: { type: Number, default: 0 },
        },
      ], // This will store daily data
    location:{type:String}
});
module.exports = mongoose.model("users", userSchema);
