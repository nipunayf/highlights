import Link from 'next/link';
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, FlagIcon, PencilIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'; // Import new icons
import { useRouter } from 'next/router';

interface SidebarItemProps {
  href: string;
  icon: 'home' | 'user-group' | 'cog' | 'flag' | 'pencil' | 'exclamation-circle'; // Update type to include new icons
  text: string;
}

const iconMap = {
  home: <HomeIcon className="w-6 h-6" />,
  'user-group': <UserGroupIcon className="w-6 h-6" />,
  cog: <Cog6ToothIcon className="w-6 h-6" />,
  flag: <FlagIcon className="w-6 h-6" />,
  pencil: <PencilIcon className="w-6 h-6" />,
  'exclamation-circle': <ExclamationCircleIcon className="w-6 h-6" />,
};

const SidebarItem = ({ href, icon, text }: SidebarItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
          isActive ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 text-gray-300'
        }`}
      >
        {iconMap[icon]}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
