import React from 'react';
import { Settings, Calendar, TrendingUp, Building2, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface ProductionJob {
  id: string;
  poId: string;
  title: string;
  description: string;
  vendor: string;
  status: 'planning' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  startDate: string;
  estimatedCompletion: string;
  actualCompletion: string | null;
  progress: number;
  milestones: Array<{
    id: string;
    name: string;
    status: 'pending' | 'in_progress' | 'completed';
    date: string;
  }>;
  qualityMetrics: {
    defectRate: number;
    reworkRate: number;
    passRate: number;
  };
  items: Array<{
    partNumber: string;
    description: string;
    quantity: number;
    completed: number;
  }>;
}

interface ProductionCardProps {
  job: ProductionJob;
}

const statusColors = {
  planning: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100',
};

const statusIcons = {
  planning: Clock,
  in_progress: AlertTriangle,
  completed: CheckCircle,
};

const milestoneIcons = {
  pending: Clock,
  in_progress: AlertTriangle,
  completed: CheckCircle,
};

export const ProductionCard: React.FC<ProductionCardProps> = ({ job }) => {
  const StatusIcon = statusIcons[job.status];
  const completedMilestones = job.milestones.filter(m => m.status === 'completed').length;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[job.priority]}`}>
                {job.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{job.id}</p>
            <p className="text-sm text-gray-600 mt-1">{job.description}</p>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <StatusIcon className="h-4 w-4 mr-1" />
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[job.status]}`}>
                  {job.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {job.vendor}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {job.estimatedCompletion}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Start Date:</span>
                <span className="ml-1 font-medium">{job.startDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Progress:</span>
                <span className="ml-1 font-medium">{job.progress}%</span>
              </div>
              <div>
                <span className="text-gray-500">Milestones:</span>
                <span className="ml-1 font-medium">{completedMilestones}/{job.milestones.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Pass Rate:</span>
                <span className="ml-1 font-medium">{job.qualityMetrics.passRate}%</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Production Progress</span>
                <span className="font-medium">{job.progress}%</span>
              </div>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Current Milestones</h4>
              <div className="space-y-2">
                {job.milestones.slice(0, 3).map((milestone) => {
                  const MilestoneIcon = milestoneIcons[milestone.status];
                  return (
                    <div key={milestone.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <MilestoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-900">{milestone.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                        milestone.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status.replace('_', ' ')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Production Items</h4>
              <div className="space-y-1">
                {job.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="text-sm text-gray-600 flex justify-between">
                    <span>{item.partNumber} - {item.description}</span>
                    <span>{item.completed}/{item.quantity}</span>
                  </div>
                ))}
                {job.items.length > 2 && (
                  <div className="text-sm text-gray-500">
                    +{job.items.length - 2} more items
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar className="h-4 w-4" />
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};