import React from 'react';
import { ShoppingCart, Calendar, DollarSign, TrendingUp, Building2, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

interface PurchaseOrder {
  id: string;
  rfqId: string;
  vendorName: string;
  vendorId: string;
  title: string;
  description: string;
  status: 'pending' | 'in_production' | 'completed';
  priority: 'high' | 'medium' | 'low';
  orderDate: string;
  deliveryDate: string;
  totalAmount: number;
  currency: string;
  items: Array<{
    id: string;
    partNumber: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  deliveryProgress: number;
  qualityScore: number;
}

interface PurchaseOrderCardProps {
  order: PurchaseOrder;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_production: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  high: 'text-red-600 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-green-600 bg-green-100',
};

const statusIcons = {
  pending: Clock,
  in_production: AlertTriangle,
  completed: CheckCircle,
};

export const PurchaseOrderCard: React.FC<PurchaseOrderCardProps> = ({ order }) => {
  const StatusIcon = statusIcons[order.status];

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{order.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[order.priority]}`}>
                {order.priority}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{order.id}</p>
            <p className="text-sm text-gray-600 mt-1">{order.description}</p>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <StatusIcon className="h-4 w-4 mr-1" />
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[order.status]}`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {order.vendorName}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                ${order.totalAmount.toLocaleString()}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Order Date:</span>
                <span className="ml-1 font-medium">{order.orderDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Delivery Date:</span>
                <span className="ml-1 font-medium">{order.deliveryDate}</span>
              </div>
              <div>
                <span className="text-gray-500">Items:</span>
                <span className="ml-1 font-medium">{order.items.length}</span>
              </div>
              <div>
                <span className="text-gray-500">Progress:</span>
                <span className="ml-1 font-medium">{order.deliveryProgress}%</span>
              </div>
            </div>

            {order.deliveryProgress > 0 && (
              <div className="mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Progress</span>
                  <span className="font-medium">{order.deliveryProgress}%</span>
                </div>
                <div className="mt-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${order.deliveryProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
              <div className="space-y-1">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="text-sm text-gray-600 flex justify-between">
                    <span>{item.partNumber} - {item.description}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="text-sm text-gray-500">
                    +{order.items.length - 2} more items
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