import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Transaction } from '../../types';
import { calculateMonthlyTrends } from '../../utils/analyticsUtils';

interface FinancialInsightsProps {
  transactions: Transaction[];
}

const FinancialInsights: React.FC<FinancialInsightsProps> = ({ transactions }) => {
  const trends = calculateMonthlyTrends(transactions);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Financial Insights</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trends.topExpenses.length > 0 && (
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-2 text-orange-700 mb-2">
              <TrendingUp className="w-5 h-5" />
              <h4 className="font-medium">Top Expenses</h4>
            </div>
            <ul className="space-y-2">
              {trends.topExpenses.map((expense, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span>{expense.category}</span>
                  <span className="font-medium">${expense.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {trends.savingsOpportunities.length > 0 && (
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 mb-2">
              <AlertCircle className="w-5 h-5" />
              <h4 className="font-medium">Savings Opportunities</h4>
            </div>
            <ul className="space-y-2">
              {trends.savingsOpportunities.map((opportunity, index) => (
                <li key={index} className="text-sm">{opportunity}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialInsights;