import React, { useContext } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from "../components/ui/card";
import AuthContext from '@/assets/AuthContext';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 text-black dark:text-white border border-gray-300 dark:border-zinc-700 rounded-lg p-3 text-sm max-w-xs">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const QuizProgressChart = () => {
  let {user,refreshUser}=useContext(AuthContext);
  const data = daysOfWeek.map(day => {
    const stats = user?.dailyStats?.find(entry => entry.day === day);
    return {
      day,
      score: stats?.score || 0,
      time: stats?.timeSpent || 0,
    };
  });
  console.log("user.dailyStats", user?.dailyStats);

  console.log(data)
  return (
    <Card className="w-full bg-white dark:bg-black shadow-md rounded-2xl border border-gray-200 dark:border-zinc-700">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          Quiz Progress
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Legend wrapperStyle={{ color: 'var(--text-color)' }} />
            <Bar dataKey="score" fill="#6366F1" name="Score" />
            <Bar dataKey="time" fill="#EC4899" name="Time (min)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default QuizProgressChart;
