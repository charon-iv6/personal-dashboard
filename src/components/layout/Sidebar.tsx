import React from 'react';
import { LayoutDashboard, Wallet, CheckSquare } from 'lucide-react';

interface SidebarProps {
  activeTab: 'overview' | 'finances' | 'tasks';
  onTabChange: (tab: 'overview' | 'finances' | 'tasks') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back</p>
      </div>
      
      <nav className="space-y-2">
        <NavButton
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Overview"
          isActive={activeTab === 'overview'}
          onClick={() => onTabChange('overview')}
        />
        <NavButton
          icon={<Wallet className="w-5 h-5" />}
          label="Finances"
          isActive={activeTab === 'finances'}
          onClick={() => onTabChange('finances')}
        />
        <NavButton
          icon={<CheckSquare className="w-5 h-5" />}
          label="Tasks"
          isActive={activeTab === 'tasks'}
          onClick={() => onTabChange('tasks')}
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-gray-50 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;