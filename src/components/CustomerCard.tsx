import React from 'react';
import { Building, User, MapPin, Star, TrendingUp, Calendar, DollarSign } from 'lucide-react';

interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  location: string;
  status: 'active' | 'inactive';
  totalRFQs: number;
  activeRFQs: number;
  completedRFQs: number;
  totalSpend: number;
  averageOrderValue: number;
  relationshipDuration: number;
  preferredCategories: string[];
  paymentTerms: string;
  creditLimit: number;
  lastOrderDate: string;
  satisfactionScore: number;
}

interface CustomerCardProps {
  customer: Customer;
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
};

export const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <Building className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{customer.companyName}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[customer.status]}`}>
                {customer.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{customer.contactName}</p>
            <p className="text-sm text-gray-500 mt-1">{customer.industry}</p>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {customer.location}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {customer.satisfactionScore.toFixed(1)}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {customer.relationshipDuration}mo
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Total RFQs:</span>
                <span className="ml-1 font-medium">{customer.totalRFQs}</span>
              </div>
              <div>
                <span className="text-gray-500">Active RFQs:</span>
                <span className="ml-1 font-medium">{customer.activeRFQs}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Spend:</span>
                <span className="ml-1 font-medium">${customer.totalSpend.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Avg Order:</span>
                <span className="ml-1 font-medium">${customer.averageOrderValue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Payment Terms:</span>
                <span className="ml-1 font-medium">{customer.paymentTerms}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Order:</span>
                <span className="ml-1 font-medium">{customer.lastOrderDate}</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Preferred Categories</h4>
              <div className="flex flex-wrap gap-1">
                {customer.preferredCategories.slice(0, 3).map((category, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {category}
                  </span>
                ))}
                {customer.preferredCategories.length > 3 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{customer.preferredCategories.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Credit Utilization</span>
                <span className="font-medium">${customer.totalSpend.toLocaleString()} / ${customer.creditLimit.toLocaleString()}</span>
              </div>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((customer.totalSpend / customer.creditLimit) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <User className="h-4 w-4" />
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};