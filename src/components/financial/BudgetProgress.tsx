import React from 'react';
import { Budget } from '../../hooks/useBudgets';

interface BudgetProgressProps {
  budget: Budget;
}

const BudgetProgress: React.FC<BudgetProgressProps> = ({ budget }) => {
  const percentage = (budget.spent / budget.amount) * 100;
  const isOverBudget = percentage > 100;

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-900">{budget.category}</h3>
        <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
          ${budget.spent.toFixed(2)} / ${budget.amount.toFixed(2)}
        </span>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-300`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="mt-1 text-xs text-gray-500">
        {isOverBudget ? (
          <span className="text-red-600">
            ${(budget.spent - budget.amount).toFixed(2)} over budget
          </span>
        ) : (
          <span>
            ${(budget.amount - budget.spent).toFixed(2)} remaining
          </span>
        )}
      </div>
    </div>
  );
};

export default BudgetProgress;