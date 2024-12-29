import React from 'react';
import { CheckCircle2, Circle, Clock, Tag } from 'lucide-react';
import { Task } from '../../types';
import { getPriorityColor } from '../../utils/taskUtils';

interface TaskItemProps {
  task: Task;
  onToggle?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        <button className="mt-1" onClick={() => onToggle?.(task.id)}>
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${
              task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h4>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`flex items-center space-x-1 ${getPriorityColor(task.priority)}`}>
                <Clock className="w-4 h-4" />
                <span>{task.priority}</span>
              </span>
              <span className="flex items-center space-x-1 text-gray-500">
                <Tag className="w-4 h-4" />
                <span>{task.category}</span>
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-1">Due {task.dueDate}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;