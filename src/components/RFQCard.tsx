import React from 'react';
import { FileText, Calendar, DollarSign, Users, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface RFQ {
  id: string;
  title: string;
  customer: string;
  description: string;
  status: 'pending_analysis' | 'supplier_selection' | 'completed';
  priority: 'high' | 'medium' | 'low';
  createdDate: string;
  dueDate: string;
  estimatedValue: number;
  attachments: string[];
  supplierMatches: number;
  technicalRequirements: string[];
  bomItems: Array<{ partNumber: string; description: string; quantity: number }>;
}

interface RFQCardProps {
  rfq: RFQ;
}

const statusColors = {
  pending_analysis: 'bg-yellow-100 text-yellow-800',
  supplier_selection: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100',
};

const statusIcons = {
  pending_analysis: Clock,
  supplier_selection: AlertTriangle,
  completed: CheckCircle,
};

export const RFQCard: React.FC<RFQCardProps> = ({ rfq }) => {
  const StatusIcon = statusIcons[rfq.status];

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{rfq.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[rfq.priority]}`}>
                {rfq.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{rfq.customer}</p>
            <p className="text-sm text-gray-600 mt-1">{rfq.description}</p>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <StatusIcon className="h-4 w-4 mr-1" />
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[rfq.status]}`}>
                  {rfq.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {rfq.dueDate}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                ${rfq.estimatedValue.toLocaleString()}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Supplier Matches:</span>
                <span className="ml-1 font-medium">{rfq.supplierMatches}</span>
              </div>
              <div>
                <span className="text-gray-500">Attachments:</span>
                <span className="ml-1 font-medium">{rfq.attachments.length}</span>
              </div>
              <div>
                <span className="text-gray-500">BOM Items:</span>
                <span className="ml-1 font-medium">{rfq.bomItems.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <span className="ml-1 font-medium">{rfq.createdDate}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Technical Requirements</h4>
              <div className="space-y-1">
                {rfq.technicalRequirements.slice(0, 3).map((req, index) => (
                  <div key={index} className="text-sm text-gray-600">• {req}</div>
                ))}
                {rfq.technicalRequirements.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{rfq.technicalRequirements.length - 3} more requirements
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
            <Users className="h-4 w-4" />
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <FileText className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};