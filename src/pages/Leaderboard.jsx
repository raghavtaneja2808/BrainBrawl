import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import { motion } from "framer-motion";

export default function LeaderboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getMedal = (rank) => ["🥇", "🥈", "🥉"][rank] || `#${rank + 1}`;

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  if (loading) return <div className="text-center mt-20 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 px-4 md:px-10 space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">🏆 Brain Brawl Leaderboard</h1>
          <p className="text-muted-foreground text-lg">
            See where you stand and challenge your rivals!
          </p>
        </section>

        <section className="grid gap-10 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {topThree.map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-card rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center border border-muted"
            >
              <div className="text-4xl mb-2">{getMedal(index)}</div>
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage src={`https://avatars.dicebear.com/api/avataaars/${user.username}.svg`} />
                <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <p className="mt-2 text-yellow-400 font-bold text-lg">{user.points} pts</p>
            </motion.div>
          ))}
        </section>

        <section className="max-w-5xl mx-auto bg-muted rounded-3xl p-6 shadow-inner">
          <h2 className="text-2xl font-bold mb-6 text-center">🎯 All Competitors</h2>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {rest.map((user, index) => (
              <Card
                key={user.username}
                className="flex items-center justify-between p-4 bg-card border rounded-xl hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 font-semibold text-center">#{index + 4}</div>
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
                  <span className="text-sm font-medium text-yellow-400">{user.points} pts</span>
                  <Button size="sm" variant="outline" onClick={() => setSelectedUser(user)}>
                    Challenge
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="max-w-md p-6 bg-card rounded-3xl text-center border shadow-xl">
              <h2 className="text-2xl font-bold mb-4">⚔️ Challenge</h2>
              <p className="text-lg mb-6">
                Challenge <span className="font-semibold">{selectedUser.name}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => alert(`Challenge sent to ${selectedUser.name}`)}>
                  Send
                </Button>
                <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
