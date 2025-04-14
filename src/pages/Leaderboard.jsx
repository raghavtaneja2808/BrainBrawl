import React, { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import { motion, AnimatePresence } from "framer-motion";

const podiumHeights = ["h-28", "h-20", "h-12"];
const avatarOffsetY = ["-mt-28", "-mt-20", "-mt-12"];
const podiumWidths = ["w-32", "w-28", "w-24"];

const ChallengeAnimation = ({ isAnimating }) => (
  <AnimatePresence>
    {isAnimating && (
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 rounded-full w-24 h-24 flex items-center justify-center text-white font-bold shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        style={{ fontSize: '1.5em' }}
      >
        ⚔️
      </motion.div>
    )}
  </AnimatePresence>
);

const PodiumAnimation = ({ isTopThree, children }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (isTopThree) {
      const element = animationRef.current;
      let yOffset = 0;

      const animate = () => {
        yOffset = (yOffset + 0.7) % 15;
        element.style.transform = `translateY(${yOffset - 7}px)`;
        requestAnimationFrame(animate);
      };

      const animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    } else {
      const element = animationRef.current;
      if (element) {
        element.style.transform = `translateY(0px)`;
      }
    }
  }, [isTopThree]);

  return (
    <div ref={animationRef} className="relative transition-transform duration-200">
      {children}
    </div>
  );
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [challengeAnimation, setChallengeAnimation] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  
  // For filtering and viewing options
  const [rankView, setRankView] = useState("all"); // "all", "nearby"

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock data
        const mockData = [
          { username: "alice", name: "Alice", points: 1200, rank: 0, wins: 42, losses: 12, streak: 5, lastActive: "2h ago" },
          { username: "bob", name: "Bob", points: 1100, rank: 1, wins: 38, losses: 15, streak: 3, lastActive: "5h ago" },
          { username: "carol", name: "Carol", points: 1000, rank: 2, wins: 35, losses: 10, streak: 0, lastActive: "1d ago" },
          { username: "dave", name: "Dave", points: 950, rank: 3, wins: 33, losses: 18, streak: 2, lastActive: "3h ago" },
          { username: "eve", name: "Eve", points: 900, rank: 4, wins: 30, losses: 15, streak: 1, lastActive: "2d ago" },
          { username: "frank", name: "Frank", points: 850, rank: 5, wins: 28, losses: 14, streak: 0, lastActive: "4h ago" },
          { username: "grace", name: "Grace", points: 800, rank: 6, wins: 25, losses: 12, streak: 0, lastActive: "1h ago" },
          { username: "you", name: "You", points: 780, rank: 7, wins: 24, losses: 12, streak: 3, lastActive: "Just now" },
          { username: "henry", name: "Henry", points: 760, rank: 8, wins: 22, losses: 15, streak: 0, lastActive: "6h ago" },
          { username: "ivy", name: "Ivy", points: 740, rank: 9, wins: 20, losses: 11, streak: 2, lastActive: "1d ago" },
          { username: "jack", name: "Jack", points: 720, rank: 10, wins: 18, losses: 10, streak: 0, lastActive: "12h ago" },
        ];

        setUsers(mockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getMedal = (rank) => ["🥇", "🥈", "🥉"][rank] || `#${rank + 1}`;

  const handleChallengeClick = (user) => {
    if (user.username !== currentUser.username) {
      setSelectedOpponent(user);
      setIsChallengeMode(true);
      setChallengeAnimation(user.username);
      setTimeout(() => {
        setChallengeAnimation(null);
      }, 500);
    }
  };

  const handleCancelChallenge = () => {
    setSelectedOpponent(null);
    setIsChallengeMode(false);
  };

  const handleSendChallenge = () => {
    alert(`Challenge sent to ${selectedOpponent.name}`);
    handleCancelChallenge();
  };

  const toggleExpandUser = (username) => {
    setExpandedUser(expandedUser === username ? null : username);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>;
  
  if (error) return <div className="min-h-screen flex items-center justify-center">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      Error: {error}
    </div>
  </div>;

  const currentUser = users.find((user) => user.username === "you") || users[7];
  const topThree = users.slice(0, 3);
  
  // Filter users based on view preference
  const lowerRankedUsers = users.slice(3).filter(user => {
    if (rankView === "all") return true;
    if (rankView === "nearby") {
      return Math.abs(user.rank - currentUser.rank) <= 2;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 md:p-10 space-y-10">
        {isChallengeMode ? (
          <section className="max-w-xl mx-auto bg-card shadow-2xl p-8 rounded-3xl border text-center relative">
            <h2 className="text-3xl font-bold mb-4">⚔️ Send a Challenge</h2>
            <p className="text-lg mb-6">
              Do you want to challenge <span className="font-semibold">{selectedOpponent.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default" onClick={handleSendChallenge}>Send</Button>
              <Button variant="ghost" onClick={handleCancelChallenge}>Cancel</Button>
              <ChallengeAnimation isAnimating={selectedOpponent?.username === challengeAnimation} />
            </div>
          </section>
        ) : (
          <>
            <Card className="p-6 text-center rounded-3xl shadow-md border bg-muted">
              <h2 className="text-xl font-bold mb-2">🏅 Your Position</h2>
              <p className="text-lg">{currentUser.name} - <strong>{currentUser.points} pts</strong></p>
              <p className="text-sm text-muted-foreground">Current Rank: <span className="font-semibold">#{currentUser.rank + 1}</span></p>
              <div className="flex justify-center gap-4 mt-3">
                <Badge variant="outline" className="px-3 py-1">Wins: {currentUser.wins}</Badge>
                <Badge variant="outline" className="px-3 py-1">Streak: {currentUser.streak}</Badge>
              </div>
            </Card>

            {/* Top 3 Section with Podium at the Bottom and Lower Position */}
            <div className="w-full flex justify-center items-start gap-6 md:gap-12 mt-32 mb-10">
              {[1, 0, 2].map((pos) => (
                <div key={pos} className="flex flex-col items-center relative">
                  <div className={`p-3 rounded-full border-4 border-yellow-400 shadow-xl ${avatarOffsetY[pos]}`}>
                    <Avatar className="w-16 h-16 md:w-24 md:h-24">
                      <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${topThree[pos].username}.svg`} />
                      <AvatarFallback>{topThree[pos].name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="mt-2 font-semibold">{topThree[pos].name}</p>
                  <p className="text-yellow-400">{topThree[pos].points} pts</p>
                  <p className="text-sm text-muted-foreground">Rank {topThree[pos].rank + 1}</p>
                  {/* Animated Podium Stage */}
                  <PodiumAnimation isTopThree={true}>
                    <div
                      className={`bg-gradient-to-t from-zinc-300 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 rounded-md shadow-md flex items-center justify-center ${podiumHeights[pos]} ${podiumWidths[pos]} mt-4`}
                    >
                      <span className="text-lg md:text-xl font-semibold">{getMedal(topThree[pos].rank)}</span>
                    </div>
                  </PodiumAnimation>
                </div>
              ))}
            </div>

            {/* Improved Remaining Users Section */}
            <section className="bg-muted rounded-3xl p-6 shadow-inner relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">🏆 Other Competitors</h2>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={rankView === "all" ? "default" : "outline"}
                    onClick={() => setRankView("all")}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={rankView === "nearby" ? "default" : "outline"}
                    onClick={() => setRankView("nearby")}
                  >
                    Nearby
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <style jsx>{`
                  .custom-scrollbar::-webkit-scrollbar { width: 5px; }
                  .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                  .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
                `}</style>

                <AnimatePresence>
                  {lowerRankedUsers.map((user, index) => (
                    <motion.div
                      key={user.username}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card
                        className={`bg-card border rounded-xl hover:shadow-lg transition-all relative overflow-hidden cursor-pointer ${user.username === currentUser.username ? 'ring-2 ring-blue-400' : ''}`}
                        onClick={() => toggleExpandUser(user.username)}
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 text-center text-lg font-bold">
                              #{user.rank + 1}
                            </div>
                            <Avatar className="w-10 h-10 ring-2 ring-offset-2 ring-offset-background ring-muted-foreground">
                              <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`} />
                              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold flex items-center">
                                {user.name}
                                {user.streak >= 3 && (
                                  <span className="ml-2 text-sm text-orange-500">🔥 {user.streak}</span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">@{user.username}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 relative">
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">
                              {user.points} pts
                            </Badge>
                            {user.username !== currentUser.username && (
                              <Button size="sm" variant="outline" onClick={(e) => {
                                e.stopPropagation();
                                handleChallengeClick(user);
                              }}>
                                Challenge
                              </Button>
                            )}
                            <ChallengeAnimation isAnimating={user.username === challengeAnimation} />
                          </div>
                        </div>

                        {/* Expanded User Stats */}
                        <AnimatePresence>
                          {expandedUser === user.username && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="px-4 pb-4 border-t bg-muted/30"
                            >
                              <div className="pt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="bg-card p-2 rounded-md text-center">
                                  <p className="text-xs text-muted-foreground">Wins</p>
                                  <p className="font-semibold">{user.wins}</p>
                                </div>
                                <div className="bg-card p-2 rounded-md text-center">
                                  <p className="text-xs text-muted-foreground">Losses</p>
                                  <p className="font-semibold">{user.losses}</p>
                                </div>
                                <div className="bg-card p-2 rounded-md text-center">
                                  <p className="text-xs text-muted-foreground">Win Rate</p>
                                  <p className="font-semibold">
                                    {Math.round((user.wins / (user.wins + user.losses)) * 100)}%
                                  </p>
                                </div>
                                <div className="bg-card p-2 rounded-md text-center">
                                  <p className="text-xs text-muted-foreground">Last Active</p>
                                  <p className="font-semibold">{user.lastActive}</p>
                                </div>
                              </div>
                              
                              {user.username !== currentUser.username && (
                                <div className="mt-3 flex justify-end">
                                  <Button size="sm" variant="default" onClick={(e) => {
                                    e.stopPropagation();
                                    handleChallengeClick(user);
                                  }}>
                                    Send Challenge
                                  </Button>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {lowerRankedUsers.length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    No users found in this range.
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}