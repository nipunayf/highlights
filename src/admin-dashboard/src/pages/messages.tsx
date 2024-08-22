import React, { useState } from 'react';
import { MagnifyingGlassIcon, TrashIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: string;
}

const sampleMessages: Message[] = [
  { id: 1, sender: 'System Admin', subject: 'Server Maintenance', content: 'Scheduled server maintenance on July 30th, 2024 from 1:00 AM to 3:00 AM.', timestamp: '2024-07-28 14:32' },
  { id: 2, sender: 'System Admin', subject: 'Update Available', content: 'A new update for the system is available. Please update to version 2.1.0.', timestamp: '2024-07-27 11:15' },
  { id: 3, sender: 'Support Team', subject: 'Service Outage', content: 'An unexpected service outage occurred on July 26th. The issue has been resolved.', timestamp: '2024-07-26 09:45' },
  { id: 4, sender: 'Security Team', subject: 'Security Alert', content: 'Suspicious activity detected. Please review the security logs.', timestamp: '2024-07-25 08:30' },
  { id: 5, sender: 'System Admin', subject: 'Backup Completed', content: 'System backup completed successfully on July 24th, 2024.', timestamp: '2024-07-24 12:00' },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const filteredMessages = sampleMessages.filter(message =>
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <section className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMessages.map(message => (
                <tr key={message.id} onClick={() => setSelectedMessage(message)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.sender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{message.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <EnvelopeIcon className="w-5 h-5 text-blue-600 cursor-pointer" title="Reply" />
                    <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" title="Delete" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedMessage && (
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Message Details</h3>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900">Sender: {selectedMessage.sender}</p>
              <p className="text-sm font-medium text-gray-900">Subject: {selectedMessage.subject}</p>
              <p className="text-sm text-gray-600 mt-2">{selectedMessage.content}</p>
              <p className="text-xs text-gray-500 mt-2">Timestamp: {selectedMessage.timestamp}</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Messages;
