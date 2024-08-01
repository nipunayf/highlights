import React from 'react';
import {
  ChartBarIcon,
  DocumentTextIcon,
  UserIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

// Sample data for Line chart (User Signups)
const userSignupsData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'User Signups',
      data: [30, 45, 60, 50, 70, 80, 90],
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1
    }
  ]
};

// Sample data for Pie chart (Feature Usage Distribution)
const usageDistributionData = {
  labels: ['Task Management', 'Integration', 'Dashboard & Analytics', 'Daily Tips & Personalization', 'Support Issues Management'],
  datasets: [
    {
      label: 'Feature Usage',
      data: [30, 20, 25, 15, 10],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
      borderWidth: 1
    }
  ]
};

const UsageTrends = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Usage Trends */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Usage Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Line Chart - User Signups */}
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <ChartBarIcon className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-gray-800">User Signups</h3>
            <Line data={userSignupsData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
          {/* Pie Chart - Feature Usage Distribution */}
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <DocumentTextIcon className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2 text-gray-800">Feature Usage Distribution</h3>
            <Pie data={usageDistributionData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </div>
        </div>
      </section>

      {/* Additional Insights */}
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-2">Additional Insights</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-500 mb-4">This section provides detailed insights and analysis of user engagement and feature usage. Here, you can monitor key metrics and trends to understand how users are interacting with different features of the application.</p>
          
          {/* Example Insights */}
          <div className="space-y-4">
            <div className="flex items-center">
              <UserIcon className="w-6 h-6 text-blue-500 mr-3" />
              <p className="text-gray-700">Task Management: Significant usage indicates robust task handling and management features.</p>
            </div>
            <div className="flex items-center">
              <Cog6ToothIcon className="w-6 h-6 text-green-500 mr-3" />
              <p className="text-gray-700">Integration: Moderate usage reflecting successful integration with external systems.</p>
            </div>
            <div className="flex items-center">
              <Squares2X2Icon className="w-6 h-6 text-yellow-500 mr-3" />
              <p className="text-gray-700">Dashboard & Analytics: High engagement showing strong interest in data-driven insights.</p>
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="w-6 h-6 text-red-500 mr-3" />
              <p className="text-gray-700">Daily Tips & Personalization: Lower engagement but potential for growth with targeted recommendations.</p>
            </div>
            <div className="flex items-center">
              <BellIcon className="w-6 h-6 text-purple-500 mr-3" />
              <p className="text-gray-700">Support Issues Management: Essential feature with room for optimization based on user feedback.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsageTrends;
