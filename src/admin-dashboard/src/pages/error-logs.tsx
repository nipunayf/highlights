import React, { useState } from 'react';
import { MagnifyingGlassIcon, ExclamationCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'; // Updated icon import

interface ErrorLog {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  type: string;
}

const sampleErrorLogs: ErrorLog[] = [
  { id: 1, title: 'Database Connection Error', message: 'Failed to connect to the database server.', timestamp: '2024-07-30 14:32', type: 'Critical' },
  { id: 2, title: 'API Timeout', message: 'The API request timed out after 10 seconds.', timestamp: '2024-07-29 11:15', type: 'Warning' },
  { id: 3, title: 'File Not Found', message: 'Requested file was not found on the server.', timestamp: '2024-07-28 09:45', type: 'Error' },
  { id: 4, title: 'Authentication Failure', message: 'User authentication failed for user123.', timestamp: '2024-07-27 13:22', type: 'Critical' },
  { id: 5, title: 'Server Overload', message: 'The server is experiencing high load. Performance may be affected.', timestamp: '2024-07-26 08:30', type: 'Warning' },
  { id: 6, title: 'Missing Configuration', message: 'Required configuration file is missing.', timestamp: '2024-07-25 17:05', type: 'Error' },
  { id: 7, title: 'Email Delivery Failure', message: 'Failed to deliver email to user@example.com.', timestamp: '2024-07-24 11:50', type: 'Warning' },
  { id: 8, title: 'Invalid Input', message: 'Received invalid input in API request.', timestamp: '2024-07-23 16:15', type: 'Error' },
  { id: 9, title: 'Permission Denied', message: 'User does not have permission to access this resource.', timestamp: '2024-07-22 09:30', type: 'Critical' },
  { id: 10, title: 'Cache Miss', message: 'Cache miss occurred while retrieving user data.', timestamp: '2024-07-21 12:00', type: 'Warning' },
];

const ErrorLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredLogs = sampleErrorLogs.filter(log => 
    (log.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     log.message.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filter === 'All' || log.type === filter)
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Error Logs</h2>
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
                <button onClick={() => handleFilterChange('Error')} className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left">Error</button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ErrorLogs;
