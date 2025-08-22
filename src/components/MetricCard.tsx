import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'emerald' | 'teal';
  description: string;
}

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  emerald: 'text-emerald-600',
  teal: 'text-teal-600',
};

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  color, 
  description 
}) => {
  return (
    <div className="bg-white rounded-lg shadow px-6 py-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-8 w-8 ${colorClasses[color]}`} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </div>
            </dd>
            <dd className="text-sm text-gray-600 mt-1">{description}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
};