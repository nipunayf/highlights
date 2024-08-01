import React, { useState, useEffect } from 'react';
import { Tip } from '@/models/Tip';
import { addTip, fetchDailyTips } from '@/services/api';

const AddDailyTipPopup = ({ open, onClose }: { open: boolean, onClose: () => void }) => {
  const [formState, setFormState] = useState({ label: '', tip: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};
    if (!formState.label) newErrors.label = 'Label is required';
    if (!formState.tip) newErrors.tip = 'Tip is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newTip = {
      label: formState.label,
      tip: formState.tip,
    };

    try {
      await addTip(newTip);
      setFormState({ label: '', tip: '' });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Error submitting tip:', error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Tip</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={formState.label}
              onChange={(e) => setFormState({ ...formState, label: e.target.value })}
              placeholder="Enter tip label"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.label && <p className="text-red-500 text-sm">{errors.label}</p>}
          </div>
          <div className="mb-4">
            <textarea
              value={formState.tip}
              onChange={(e) => setFormState({ ...formState, tip: e.target.value })}
              placeholder="Add a new tip"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.tip && <p className="text-red-500 text-sm">{errors.tip}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UpdateDailyTips = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Fetch tips from the database
    const loadTips = async () => {
      try {
        const data = await fetchDailyTips();
        setTips(data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      }
    };

    loadTips();
  }, []);

  const filteredTips = tips.filter(tip =>
    tip.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.tip.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleUpdate = (tip: Tip) => {
    // Logic to handle update
    console.log('Update Tip:', tip);
  };

  const handleDelete = (tip: Tip) => {
    // Logic to handle delete
    console.log('Delete Tip with ID:', tip);
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Daily Tips</h1>

      {/* Search Box */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tips..."
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Button to Open Popup */}
      <div className="mb-6">
        <button
          onClick={handleOpenPopup}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add Tip
        </button>
      </div>

      {/* Tips Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-bold text-black-600 uppercase tracking-wider">Id</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-black-600 uppercase tracking-wider">Label</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-black-600 uppercase tracking-wider">Tip</th>
            <th className="px-6 py-3 text-left text-sm font-bold text-black-600 uppercase tracking-wider">Options</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTips.map(tip => (
            <tr key={tip.id}>
              <td className="px-6 py-4 whitespace-nowrap">{tip.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tip.label}</td>
              <td className="px-6 py-4 whitespace-nowrap">{tip.tip}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleUpdate(tip)}
                  className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(tip)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {showPopup && (
        <AddDailyTipPopup open={showPopup} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default UpdateDailyTips;
