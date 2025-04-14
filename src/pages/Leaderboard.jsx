import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentUser = users.find((user) => user.rank === 8); // Example current user
  const topThree = users.slice(0, 3); // Top three players
  const rest = users.slice(3); // Remaining players

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <div className="p-8 flex flex-col gap-8 lg:gap-12">
        {/* Current User Section */}
        <div className="bg-gray-200 dark:bg-slate-700 rounded-xl p-6 text-center">
          <h2 className="text-lg font-semibold">📍 Your Position</h2>
          <p className="text-xl font-bold mt-1">Rank 8 - {currentUser?.name}</p>
          <p className="text-yellow-300">{currentUser?.points} points</p>
        </div>

        {/* Top Three and Rest of Leaderboard */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* Top Scorers */}
          <div className="w-full lg:w-1/2 flex justify-center items-end gap-10 lg:gap-40 mt-8 lg:mt-24 mb-10 lg:mb-20 relative order-first lg:order-first">
            {[1, 0, 2].map((pos) => (
              <div
                key={pos}
                className="flex flex-col items-center gap-2 lg:gap-4 relative"
              >
                <div
                  className={`bg-gradient-to-br from-gray-800 to-slate-700 border-4 border-yellow-400 rounded-2xl p-2 lg:p-4 shadow-2xl relative ${
                    pos === 0
                      ? "scale-125 lg:scale-[1.8] z-20"
                      : "scale-105 lg:scale-110"
                  } animate-pulse`}
                >
                  <Avatar
                    className={
                      pos === 0
                        ? "w-16 h-16 lg:w-32 lg:h-32"
                        : "w-12 h-12 lg:w-20 lg:h-20"
                    }
                  >
                    <AvatarImage
                      src={`https://avatars.dicebear.com/api/avataaars/${topThree[pos].username}.svg`}
                    />
                    <AvatarFallback>
                      {topThree[pos].name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div
                  className={`text-center ${
                    pos === 0
                      ? "text-lg lg:text-xl mt-4 lg:mt-20"
                      : "text-sm lg:text-base"
                  }`}
                >
                  <p className="font-semibold mt-2 lg:mt-4">
                    {topThree[pos].name}
                  </p>
                  <p className="text-yellow-300 text-sm lg:text-base">
                    {topThree[pos].points} pts
                  </p>
                  <p className="text-slate-400 text-xs lg:text-sm">
                    Rank {pos + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the Leaderboard */}
          <div className="w-full lg:w-1/2 max-h-[70vh] overflow-y-auto custom-scrollbar order-last lg:order-last">
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .custom-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            <Card className="bg-gray-100 dark:bg-[#1e293b] rounded-xl shadow-xl">
              <CardContent className="h-full overflow-y-auto px-0 py-4">
                <AnimatePresence>
                  {rest.map((user, index) => (
                    <motion.div
                      key={user.username}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      className={`flex items-center gap-4 lg:gap-6 px-4 lg:px-6 py-2 lg:py-4 border-b border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors ${
                        user.username === currentUser?.username
                          ? "bg-gray-200 dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      {/* Rank */}
                      <div className="text-sm lg:text-lg text-gray font-mono w-[30px] text-center">
                        {index + 4}
                      </div>

                      {/* Avatar */}
                      <Avatar className="w-[30px] h-[30px]">
                        <AvatarImage
                          src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 text-sm lg:text-base">
                        {/* Name and Accuracy */}
                        <div className="font-medium flex justify-between items-center">
                          {user.name}
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-slate-400 ml-2 lg:ml-4">
                            {user.accuracy}%
                          </span>
                        </div>
                        <div className="text-xs lg:text-sm text-gray-600 dark:text-slate-400 mb-0.5 lg:mb-1">
                          {user.username}
                        </div>

                        {/* Accuracy Bar */}
                        <div className="w-full h-1 lg:h-2 bg-gray-300 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 via-yellow-300 to-red-400 rounded-full transition-all duration-500"
                            style={{ width: `${user.accuracy}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-yellow-400 font-bold text-sm lg:text-lg">
                        {user.points} pts
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
