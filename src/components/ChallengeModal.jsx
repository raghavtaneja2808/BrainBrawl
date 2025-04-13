import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Dummy data (replace with backend data)
const sampleChallenges = [
  {
    id: 1,
    opponent: "player3",
    name: "Player3",
    type: "sent",
    status: "pending",
  },
  {
    id: 2,
    opponent: "player1",
    name: "Player1",
    type: "received",
    status: "pending",
  },
  {
    id: 3,
    opponent: "player5",
    name: "Player5",
    type: "sent",
    status: "accepted",
  },
  {
    id: 4,
    opponent: "player7",
    name: "Player7",
    type: "received",
    status: "declined",
  },
];

export default function ChallengePage() {
  const [challenges, setChallenges] = useState(sampleChallenges);
  const [players, setPlayers] = useState([
    { name: "Player1", username: "player1" },
    { name: "Player2", username: "player2" },
    { name: "Player3", username: "player3" },
    { name: "Player4", username: "player4" },
    { name: "Player5", username: "player5" },
    { name: "Player6", username: "player6" },
  ]); // Dummy player data

  // Function to handle sending a challenge
  const handleChallenge = (opponent) => {
    const newChallenge = {
      id: challenges.length + 1,
      opponent: opponent.username,
      name: opponent.name,
      type: "sent",
      status: "pending",
    };
    setChallenges((prevChallenges) => [...prevChallenges, newChallenge]);
  };

  // Function to handle accepting or declining a challenge
  const handleAction = (id, action) => {
    setChallenges((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, status: action } : ch
      )
    );
  };

  const statusStyles = {
    pending: "text-yellow-500",
    accepted: "text-green-500",
    declined: "text-red-500",
  };

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Navbar />

      <div className="px-4 py-10 md:px-20 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center mb-4">⚔️ Challenges</h1>

        {/* List of Players to Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {players.map((player) => (
            <Card
              key={player.username}
              className="flex items-center justify-between p-4 rounded-xl border shadow-md hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={`https://avatars.dicebear.com/api/avataaars/${player.username}.svg`}
                  />
                  <AvatarFallback>
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-semibold">{player.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Challenge this player
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleChallenge(player)}
                >
                  Challenge
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Challenges Sent and Received */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="flex items-center justify-between p-4 rounded-xl border shadow-md hover:scale-[1.01] transition-transform"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={`https://avatars.dicebear.com/api/avataaars/${challenge.opponent}.svg`}
                  />
                  <AvatarFallback>
                    {challenge.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-semibold">{challenge.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {challenge.type === "sent"
                      ? "You challenged them"
                      : "Challenged you"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {challenge.status === "pending" && challenge.type === "received" ? (
                  <>
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleAction(challenge.id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleAction(challenge.id, "declined")}
                    >
                      Decline
                    </Button>
                  </>
                ) : (
                  <span
                    className={`text-sm font-medium capitalize ${statusStyles[challenge.status]}`}
                  >
                    {challenge.status}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
