import React, { useState } from 'react';
import { MagnifyingGlassIcon, ExclamationCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface Alert {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  severity: string;
}

const sampleAlerts: Alert[] = [
  { id: 1, title: 'Database Error', message: 'Critical database connection issue detected.', timestamp: '2024-07-30 14:32', severity: 'Critical' },
  { id: 2, title: 'High Memory Usage', message: 'Memory usage has exceeded the recommended limit.', timestamp: '2024-07-29 11:15', severity: 'Warning' },
  { id: 3, title: 'Service Down', message: 'A crucial service is currently down.', timestamp: '2024-07-28 09:45', severity: 'Critical' },
  { id: 4, title: 'Network Latency', message: 'Network latency is above acceptable levels.', timestamp: '2024-07-27 13:22', severity: 'Warning' },
  { id: 5, title: 'High Error Rate', message: 'The application is experiencing a high error rate.', timestamp: '2024-07-26 08:30', severity: 'Critical' },
  { id: 6, title: 'Security Breach Attempt', message: 'Potential security breach detected.', timestamp: '2024-07-25 17:05', severity: 'Critical' },
  { id: 7, title: 'Resource Allocation', message: 'Resource allocation is running low.', timestamp: '2024-07-24 11:50', severity: 'Warning' },
  { id: 8, title: 'System Update Available', message: 'A new system update is available for installation.', timestamp: '2024-07-23 16:15', severity: 'Info' },
  { id: 9, title: 'Backup Failure', message: 'Scheduled backup failed to complete.', timestamp: '2024-07-22 09:30', severity: 'Critical' },
  { id: 10, title: 'Deprecated API Warning', message: 'Using deprecated API endpoints in requests.', timestamp: '2024-07-21 12:00', severity: 'Warning' },
];

const Alerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredAlerts = sampleAlerts.filter(alert =>
    (alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     alert.message.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filter === 'All' || alert.severity === filter)
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        <div className="flex items-center mb-4">
          <div className="relative flex-grow">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative ml-4">
            <button
              className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500 mr-2" />
              <span>{filter}</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200">
                <button onClick={() => handleFilterChange('All')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">All</button>
                <button onClick={() => handleFilterChange('Critical')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Critical</button>
                <button onClick={() => handleFilterChange('Warning')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Warning</button>
                <button onClick={() => handleFilterChange('Info')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Info</button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map(alert => (
                <tr key={alert.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{alert.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Alerts;
