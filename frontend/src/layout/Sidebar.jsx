import React from 'react';
import { Link, useOutletContext, useLocation } from 'react-router-dom';
import { ProfileCard } from '../components/ProfileCard';
import {
  FaHouse,
  FaHammer,
  FaPeopleGroup,
  FaDollarSign,
  FaPlus,
  FaBuilding,
} from 'react-icons/fa6';

function Sidebar({ user }) {
  const location = useLocation();
  const pathname = location.pathname;

  // Function to check if a link is active
  const isActive = path => {
    if (path === '/' && pathname === '/') return true;
    if (path === '' && pathname === '/owner') return true;
    if (path !== '/' && path !== '' && pathname.includes(path)) return true;
    return false;
  };

  // A custom component for sidebar links with active state styling
  const NavLink = ({ to, icon, children }) => {
    const active = isActive(to);

    return (
      <Link
        to={to}
        className={`flex items-center p-2 rounded-lg group transition-all duration-200 ${
          active
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-md'
            : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <div
          className={`flex-shrink-0 w-5 h-5 transition duration-75 ${
            active
              ? 'text-white'
              : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
          }`}
        >
          {icon}
        </div>
        <span className="flex-1 ms-3 whitespace-nowrap">{children}</span>
        {active && <div className="h-2 w-2 rounded-full bg-white ml-2 animate-pulse"></div>}
      </Link>
    );
  };

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed top-0 flex flex-col left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gray-50 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        className="inline-flex w-full h-16 text-xl flex-col p-4 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 font-bold border-b border-gray-200 dark:border-gray-700"
      >
        RMS
        <span className="block text-xs font-normal text-gray-500 dark:text-gray-400">
          Owner dashboard
        </span>
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink to="/" icon={<FaHouse />}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="" icon={<FaBuilding />}>
              Houses
            </NavLink>
          </li>
          <li>
            <NavLink
              to="visitors"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
              }
            >
              Visitor Requests
            </NavLink>
          </li>
          <li>
            <NavLink to="maintenance" icon={<FaHammer />}>
              Maintenance
            </NavLink>
          </li>
          <li>
            <NavLink to="show-tenant" icon={<FaPeopleGroup />}>
              Tenants
            </NavLink>
          </li>
          <li>
            <NavLink to="payments" icon={<FaDollarSign />}>
              Payment history
            </NavLink>
          </li>
          <li>
            <NavLink to="create-house" icon={<FaPlus />}>
              Add House
            </NavLink>
          </li>
        </ul>
      </div>
      <ProfileCard user={user} />
    </aside>
  );
}

export default Sidebar;
