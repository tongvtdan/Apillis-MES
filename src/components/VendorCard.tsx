import React from 'react';
import { MapPin, Star, Building2, Phone, Mail, TrendingUp } from 'lucide-react';

interface Vendor {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  location: string;
  distance: number;
  rating: number;
  capabilities: string[];
  industries: string[];
  certifications: string[];
  recentProjects: number;
  onTimeDelivery: number;
  qualityScore: number;
  totalSpend: number;
  status: 'active' | 'inactive' | 'pending';
}

interface VendorCardProps {
  vendor: Vendor;
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

export const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{vendor.companyName}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[vendor.status]}`}>
                {vendor.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{vendor.contactName}</p>
            
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {vendor.location} ({vendor.distance} mi)
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {vendor.rating}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {vendor.capabilities.slice(0, 3).map((capability, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {capability}
                </span>
              ))}
              {vendor.capabilities.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{vendor.capabilities.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Projects:</span>
                <span className="ml-1 font-medium">{vendor.recentProjects}</span>
              </div>
              <div>
                <span className="text-gray-500">On-Time:</span>
                <span className="ml-1 font-medium">{vendor.onTimeDelivery}%</span>
              </div>
              <div>
                <span className="text-gray-500">Quality:</span>
                <span className="ml-1 font-medium">{vendor.qualityScore}%</span>
              </div>
              <div>
                <span className="text-gray-500">Total Spend:</span>
                <span className="ml-1 font-medium">${vendor.totalSpend.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Mail className="h-4 w-4" />
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Phone className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};