import React, { useContext, useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Mail, MapPin, ClipboardList, Flame, LogOut,
} from 'lucide-react';
import AuthContext from '@/assets/AuthContext';

const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const [location, setLocation] = useState('Delhi, India');
  const [isEditing, setIsEditing] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const userData = [
    { icon: Mail, label: 'Email', value: user?.email || 'No Email' },
    { icon: ClipboardList, label: 'Total Quizzes Attempted', value: '24' },
    { icon: Flame, label: 'Login Streak', value: '6 days' },
  ];

  return (
    <div className="min-h-screen mt-[-46px] bg-white dark:bg-black flex justify-center items-center px-4 py-6 md:py-10">
      <Card className="w-full max-w-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-3xl shadow-xl p-6">
        <div className="flex flex-col items-center gap-6">
          {/* Avatar */}
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-gray-300 dark:border-gray-500 mb-4"
            dangerouslySetInnerHTML={{ __html: user?.photo || '' }}
          />

          {/* User Info */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name || ''}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Elite Quizzer</p>

          {/* Editable Location */}
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-800 dark:text-white">
            <MapPin className="w-5 h-5" />
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={tempLocation}
                  onChange={(e) => setTempLocation(e.target.value)}
                  className="px-3 py-1 rounded-lg border dark:bg-zinc-900 border-gray-300 text-sm w-full sm:w-auto"
                />
                <button
                  onClick={() => {
                    setLocation(tempLocation);
                    setIsEditing(false);
                  }}
                  className="text-blue-500 text-sm ml-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{location}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 text-sm ml-2"
                >
                  Edit
                </button>
              </>
            )}
          </div>

          {/* Static Info */}
          <div className="w-full mt-6 space-y-3">
            {userData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-lg"
              >
                <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                  <item.icon className="w-5 h-5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sign Out */}
          <div className="mt-6 w-full flex justify-center">
            <button className="flex items-center gap-2 text-sm text-red-500 hover:underline">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileCard;
