import React from 'react';
import { Task } from '../../types';
import { getTaskProgress } from '../../utils/taskUtils';

interface TaskProgressProps {
  tasks: Task[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ tasks }) => {
  const { completed, total } = getTaskProgress(tasks);
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Task Progress</h3>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Today</span>
            <span className="text-gray-500">{completed}/{total} completed</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;