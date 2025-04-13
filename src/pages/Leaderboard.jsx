import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const users = Array.from({ length: 20 }).map((_, i) => ({
  name: `Player${i + 1}`,
  points: 200 - i * 5,
  username: `player${i + 1}`,
  accuracy: Math.floor(Math.random() * 100),
}));

export default function LeaderboardPage() {
  const currentUser = users[7];
  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [isChallengeMode, setIsChallengeMode] = useState(false);

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
    setSelectedOpponent(null);
    setIsChallengeMode(false);
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
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
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="p-6 text-center rounded-3xl shadow-md border col-span-1 lg:col-span-3 bg-muted">
                <h2 className="text-xl font-bold mb-2">🏅 Your Position</h2>
                <p className="text-lg">{currentUser.name} - <strong>{currentUser.points} pts</strong></p>
                <p className="text-sm text-muted-foreground">Current Rank: <span className="font-semibold">#8</span></p>
              </Card>

              {topThree.map((user, i) => (
                <Card
                  key={user.username}
                  className="flex flex-col items-center p-6 bg-card shadow-lg rounded-2xl border hover:scale-105 transition"
                >
                  <Avatar className="w-20 h-20 mb-3">
                    <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`} />
                    <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-sm">{getMedal(i)} - {user.points} pts</p>
                  </div>
                </Card>
              ))}
            </section>

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
