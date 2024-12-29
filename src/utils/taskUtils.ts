import { Task } from '../types';

export const getPriorityColor = (priority: Task['priority']): string => {
  switch (priority) {
    case 'high':
      return 'text-red-500';
    case 'medium':
      return 'text-yellow-500';
    case 'low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};

export const groupTasksByCategory = (tasks: Task[]): Record<string, number> => {
  return tasks.reduce((acc, task) => {
    acc[task.category] = (acc[task.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getTaskProgress = (tasks: Task[]): { completed: number; total: number } => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  return { completed, total };
};