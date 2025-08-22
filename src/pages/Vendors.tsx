import React, { useState } from 'react';
import { Plus, Filter, Search, MapPin, Star, TrendingUp, Building2, Phone, Mail } from 'lucide-react';
import { VendorCard } from '../components/VendorCard';
import { VendorModal } from '../components/VendorModal';

export const Vendors: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const vendors = [
    {
      id: '1',
      companyName: 'Precision Manufacturing Co.',
      contactName: 'John Smith',
      email: 'john@precisionmfg.com',
      phone: '+1 (555) 123-4567',
      location: 'Detroit, MI',
      distance: 15,
      rating: 4.8,
      capabilities: ['CNC Machining', 'Metal Fabrication', 'Assembly'],
      industries: ['Automotive', 'Aerospace', 'Industrial'],
      certifications: ['ISO 9001', 'AS9100'],
      recentProjects: 12,
      onTimeDelivery: 96,
      qualityScore: 98,
      totalSpend: 245000,
      status: 'active' as const,
    },
    {
      id: '2',
      companyName: 'Advanced Components Inc.',
      contactName: 'Sarah Johnson',
      email: 'sarah@advancedcomp.com',
      phone: '+1 (555) 987-6543',
      location: 'Chicago, IL',
      distance: 45,
      rating: 4.6,
      capabilities: ['Injection Molding', 'Tooling', 'Quality Control'],
      industries: ['Electronics', 'Medical', 'Consumer'],
      certifications: ['ISO 13485', 'FDA Registered'],
      recentProjects: 8,
      onTimeDelivery: 92,
      qualityScore: 95,
      totalSpend: 180000,
      status: 'active' as const,
    },
    {
      id: '3',
      companyName: 'Steel Solutions LLC',
      contactName: 'Mike Wilson',
      email: 'mike@steelsolutions.com',
      phone: '+1 (555) 456-7890',
      location: 'Pittsburgh, PA',
      distance: 120,
      rating: 4.4,
      capabilities: ['Steel Fabrication', 'Welding', 'Coating'],
      industries: ['Construction', 'Infrastructure', 'Energy'],
      certifications: ['AWS D1.1', 'AISC Certified'],
      recentProjects: 15,
      onTimeDelivery: 88,
      qualityScore: 92,
      totalSpend: 320000,
      status: 'active' as const,
    },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.capabilities.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || vendor.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your supplier network and vendor relationships
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vendor
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="all">All Vendors</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Vendor Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Vendors</dt>
                <dd className="text-lg font-medium text-gray-900">{vendors.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Avg Rating</dt>
                <dd className="text-lg font-medium text-gray-900">4.6</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">On-Time Delivery</dt>
                <dd className="text-lg font-medium text-gray-900">92%</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Avg Distance</dt>
                <dd className="text-lg font-medium text-gray-900">60 mi</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVendors.length === 0 && (
        <div className="mt-8 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No vendors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <VendorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(vendor) => {
          console.log('Saving vendor:', vendor);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};