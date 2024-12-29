import React from 'react';
import { Target } from 'lucide-react';
import { SavingsGoal } from '../../hooks/useSavingsGoals';

interface SavingsGoalCardProps {
  goal: SavingsGoal;
}

const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({ goal }) => {
  const progress = (goal.current_amount / goal.target_amount) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Target className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium text-gray-900">{goal.name}</h3>
        </div>
        <span className="text-sm text-gray-500">{goal.category}</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            ${goal.current_amount.toFixed(2)} of ${goal.target_amount.toFixed(2)}
          </span>
          <span className="font-medium">{progress.toFixed(1)}%</span>
        </div>

        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {goal.target_date && (
          <p className="text-sm text-gray-500">
            Target date: {new Date(goal.target_date).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default SavingsGoalCard;