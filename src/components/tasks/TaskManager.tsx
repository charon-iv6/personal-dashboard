import React from 'react';
import { Task } from '../../types';
import TaskList from './TaskList';
import TaskCategories from './TaskCategories';
import TaskProgress from './TaskProgress';

const TaskManager: React.FC = () => {
  const [tasks] = React.useState<Task[]>([
    {
      id: '1',
      title: 'Review monthly budget',
      category: 'Finance',
      priority: 'high',
      dueDate: '2024-03-15',
      completed: false,
    },
    {
      id: '2',
      title: 'Update investment portfolio',
      category: 'Finance',
      priority: 'medium',
      dueDate: '2024-03-20',
      completed: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">Tasks</h2>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
          Add Task
        </button>
      </div>

      <TaskList tasks={tasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskCategories tasks={tasks} />
        <TaskProgress tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskManager;