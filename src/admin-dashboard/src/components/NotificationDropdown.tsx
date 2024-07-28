import React from 'react';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationDropdownProps {
  notifications: Notification[];
}

const NotificationDropdown = ({ notifications }: NotificationDropdownProps) => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 text-gray-800 dark:text-gray-200">
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <ul className="space-y-2">
          {notifications.map(notification => (
            <li key={notification.id} className="p-3 border-b border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{notification.title}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                <span className="text-xs text-gray-500 dark:text-gray-500 mt-2">{notification.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationDropdown;
