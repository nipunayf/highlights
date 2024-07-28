import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive'; // Correct type for status
}

const sampleUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
];

const Users = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [newUser, setNewUser] = useState<{ name: string; email: string; status: 'Active' | 'Inactive' }>({
    name: '',
    email: '',
    status: 'Active',
  });
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      setUsers([
        ...users,
        { id: Date.now(), ...newUser },
      ]);
      setNewUser({ name: '', email: '', status: 'Active' });
    }
  };

  const handleUpdateUser = () => {
    if (editUserId !== null) {
      setUsers(
        users.map(user =>
          user.id === editUserId ? { ...user, ...newUser } : user
        )
      );
      setNewUser({ name: '', email: '', status: 'Active' });
      setEditUserId(null);
    }
  };

  const handleEditUser = (id: number, user: Omit<User, 'id'>) => {
    setEditUserId(id);
    setNewUser(user);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Search Box */}
      <div className="flex items-center mb-4">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Add/Update User */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">{editUserId ? 'Update User' : 'Add New User'}</h2>
        <input
          type="text"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <input
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <select
          value={newUser.status}
          onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'Active' | 'Inactive' })}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button
          onClick={editUserId ? handleUpdateUser : handleAddUser}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {editUserId ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* Users List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <ul>
          {filteredUsers.map(user => (
            <li key={user.id} className="flex items-center justify-between p-2 border-b border-gray-200">
              <div className="flex flex-col">
                <span className="font-semibold">{user.name}</span>
                <span className="text-gray-600">{user.email}</span>
                <span className={`text-sm ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {user.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditUser(user.id, { name: user.name, email: user.email, status: user.status })}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <PencilIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
