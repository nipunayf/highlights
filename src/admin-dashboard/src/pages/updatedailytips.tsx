import { useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Tip {
  id: number;
  text: string;
}

const sampleTips: Tip[] = [
  { id: 1, text: 'Tip 1: Stay hydrated throughout the day.' },
  { id: 2, text: 'Tip 2: Regular exercise improves productivity.' },
  { id: 3, text: 'Tip 3: Prioritize your tasks for the day.' },
];

const UpdateDailyTips = () => {
  const [tips, setTips] = useState<Tip[]>(sampleTips);
  const [newTip, setNewTip] = useState('');
  const [editTipId, setEditTipId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTip = () => {
    if (newTip.trim()) {
      setTips([...tips, { id: Date.now(), text: newTip }]);
      setNewTip('');
    }
  };

  const handleUpdateTip = () => {
    if (editTipId !== null) {
      setTips(tips.map(tip => tip.id === editTipId ? { ...tip, text: newTip } : tip));
      setNewTip('');
      setEditTipId(null);
    }
  };

  const handleEditTip = (id: number, text: string) => {
    setEditTipId(id);
    setNewTip(text);
  };

  const handleDeleteTip = (id: number) => {
    setTips(tips.filter(tip => tip.id !== id));
  };

  const filteredTips = tips.filter(tip =>
    tip.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Daily Tips</h1>
      
      {/* Search Box */}
      <div className="flex items-center mb-4">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tips..."
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add/Update Tip */}
      <div className="mb-6">
        <textarea
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
          placeholder={editTipId ? 'Update your tip' : 'Add a new tip'}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={editTipId ? handleUpdateTip : handleAddTip}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {editTipId ? 'Update Tip' : 'Add Tip'}
        </button>
      </div>

      {/* Tips List */}
      <ul>
        {filteredTips.map(tip => (
          <li key={tip.id} className="flex items-center justify-between p-2 border-b border-gray-200">
            <span>{tip.text}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditTip(tip.id, tip.text)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                <PencilIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDeleteTip(tip.id)}
                className="text-red-500 hover:text-red-700"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateDailyTips;
