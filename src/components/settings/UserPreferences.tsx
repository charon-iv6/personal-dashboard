import React, { useState } from 'react';
import { Settings, Bell, DollarSign } from 'lucide-react';

interface UserPreferencesProps {
  onSave: (preferences: {
    currency: string;
    notifications: boolean;
    weekStartsOn: 0 | 1; // 0 for Sunday, 1 for Monday
    theme: 'light' | 'dark' | 'system';
  }) => void;
  initialPreferences?: {
    currency: string;
    notifications: boolean;
    weekStartsOn: 0 | 1;
    theme: 'light' | 'dark' | 'system';
  };
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ onSave, initialPreferences }) => {
  const [preferences, setPreferences] = useState(initialPreferences || {
    currency: 'USD',
    notifications: true,
    weekStartsOn: 1,
    theme: 'system' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(preferences);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-gray-500" />
        <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Currency</span>
            </div>
          </label>
          <select
            value={preferences.currency}
            onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Notifications</span>
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Enable notifications</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Week Starts On</label>
          <select
            value={preferences.weekStartsOn}
            onChange={(e) => setPreferences({ ...preferences, weekStartsOn: Number(e.target.value) as 0 | 1 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Theme</label>
          <select
            value={preferences.theme}
            onChange={(e) => setPreferences({ ...preferences, theme: e.target.value as 'light' | 'dark' | 'system' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
};

export default UserPreferences;