import React, { useState, useEffect, useContext } from "react";
import { cn } from "@/lib/utils";
import Footer from '@/components/ui/footer';
import Navbar from '../components/Navbar';
import AuthContext from "@/assets/AuthContext";
import { useNavigate } from "react-router-dom";

// Placeholder for a loading indicator
const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
);

// Helper function to create SVG data URI
const createSvgDataUri = (svgString) => {
    // Basic check to ensure it looks like SVG
    if (typeof svgString === 'string' && svgString.startsWith('<svg')) {
        return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    }
    // Return a default placeholder or null if invalid
    // You might want a more robust default avatar here
    console.warn("Invalid SVG string provided for avatar:", svgString);
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">?</text></svg>';
};


const LeaderboardPage = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useContext(AuthContext); // <-- Get current user from context
    const navigate=useNavigate()

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Replace with your actual API endpoint
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leaderboard`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const apiData = await response.json();
                const currentUserId = currentUser?._id;

                // 1. Transform data
                const transformedData = apiData.map(apiUser => ({
                    _id: apiUser._id,          
                    name: apiUser.name,     
                    score: apiUser.score,     
                    avatar: createSvgDataUri(apiUser.photo), 
                    isCurrentUser: apiUser._id === currentUserId 
                }));

                transformedData.sort((a, b) => b.score - a.score);

                setLeaderboardData(transformedData);

            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
                setError("Could not load leaderboard data. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, [currentUser]); 

    const topThree = leaderboardData.slice(0, 3);
    const userEntry = leaderboardData.find((u) => u.isCurrentUser);
    const userRank = userEntry ? leaderboardData.findIndex(u => u._id === userEntry._id) + 1 : null;


    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-white dark:bg-black">
                <Navbar />
                <main className="flex-grow flex justify-center items-center">
                    <LoadingSpinner />
                </main>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-white dark:bg-black">
                <Navbar />
                <main className="flex-grow flex justify-center items-center px-4 text-center text-red-600 dark:text-red-400">
                    <p>Error: {error}</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />

            <main className="flex-grow px-4 py-10 sm:px-6 lg:px-12 bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-zinc-900 dark:to-black">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 flex justify-center items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
                    🏆 Brain Brawl Leaderboard
                </h1>

                {/* Top 3 Podium */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-center items-end mb-16 max-w-5xl mx-auto">
                    {topThree.map((user, index) => (
                        <div
                            key={user._id} // Use unique _id for key
                            className={cn(
                                "flex flex-col items-center justify-end rounded-xl p-4 sm:p-6 w-full shadow-lg",
                                // Highlight current user if they are in top 3
                                user.isCurrentUser && "ring-4 ring-purple-500 dark:ring-purple-400",
                                index === 0
                                    ? "bg-yellow-400 text-black order-2 sm:order-1 scale-105 min-h-[180px]" // Central highest podium
                                    : index === 1
                                    ? "bg-gray-300 text-black order-1 sm:order-2 min-h-[160px]" // Silver
                                    : "bg-amber-700 text-white order-3 min-h-[140px]" // Bronze
                            )}
                        >
                            {/* Render SVG Avatar using img tag */}
                            <img src={user.avatar} alt={`${user.name}'s avatar`} className="w-16 h-16 mb-2 rounded-full bg-white/20 object-cover" />
                            <div className="text-lg font-bold text-center">{user.name}</div>
                            <div className="text-sm opacity-90">Score: {user.score}</div>
                            <span className="mt-2 px-3 py-1 rounded-full text-xs bg-black/10 dark:bg-white/10">
                                {index === 0 ? "🥇 1st Place" : index === 1 ? "🥈 2nd" : "🥉 3rd"}
                            </span>
                        </div>
                    ))}
                    {/* Add placeholders if fewer than 3 users */}
                    {leaderboardData.length < 3 && [...Array(3 - leaderboardData.length)].map((_, i) =>
                       <div key={`placeholder-${i}`} className={cn(
                         "rounded-xl p-4 sm:p-6 w-full shadow-inner bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500",
                         i === 0 ? "order-1 sm:order-2 min-h-[160px]" : "order-3 min-h-[140px]"
                       )}>Empty</div>
                    )}
                     {leaderboardData.length < 2 &&
                       <div key={`placeholder-1`} className={cn(
                         "rounded-xl p-4 sm:p-6 w-full shadow-inner bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 order-3 min-h-[140px]"
                       )}>Empty</div>
                    }
                </div>


                {/* Current User Rank Card (if they exist and aren't in top 3, or always show it) */}
                {/* Let's always show it if the user is logged in and present in the leaderboard */}
                {userEntry && (
                    <div className="max-w-md mx-auto mb-12 p-6 bg-white dark:bg-zinc-900 border dark:border-white/10 rounded-xl shadow-md text-center">
                        <h2 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-300">Your Position</h2>
                         <img src={userEntry.avatar} alt="Your avatar" className="w-20 h-20 mb-3 rounded-full bg-white/20 object-cover mx-auto" />
                        <p className="text-xl font-medium mt-2">{userEntry.name}</p>
                        <p className="text-md">Score: {userEntry.score}</p>
                        <p className="text-lg font-semibold mt-1">Rank: #{userRank}</p>
                    </div>
                )}

                {/* Full Leaderboard List */}
                <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-white/10 hover:cursor-pointer">
                    <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-300">🏅 All Players</h3>
                    <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2"> {/* Added pr-2 for scrollbar space */}
                        {leaderboardData.map((entry, index) => (
                            <div
                                key={entry._id} // Use unique _id for key
                                className={cn(
                                    "flex items-center justify-between p-3 sm:p-4 rounded-lg transition-colors duration-200",
                                    entry.isCurrentUser // Highlight based on the flag
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 ring-2 ring-purple-400"
                                        : "bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600"
                                )}
                                onClick={()=>navigate(`/user/${entry._id}`)}
                            >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0"> {/* Added flex-1 min-w-0 for better wrapping */}
                                    <span className="text-sm sm:text-lg font-bold w-6 sm:w-8 text-center text-gray-500 dark:text-gray-400">{index + 1}</span>
                                    {/* Render SVG Avatar */}
                                     <img src={entry.avatar} alt={`${entry.name}'s avatar`} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 object-cover flex-shrink-0" />
                                    <span className="truncate font-medium">{entry.name}</span> {/* Added truncate */}
                                </div>
                                <span className="text-xs sm:text-sm font-semibold whitespace-nowrap ml-2">Score: {entry.score}</span>
                            </div>
                        ))}
                         {leaderboardData.length === 0 && !isLoading && (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-4">Leaderboard is empty.</p>
                         )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LeaderboardPage;