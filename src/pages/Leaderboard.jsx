import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Mock data
        const mockData = [
          { username: "alice", name: "Alice", points: 1200, rank: 0 },
          { username: "bob", name: "Bob", points: 1100, rank: 1 },
          { username: "carol", name: "Carol", points: 1000, rank: 2 },
          { username: "dave", name: "Dave", points: 950, rank: 3 },
          { username: "eve", name: "Eve", points: 900, rank: 4 },
          { username: "frank", name: "Frank", points: 850, rank: 5 },
          { username: "grace", name: "Grace", points: 800, rank: 6 },
          { username: "you", name: "You", points: 780, rank: 7 },
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentUser = users.find((user) => user.rank === 8) || users[7];
  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 md:p-10 space-y-10">
        {isChallengeMode ? (
          <section className="max-w-xl mx-auto bg-card shadow-2xl p-8 rounded-3xl border text-center">
            <h2 className="text-3xl font-bold mb-4">⚔️ Send a Challenge</h2>
            <p className="text-lg mb-6">
              Do you want to challenge <span className="font-semibold">{selectedOpponent.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="default" onClick={handleSendChallenge}>Send</Button>
              <Button variant="ghost" onClick={handleCancelChallenge}>Cancel</Button>
            </div>
          </section>
        ) : (
          <>
            <Card className="p-6 text-center rounded-3xl shadow-md border bg-muted">
              <h2 className="text-xl font-bold mb-2">🏅 Your Position</h2>
              <p className="text-lg">{currentUser.name} - <strong>{currentUser.points} pts</strong></p>
              <p className="text-sm text-muted-foreground">Current Rank: <span className="font-semibold">#{currentUser.rank || 8}</span></p>
            </Card>

            {/* Top 3 Section */}
            <div className="w-full flex justify-center items-end gap-6 md:gap-12 mt-12 mb-10">
              {[1, 0, 2].map((pos) => (
                <div key={pos} className="flex flex-col items-center">
                  <div className={`p-3 rounded-full border-4 border-yellow-400 ${pos === 0 ? "scale-125" : "scale-100"} shadow-xl`}>
                    <Avatar className="w-16 h-16 md:w-24 md:h-24">
                      <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${topThree[pos].username}.svg`} />
                      <AvatarFallback>{topThree[pos].name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="mt-4 font-semibold">{topThree[pos].name}</p>
                  <p className="text-yellow-400">{topThree[pos].points} pts</p>
                  <p className="text-sm text-muted-foreground">Rank {pos + 1}</p>
                </div>
              ))}
            </div>

            {/* Remaining Users */}
            <section className="bg-muted rounded-3xl p-6 shadow-inner max-h-[60vh] overflow-y-auto custom-scrollbar">
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { display: none; }
                .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>
              <h2 className="text-xl font-bold mb-4">🏆 Other Competitors</h2>
              <div className="space-y-4">
                {rest.map((user, index) => (
                  <Card
                    key={user.username}
                    className="flex items-center justify-between p-4 bg-card border rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 text-center text-lg font-bold">#{index + 4}</div>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-blue-500">{user.points} pts</span>
                      {user.username !== currentUser.username && (
                        <Button size="sm" variant="outline" onClick={() => handleChallengeClick(user)}>
                          Challenge
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
