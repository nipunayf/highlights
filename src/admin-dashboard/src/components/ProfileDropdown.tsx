// src/components/ProfileDropdown.tsx
import Link from 'next/link';

const ProfileDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg">
      <ul>
        <li>
          <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
        </li>
        <li>
          <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
