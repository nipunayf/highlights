import React from 'react';
import {
  ClockIcon,
  UserIcon,
  ServerIcon,
  ChartBarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for recent activities
const recentActivities = [
  { id: 1, type: 'User Registration', description: 'New user John Doe registered.', timestamp: '2024-07-28 10:30 AM' },
  { id: 2, type: 'System Update', description: 'System update to version 2.1.1 completed.', timestamp: '2024-07-27 02:15 PM' },
  { id: 3, type: 'Server Maintenance', description: 'Scheduled server maintenance completed.', timestamp: '2024-07-26 06:00 PM' },
];

const activityData = {
  labels: ['Jul 1', 'Jul 5', 'Jul 10', 'Jul 15', 'Jul 20', 'Jul 25', 'Jul 30'],
  datasets: [
    {
      label: 'Activities',
      data: [5, 10, 15, 8, 12, 20, 18],
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      fill: true,
    }
  ],
};

const activityOptions = {
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return `${context.dataset.label}: ${context.formattedValue} activities`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Number of Activities',
      },
      suggestedMin: 0,
    },
  },
};

const RecentActivities = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Recent Activities Overview */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Recent Activities</h2>
        <ul className="space-y-4">
          {recentActivities.map(activity => (
            <li key={activity.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
              <div className="flex items-start space-x-4">
                <ClockIcon className="w-6 h-6 text-blue-500" />
                <div>
                  <span className="text-md font-semibold text-gray-800">{activity.type}</span>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  <span className="text-xs text-gray-500 mt-2">{activity.timestamp}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Activity Trends */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Activity Trends</h2>
        <div className="w-full">
          <Line data={activityData} options={activityOptions} />
        </div>
      </section>

      {/* Detailed Activity Analysis */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Detailed Activity Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <UserIcon className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium">User Registrations</h3>
              <p className="text-gray-600">Overview of user registrations over time.</p>
              <ChartBarIcon className="w-6 h-6 text-gray-500 mt-2" />
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <ServerIcon className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <h3 className="text-lg font-medium">System Updates</h3>
              <p className="text-gray-600">Details of recent system updates and their impact.</p>
              <DocumentTextIcon className="w-6 h-6 text-gray-500 mt-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecentActivities;
