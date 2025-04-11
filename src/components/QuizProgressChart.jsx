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

const QuizProgressChart = () => {
  return (
    <Card className="w-full bg-white dark:bg-zinc-900 shadow-md rounded-2xl">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quiz Progress</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip
                contentStyle={{
                    backgroundColor: '#fff',
                    borderColor: '#ccc',
                }}
                wrapperStyle={{ color: '#000' }}
                cursor={{ fill: 'transparent' }} // Removes the hover background color
                />
            
            <Legend />
            <Bar dataKey="score" fill="#6366F1" name="Score" />
            <Bar dataKey="time" fill="#EC4899" name="Time (min)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default QuizProgressChart;
