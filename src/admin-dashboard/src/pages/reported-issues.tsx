import React, { useState } from 'react';
import { MagnifyingGlassIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ReportedIssue {
  id: number;
  title: string;
  description: string;
  reportedBy: string;
  timestamp: string;
}

const sampleIssues: ReportedIssue[] = [
  { id: 1, title: 'Login Failure', description: 'Users are unable to log in using their credentials.', reportedBy: 'John Doe', timestamp: '2024-07-28 14:32' },
  { id: 2, title: 'Database Connection Error', description: 'The application is experiencing database connection issues.', reportedBy: 'Jane Smith', timestamp: '2024-07-27 11:15' },
  { id: 3, title: 'API Response Delay', description: 'The API is taking too long to respond to requests.', reportedBy: 'Alice Johnson', timestamp: '2024-07-26 09:45' },
  { id: 4, title: 'User Interface Glitch', description: 'There is a visual glitch on the user dashboard.', reportedBy: 'Bob Brown', timestamp: '2024-07-25 08:30' },
  { id: 5, title: 'System Crash', description: 'The system crashed unexpectedly during peak hours.', reportedBy: 'Emily Davis', timestamp: '2024-07-24 12:00' },
];

const ReportedIssues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<ReportedIssue | null>(null);

  const filteredIssues = sampleIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reported Issues</h2>
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
        </div>
        <div className="bg-white shadow-md rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIssues.map(issue => (
                <tr key={issue.id} onClick={() => setSelectedIssue(issue)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{issue.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.reportedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{issue.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <ExclamationCircleIcon className="w-5 h-5 text-red-600 cursor-pointer" title="View Details" />
                    <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" title="Delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedIssue && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Issue Details</h3>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Title: {selectedIssue.title}</p>
              <p className="text-sm font-medium text-gray-900">Description: {selectedIssue.description}</p>
              <p className="text-sm font-medium text-gray-900">Reported By: {selectedIssue.reportedBy}</p>
              <p className="text-xs text-gray-500 mt-2">Timestamp: {selectedIssue.timestamp}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ReportedIssues;
