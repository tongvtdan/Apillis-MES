import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  ShoppingCart, 
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  DollarSign,
  Activity
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { Chart } from '../components/Chart';
import { RecentActivity } from '../components/RecentActivity';
import { TaskList } from '../components/TaskList';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active RFQs',
      value: '24',
      change: '+12%',
      trend: 'up' as const,
      icon: FileText,
      color: 'blue',
    },
    {
      title: 'Pending Orders',
      value: '87',
      change: '+5%',
      trend: 'up' as const,
      icon: ShoppingCart,
      color: 'green',
    },
    {
      title: 'Active Vendors',
      value: '156',
      change: '+8%',
      trend: 'up' as const,
      icon: Building2,
      color: 'purple',
    },
    {
      title: 'Inventory Items',
      value: '2,847',
      change: '-2%',
      trend: 'down' as const,
      icon: Package,
      color: 'orange',
    },
    {
      title: 'Monthly Spend',
      value: '$284K',
      change: '+15%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'emerald',
    },
    {
      title: 'Cost Savings',
      value: '$42K',
      change: '+23%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'teal',
    },
  ];

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 590 },
    { name: 'Jun', value: 320 },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'rfq_created',
      title: 'New RFQ created for Aerospace Components',
      description: 'RFQ-2024-001 submitted by Acme Industries',
      timestamp: '2 hours ago',
      icon: FileText,
      color: 'blue',
    },
    {
      id: '2',
      type: 'po_approved',
      title: 'Purchase Order approved',
      description: 'PO-2024-045 for $12,500 approved by manager',
      timestamp: '4 hours ago',
      icon: CheckCircle,
      color: 'green',
    },
    {
      id: '3',
      type: 'vendor_registered',
      title: 'New vendor registered',
      description: 'Precision Manufacturing Co. added to system',
      timestamp: '6 hours ago',
      icon: Building2,
      color: 'purple',
    },
    {
      id: '4',
      type: 'inventory_alert',
      title: 'Low inventory alert',
      description: 'Steel bolts (M8x25) below reorder point',
      timestamp: '8 hours ago',
      icon: AlertTriangle,
      color: 'orange',
    },
  ];

  const tasks = [
    {
      id: '1',
      title: 'Review RFQ responses for Project Alpha',
      description: 'Analyze 5 vendor responses received',
      priority: 'high' as const,
      dueDate: '2024-01-15',
      assignee: 'John Doe',
      status: 'pending' as const,
    },
    {
      id: '2',
      title: 'Approve purchase order for bearings',
      description: 'PO-2024-046 waiting for approval',
      priority: 'medium' as const,
      dueDate: '2024-01-16',
      assignee: 'Jane Smith',
      status: 'pending' as const,
    },
    {
      id: '3',
      title: 'Update vendor performance metrics',
      description: 'Quarterly review of supplier scorecards',
      priority: 'low' as const,
      dueDate: '2024-01-20',
      assignee: 'Mike Johnson',
      status: 'in_progress' as const,
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your procurement management system
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Monthly Procurement Volume
            </h3>
            <Chart data={chartData} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Recent Activity
            </h3>
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Pending Tasks
            </h3>
            <TaskList tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};