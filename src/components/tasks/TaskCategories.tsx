import React from 'react';
import { Task } from '../../types';
import { groupTasksByCategory } from '../../utils/taskUtils';

interface TaskCategoriesProps {
  tasks: Task[];
}

const TaskCategories: React.FC<TaskCategoriesProps> = ({ tasks }) => {
  const categories = groupTasksByCategory(tasks);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Task Categories</h3>
      <div className="space-y-3">
        {Object.entries(categories).map(([category, count]) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-gray-600">{category}</span>
            <span className="text-sm text-gray-500">{count} tasks</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCategories;