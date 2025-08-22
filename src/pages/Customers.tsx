import React, { useState } from 'react';
import { Plus, Filter, Search, Users, TrendingUp, Star, Building } from 'lucide-react';
import { CustomerCard } from '../components/CustomerCard';
import { CustomerModal } from '../components/CustomerModal';

export const Customers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const customers = [
    {
      id: '1',
      companyName: 'Acme Industries',
      contactName: 'Sarah Johnson',
      email: 'sarah.johnson@acmeindustries.com',
      phone: '+1 (555) 123-4567',
      industry: 'Aerospace',
      location: 'Seattle, WA',
      status: 'active' as const,
      totalRFQs: 12,
      activeRFQs: 3,
      completedRFQs: 9,
      totalSpend: 485000,
      averageOrderValue: 40416,
      relationshipDuration: 24,
      preferredCategories: ['CNC Machining', 'Metal Fabrication', 'Assembly'],
      paymentTerms: 'Net 30',
      creditLimit: 500000,
      lastOrderDate: '2024-01-10',
      satisfactionScore: 4.8,
    },
    {
      id: '2',
      companyName: 'BuildCorp',
      contactName: 'Michael Chen',
      email: 'michael.chen@buildcorp.com',
      phone: '+1 (555) 987-6543',
      industry: 'Construction',
      location: 'Denver, CO',
      status: 'active' as const,
      totalRFQs: 8,
      activeRFQs: 2,
      completedRFQs: 6,
      totalSpend: 320000,
      averageOrderValue: 53333,
      relationshipDuration: 18,
      preferredCategories: ['Steel Fabrication', 'Welding', 'Coating'],
      paymentTerms: 'Net 45',
      creditLimit: 400000,
      lastOrderDate: '2024-01-08',
      satisfactionScore: 4.6,
    },
    {
      id: '3',
      companyName: 'TechCorp',
      contactName: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@techcorp.com',
      phone: '+1 (555) 456-7890',
      industry: 'Electronics',
      location: 'Austin, TX',
      status: 'active' as const,
      totalRFQs: 15,
      activeRFQs: 1,
      completedRFQs: 14,
      totalSpend: 275000,
      averageOrderValue: 19642,
      relationshipDuration: 36,
      preferredCategories: ['Injection Molding', 'Assembly', 'Quality Control'],
      paymentTerms: 'Net 30',
      creditLimit: 350000,
      lastOrderDate: '2024-01-05',
      satisfactionScore: 4.9,
    },
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || customer.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getCustomerStats = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(customer => customer.status === 'active').length;
    const totalSpend = customers.reduce((sum, customer) => sum + customer.totalSpend, 0);
    const avgSatisfaction = customers.reduce((sum, customer) => sum + customer.satisfactionScore, 0) / customers.length;
    
    return { totalCustomers, activeCustomers, totalSpend, avgSatisfaction };
  };

  const { totalCustomers, activeCustomers, totalSpend, avgSatisfaction } = getCustomerStats();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage customer relationships and track order history
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
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
            placeholder="Search customers..."
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
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                <dd className="text-lg font-medium text-gray-900">{totalCustomers}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                <dd className="text-lg font-medium text-gray-900">{activeCustomers}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd className="text-lg font-medium text-gray-900">${totalSpend.toLocaleString()}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">Avg Satisfaction</dt>
                <dd className="text-lg font-medium text-gray-900">{avgSatisfaction.toFixed(1)}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="mt-8 text-center">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(customer) => {
          console.log('Saving customer:', customer);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};