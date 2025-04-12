import React, { useContext, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail, MapPin, ClipboardList, Flame, Sparkles, LogOut, Upload,
} from 'lucide-react';
import AuthContext from '@/assets/AuthContext';
import axios from 'axios';

const ProfileCard = () => {
  const Logout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
  
      if (res.data.message) {
        console.log("Logout successful");
        setTimeout(() => {
          window.location = "/";
        }, 300); // small delay to ensure cookie/session clears
      } else {
        console.log("Logout response invalid");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
    let {user,refreshUser}=useContext(AuthContext);
  const [motivation, setMotivation] = useState('Loading...');

  // 🔁 Fetch motivation quote on page load
  useEffect(() => {
    const fetchMotivation = async () => {
      try {
        const res = await fetch(`https://api.quotable.io/random`);
        const data = await res.json();
        setMotivation(`“${data.content}” – ${data.author}`);
      } catch (error) {
        console.error('Failed to fetch quote:', error);
        setMotivation('“Keep learning, keep growing.”');
      }
    };

    fetchMotivation();
  }, []);

  const userData = [
    { icon: Mail, label: 'Email', value: user?.email || 'No Email' },
    { icon: MapPin, label: 'Location', value: 'Delhi, India' },
    { icon: ClipboardList, label: 'Total Quizzes Attempted', value: '24' },
    { icon: Flame, label: 'Login Streak', value: '6 days' },
    { icon: Sparkles, label: 'Motivation', value: motivation },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex justify-center pt-10 px-4 mt-[-34px]">
      <Card className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-4">
        <div className="flex flex-col items-center gap-4">
          {/* Avatar */}
          <div className="relative">
          <div
                className={"w-20 h-20 rounded-full border border-gray-300 dark:border-gray-700"}
                dangerouslySetInnerHTML={{ __html: user?.photo||"" }}
            />
     
        
          </div>

          {/* User Info */}
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{user?.name||""}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Elite Quizzer</p>

          {/* Data Section */}
          <div className="w-full mt-3 space-y-2">
            {userData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-100 dark:bg-zinc-800 px-3 py-2 rounded-xl"
              >
                <div className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                  <item.icon className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sign Out */}
          <div className="mt-6 w-full flex justify-center">
            <button className="flex items-center gap-2 text-sm text-red-500 hover:underline hover:cursor-pointer">
              <LogOut className="w-4 h-4" onClick={Logout}/>
              Sign Out
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
