import { useState } from 'react';
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const issues = [
  // Sample issues data
  { id: 1, title: 'Login Issue', status: 'Open', reportedBy: 'User123', date: '2024-07-28' },
  { id: 2, title: 'UI Bug on Dashboard', status: 'In Progress', reportedBy: 'User456', date: '2024-07-27' },
  // Add more sample issues as needed
];

const IssuesPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredIssues = issues.filter(issue => 
    (statusFilter === 'All' || issue.status === statusFilter) &&
    (issue.title.toLowerCase().includes(search.toLowerCase()) || 
    issue.reportedBy.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Issues Management</h1>
        <div className="flex space-x-4">
          <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            <AdjustmentsHorizontalIcon className="w-6 h-6" />
          </button>
          <button className="p-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </button>
        </div>
      </header>
      <div className="mb-4 flex items-center space-x-4">
        <input 
          type="text" 
          placeholder="Search issues..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2">ID</th>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Reported By</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map(issue => (
            <tr key={issue.id} className="border-b">
              <td className="p-2 text-center">{issue.id}</td>
              <td className="p-2">{issue.title}</td>
              <td className="p-2 text-center">{issue.status}</td>
              <td className="p-2">{issue.reportedBy}</td>
              <td className="p-2 text-center">{issue.date}</td>
              <td className="p-2 text-center">
                <button className="p-1 text-blue-600 hover:text-blue-500">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="p-1 text-red-600 hover:text-red-500">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesPage;
