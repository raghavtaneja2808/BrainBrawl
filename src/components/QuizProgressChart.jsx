import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent } from "../components/ui/card";

const data = [
  { day: 'Mon', score: 80, time: 5 },
  { day: 'Tue', score: 70, time: 4 },
  { day: 'Wed', score: 90, time: 6 },
  { day: 'Thu', score: 60, time: 3 },
  { day: 'Fri', score: 75, time: 5 },
];

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
