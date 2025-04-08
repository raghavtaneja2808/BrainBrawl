import React from "react";
import {
  LogOut,
  CheckCircle,
  Star,
  BarChart3,
  Camera,
} from "lucide-react";

export default function ProfilePage() {
  const userStats = {
    name: "Explorer Hero",
    avatarUrl: "https://i.ibb.co/3B7Z8C2/avatar.png",
    quizzesTaken: 27,
    highScore: 980,
    accuracy: 86,
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-100 to-white dark:from-[#121212] dark:via-[#1a1a1a] dark:to-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white/80 dark:bg-[#1f1f1f] backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 space-y-10 transition-all">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400">Your Quiz Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your journey, grow your skills, and stay motivated 🚀</p>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          <div className="relative">
            <img
              src={userStats.avatarUrl}
              alt="User Avatar"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-pink-300 dark:border-pink-600 object-cover"
            />
            <button className="absolute bottom-0 right-0 p-2 bg-pink-200 dark:bg-[#2c2c2c] rounded-full shadow-lg">
              <Camera size={18} className="text-pink-600 dark:text-pink-400" />
            </button>
          </div>
          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-semibold">{userStats.name}</h2>
            <p className="text-md text-gray-700 dark:text-gray-400 italic">"Every quiz is a step forward 🧠"</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <StatCard icon={<Star size={22} />} label="Quizzes Taken" value={userStats.quizzesTaken} />
          <StatCard icon={<BarChart3 size={22} />} label="High Score" value={`${userStats.highScore} pts`} />
          <StatCard icon={<CheckCircle size={22} />} label="Accuracy" value={`${userStats.accuracy}%`} />
        </div>

        {/* Motivational Card */}
        <div className="bg-pink-100 dark:bg-[#2c2c2c] rounded-xl p-6 shadow-md text-center">
          <p className="text-lg font-medium text-pink-700 dark:text-pink-300">
            “Success is the sum of small efforts repeated day in and day out.” — Robert Collier
          </p>
        </div>

        {/* Actions */}
        <div className="grid sm:grid-cols-2 gap-4">
          <ActionItem label="View Quiz History" />
          <ActionItem label="Explore New Challenges" />
        </div>

        {/* Footer */}
        <div className="pt-6 text-center text-sm text-gray-600 dark:text-gray-500">
          Keep pushing forward — your next win is just one quiz away ✨
        </div>

        {/* Sign Out */}
        <div className="text-center">
          <button className="flex items-center gap-2 mx-auto text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-pink-50 dark:bg-[#2a2a2a] rounded-xl shadow p-4 hover:shadow-md transition">
      <div className="flex justify-center items-center mb-2 text-pink-500 dark:text-pink-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
}

function ActionItem({ label }) {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-[#2a2a2a] p-4 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer">
      <p className="font-medium">{label}</p>
      <span className="text-pink-400 dark:text-pink-300">&gt;</span>
    </div>
  );
}
