import React from 'react';
import { Calendar, User, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface TaskListProps {
  tasks: Task[];
}

const priorityColors = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100',
};

const statusIcons = {
  pending: Clock,
  in_progress: AlertTriangle,
  completed: CheckCircle,
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const StatusIcon = statusIcons[task.status];
        return (
          <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-4 w-4 text-gray-500" />
                  <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {task.dueDate}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {task.assignee}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};