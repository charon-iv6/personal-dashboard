import React from 'react';
import { Transaction } from '../../types';
import { calculateMonthlySpending } from '../../utils/chartUtils';

interface SpendingTrendsProps {
  transactions: Transaction[];
}

const SpendingTrends: React.FC<SpendingTrendsProps> = ({ transactions }) => {
  const monthlyData = calculateMonthlySpending(transactions);
  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Spending Trends</h3>
      
      <div className="h-64 flex items-end space-x-2">
        {monthlyData.map((data, index) => {
          const height = (data.amount / maxAmount) * 100;
          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center"
            >
              <div className="w-full bg-blue-100 rounded-t relative" style={{ height: `${height}%` }}>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
                  ${data.amount}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2">{data.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingTrends;