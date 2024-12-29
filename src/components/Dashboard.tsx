import React from 'react';
import { LayoutDashboard, Wallet, CheckSquare } from 'lucide-react';
import FinancialOverview from './financial/FinancialOverview';
import TaskManager from './tasks/TaskManager';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'finances' | 'tasks'>('overview');

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-gray-50 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview</span>
          </button>
          
          <button
            onClick={() => setActiveTab('finances')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'finances'
                ? 'bg-gray-50 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>Finances</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'tasks'
                ? 'bg-gray-50 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span>Tasks</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FinancialOverview />
            <TaskManager />
          </div>
        )}
        {activeTab === 'finances' && <FinancialOverview />}
        {activeTab === 'tasks' && <TaskManager />}
      </div>
    </div>
  );
};

export default Dashboard;