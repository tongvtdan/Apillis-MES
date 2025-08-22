import React, { useState } from 'react';
import { Plus, Filter, Search, ShoppingCart, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { PurchaseOrderCard } from '../components/PurchaseOrderCard';
import { PurchaseOrderModal } from '../components/PurchaseOrderModal';

export const PurchaseOrders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const purchaseOrders = [
    {
      id: 'PO-2024-001',
      rfqId: 'RFQ-2024-001',
      vendorName: 'Precision Manufacturing Co.',
      vendorId: '1',
      title: 'Aerospace Components',
      description: 'Custom machined parts for aircraft engine assembly',
      status: 'pending' as const,
      priority: 'high' as const,
      orderDate: '2024-01-12',
      deliveryDate: '2024-02-15',
      totalAmount: 45000,
      currency: 'USD',
      items: [
        {
          id: '1',
          partNumber: 'AC-001',
          description: 'Main housing',
          quantity: 100,
          unitPrice: 350,
          totalPrice: 35000,
        },
        {
          id: '2',
          partNumber: 'AC-002',
          description: 'Mounting bracket',
          quantity: 200,
          unitPrice: 50,
          totalPrice: 10000,
        },
      ],
      deliveryProgress: 0,
      qualityScore: 0,
    },
    {
      id: 'PO-2024-002',
      rfqId: 'RFQ-2024-002',
      vendorName: 'Steel Solutions LLC',
      vendorId: '3',
      title: 'Steel Fabrication',
      description: 'Structural steel components for commercial building',
      status: 'in_production' as const,
      priority: 'medium' as const,
      orderDate: '2024-01-10',
      deliveryDate: '2024-02-20',
      totalAmount: 78000,
      currency: 'USD',
      items: [
        {
          id: '1',
          partNumber: 'SF-001',
          description: 'I-beam 12"',
          quantity: 20,
          unitPrice: 2500,
          totalPrice: 50000,
        },
        {
          id: '2',
          partNumber: 'SF-002',
          description: 'Angle iron 4x4',
          quantity: 50,
          unitPrice: 560,
          totalPrice: 28000,
        },
      ],
      deliveryProgress: 65,
      qualityScore: 94,
    },
    {
      id: 'PO-2024-003',
      rfqId: 'RFQ-2024-003',
      vendorName: 'Advanced Components Inc.',
      vendorId: '2',
      title: 'Injection Molded Components',
      description: 'Plastic housings for electronic devices',
      status: 'completed' as const,
      priority: 'low' as const,
      orderDate: '2024-01-05',
      deliveryDate: '2024-01-25',
      totalAmount: 22000,
      currency: 'USD',
      items: [
        {
          id: '1',
          partNumber: 'IM-001',
          description: 'Main housing',
          quantity: 1000,
          unitPrice: 15,
          totalPrice: 15000,
        },
        {
          id: '2',
          partNumber: 'IM-002',
          description: 'End cap',
          quantity: 2000,
          unitPrice: 3.5,
          totalPrice: 7000,
        },
      ],
      deliveryProgress: 100,
      qualityScore: 98,
    },
  ];

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStats = () => {
    const pending = purchaseOrders.filter(po => po.status === 'pending').length;
    const inProduction = purchaseOrders.filter(po => po.status === 'in_production').length;
    const completed = purchaseOrders.filter(po => po.status === 'completed').length;
    const totalValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
    
    return { pending, inProduction, completed, totalValue };
  };

  const { pending, inProduction, completed, totalValue } = getStatusStats();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Purchase Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track and manage purchase orders throughout their lifecycle
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create PO
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
            placeholder="Search purchase orders..."
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
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="in_production">In Production</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* PO Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd className="text-lg font-medium text-gray-900">{purchaseOrders.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd className="text-lg font-medium text-gray-900">{pending}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">In Production</dt>
                <dd className="text-lg font-medium text-gray-900">{inProduction}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd className="text-lg font-medium text-gray-900">${totalValue.toLocaleString()}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Orders List */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredOrders.map((order) => (
          <PurchaseOrderCard key={order.id} order={order} />
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="mt-8 text-center">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No purchase orders found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <PurchaseOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(order) => {
          console.log('Saving purchase order:', order);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};