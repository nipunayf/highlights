import React from 'react';
import {
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// Sample data for Line chart (Active Users Over Time)
const activeUsersData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Active Users',
      data: [150, 200, 250, 220, 270, 300, 320],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }
  ]
};

// Sample data for Bar chart (Active Users by Day of the Week)
const activeUsersByDayData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Active Users',
      data: [120, 150, 170, 180, 200, 220, 250],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }
  ]
};

const ActiveUsers = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Overview */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Active Users Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Line Chart - Active Users Over Time */}
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <ChartBarIcon className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-gray-800">Active Users Over Time</h3>
            <Line data={activeUsersData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
          {/* Bar Chart - Active Users by Day of the Week */}
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <CalendarIcon className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-gray-800">Active Users by Day</h3>
            <Bar data={activeUsersByDayData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
        </div>
      </section>

      {/* User Activity Insights */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">User Activity Insights</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-500 mb-4">This section provides detailed insights into user activity patterns and trends. Analyze how active users are interacting with the system to gain insights into engagement and performance.</p>

          {/* Example Insights */}
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="w-6 h-6 text-blue-500 mr-3" />
              <p className="text-gray-700">High user engagement observed during weekdays, peaking on Fridays.</p>
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-6 h-6 text-green-500 mr-3" />
              <p className="text-gray-700">Average session duration has increased over the past few months.</p>
            </div>
            <div className="flex items-center">
              <DocumentTextIcon className="w-6 h-6 text-yellow-500 mr-3" />
              <p className="text-gray-700">Feature usage trends suggest users are highly engaged with task management tools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ActiveUsers;
