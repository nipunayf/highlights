import { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  // State for general settings
  const [siteTitle, setSiteTitle] = useState('My Application');
  const [siteDescription, setSiteDescription] = useState('This is a description of my application.');
  
  // State for profile settings
  const [username, setUsername] = useState('admin');
  const [email, setEmail] = useState('admin@example.com');
  
  // State for application preferences
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved');
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* General Settings */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <input
          type="text"
          value={siteTitle}
          onChange={(e) => setSiteTitle(e.target.value)}
          placeholder="Site Title"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          value={siteDescription}
          onChange={(e) => setSiteDescription(e.target.value)}
          placeholder="Site Description"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {/* Profile Settings */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
      </div>

      {/* Application Preferences */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Application Preferences</h2>
        <div className="flex items-center mb-4">
          <label className="mr-4">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="mr-2"
          />
          <label>Enable Notifications</label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center"
        >
          <CheckIcon className="w-6 h-6 mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
