
import React from "react";
import { cn } from "@/lib/utils";
import Footer from '@/components/ui/footer'
import Navbar from '../components/Navbar'

const mockLeaderboard = [
  { name: "Alice", score: 950, avatar: "🦊" },
  { name: "Bob", score: 900, avatar: "🐼" },
  { name: "Charlie", score: 875, avatar: "🐸" },
  { name: "You", score: 860, avatar: "🧠" },
  { name: "David", score: 850, avatar: "🐵" },
  { name: "Emma", score: 820, avatar: "🐱" },
  { name: "Frank", score: 790, avatar: "🐧" },
];

const LeaderboardPage = () => {
  const topThree = mockLeaderboard.slice(0, 3);
  const user = mockLeaderboard.find((u) => u.name === "You");
  const rest = mockLeaderboard.filter((u) => u.name !== "You" && !topThree.includes(u));

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      <main className="flex-grow px-4 py-10 sm:px-6 lg:px-12 bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-zinc-900 dark:to-black">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 flex justify-center items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
          🏆 Brain Brawl Leaderboard
        </h1>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-end mb-16 max-w-5xl mx-auto">
          {topThree.map((user, index) => (
            <div
              key={user.name}
              className={cn(
                "flex flex-col items-center justify-end rounded-xl p-4 sm:p-6 w-full shadow-lg",
                index === 0
                  ? "bg-yellow-400 text-black scale-105"
                  : index === 1
                  ? "bg-gray-300 text-black"
                  : "bg-amber-700 text-white"
              )}
            >
              <div className="text-5xl mb-2">{user.avatar}</div>
              <div className="text-lg font-bold">{user.name}</div>
              <div className="text-sm opacity-90">Score: {user.score}</div>
              <span className="mt-2 px-3 py-1 rounded-full text-xs bg-black/10 dark:bg-white/10">
                {index === 0 ? "🥇 1st Place" : index === 1 ? "🥈 2nd" : "🥉 3rd"}
              </span>
            </div>
          ))}
        </div>

        {/* Current User Rank Card */}
        {user && (
          <div className="max-w-md mx-auto mb-12 p-6 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-300">Your Rank</h2>
            <div className="text-4xl">{user.avatar}</div>
            <p className="text-lg font-medium mt-2">{user.name}</p>
            <p className="text-sm">Score: {user.score}</p>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-white/10">
          <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-300">🏅 All Players</h3>
          <div className="max-h-[300px] overflow-y-auto space-y-3">
            {mockLeaderboard.map((entry, index) => (
              <div
                key={entry.name}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-colors duration-200",
                  entry.name === "You"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 ring-2 ring-purple-400"
                    : "bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold w-6 text-center">{index + 1}</span>
                  <span className="text-2xl">{entry.avatar}</span>
                  <span>{entry.name}</span>
                </div>
                <span className="text-sm font-medium">Score: {entry.score}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
