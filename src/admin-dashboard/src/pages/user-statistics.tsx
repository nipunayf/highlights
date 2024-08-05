// UserStatistics.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 200 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 500 },
  { month: 'Apr', users: 700 },
  { month: 'May', users: 900 },
  { month: 'Jun', users: 1100 },
  { month: 'Jul', users: 1300 },
];

const userActivityData = [
  { name: 'Active Users', count: 800 },
  { name: 'Inactive Users', count: 500 },
  { name: 'New Users', count: 300 },
];

const demographicsData = [
  { name: '18-24', users: 400 },
  { name: '25-34', users: 600 },
  { name: '35-44', users: 300 },
  { name: '45-54', users: 200 },
];

const UserStatistics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Statistics</h1>

      {/* User Growth */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">User Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* User Activity */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">User Activity Levels</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userActivityData} margin={{ top: 5, right:500, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </section>

     
    </div>
  );
};

export default UserStatistics;
