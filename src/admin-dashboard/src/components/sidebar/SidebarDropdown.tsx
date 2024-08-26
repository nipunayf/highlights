// src/components/SidebarDropdown.tsx
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const SidebarDropdown = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className="flex items-center py-2 px-4 w-full hover:bg-gray-700"
      >
        {title}
        {isOpen ? <ChevronUpIcon className="w-5 h-5 ml-auto" /> : <ChevronDownIcon className="w-5 h-5 ml-auto" />}
      </button>
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
};

export default SidebarDropdown;
