import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  placeholder: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, icon: Icon, placeholder }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="h-64 flex items-center justify-center text-gray-400">
        {placeholder}
      </div>
    </div>
  );
};

export default ChartCard;