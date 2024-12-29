import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FinancialCardProps {
  icon: LucideIcon;
  title: string;
  amount: number;
  iconColor: string;
}

const FinancialCard: React.FC<FinancialCardProps> = ({
  icon: Icon,
  title,
  amount,
  iconColor,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <p className="text-2xl font-semibold text-gray-900">
        ${amount.toLocaleString()}
      </p>
    </div>
  );
};

export default FinancialCard;