import React from 'react';
import {
  GlobeAltIcon,
  ServerIcon,
  BellIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CpuChipIcon
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

const SystemHealth = () => {
  // Sample data for system health
  const systemStatus = [
    { id: 1, name: 'Web Server', status: 'Operational', details: 'Web server is running smoothly.', color: 'bg-green-100', icon: <CheckCircleIcon className="w-6 h-6 text-green-500" /> },
    { id: 2, name: 'Database', status: 'Degraded', details: 'Database performance is slightly degraded.', color: 'bg-yellow-100', icon: <ExclamationCircleIcon className="w-6 h-6 text-yellow-500" /> },
    { id: 3, name: 'API', status: 'Down', details: 'API service is currently down.', color: 'bg-red-100', icon: <XCircleIcon className="w-6 h-6 text-red-500" /> },
  ];

  const recentAlerts = [
    { id: 1, title: 'Server Overload', message: 'High CPU usage detected on server 2.', timestamp: '2024-07-28 14:32' },
    { id: 2, title: 'Database Connection Issue', message: 'Intermittent connection issues with the database.', timestamp: '2024-07-27 09:15' },
    { id: 3, title: 'API Downtime', message: 'API service was down for 30 minutes.', timestamp: '2024-07-26 16:45' },
  ];

  const serverPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'CPU Usage',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Memory Usage',
        data: [50, 60, 70, 60, 65, 70, 75],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      }
    ],
  };

  const serverPerformanceOptions = {
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.formattedValue}%`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Usage (%)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* System Health Overview */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">System Health Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemStatus.map(status => (
            <div key={status.id} className={`p-4 rounded-lg flex items-center space-x-4 ${status.color}`}>
              <div className="flex-shrink-0">{status.icon}</div>
              <div>
                <h3 className="text-lg font-medium">{status.name}</h3>
                <p className="text-sm text-gray-600">{status.details}</p>
                <p className={`text-sm font-semibold mt-1 ${status.status === 'Operational' ? 'text-green-600' : status.status === 'Degraded' ? 'text-yellow-600' : 'text-red-600'}`}>{status.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Server Performance */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Server Performance</h2>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <CpuChipIcon className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="text-lg font-medium">CPU Usage</h3>
              <p className="text-gray-600">Monitor the CPU usage over time to ensure optimal performance.</p>
            </div>
          </div>
          <div className="w-full">
            <Line data={serverPerformanceData} options={serverPerformanceOptions} />
          </div>
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Recent Alerts</h2>
        <ul className="space-y-4">
          {recentAlerts.map(alert => (
            <li key={alert.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
              <div className="flex items-start space-x-4">
                <BellIcon className="w-6 h-6 text-red-500" />
                <div>
                  <span className="text-md font-semibold text-gray-800">{alert.title}</span>
                  <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  <span className="text-xs text-gray-500 mt-2">{alert.timestamp}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Ongoing Issues */}
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-200 pb-2">Ongoing Issues</h2>
        <div className="flex items-center space-x-4">
          <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
          <div>
            <h3 className="text-lg font-medium">Current Issues</h3>
            <p className="text-gray-600">Overview of any ongoing issues affecting the system.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemHealth;
