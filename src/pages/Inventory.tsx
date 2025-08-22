import React, { useState } from 'react';
import { Plus, Filter, Search, Package, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { InventoryCard } from '../components/InventoryCard';
import { InventoryModal } from '../components/InventoryModal';

export const Inventory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const inventoryItems = [
    {
      id: '1',
      partNumber: 'ST-001',
      description: 'Steel bolts M8x25',
      category: 'Fasteners',
      currentStock: 250,
      reservedStock: 50,
      availableStock: 200,
      reorderPoint: 100,
      reorderQuantity: 500,
      unitCost: 0.25,
      totalValue: 62.5,
      location: 'A1-B3',
      supplier: 'Precision Manufacturing Co.',
      lastRestocked: '2024-01-10',
      stockStatus: 'low' as const,
    },
    {
      id: '2',
      partNumber: 'AL-002',
      description: 'Aluminum sheet 4x8x0.125',
      category: 'Raw Materials',
      currentStock: 45,
      reservedStock: 20,
      availableStock: 25,
      reorderPoint: 20,
      reorderQuantity: 50,
      unitCost: 85.00,
      totalValue: 3825.00,
      location: 'B2-C4',
      supplier: 'Advanced Components Inc.',
      lastRestocked: '2024-01-08',
      stockStatus: 'adequate' as const,
    },
    {
      id: '3',
      partNumber: 'PL-003',
      description: 'ABS plastic pellets - Black',
      category: 'Raw Materials',
      currentStock: 800,
      reservedStock: 200,
      availableStock: 600,
      reorderPoint: 300,
      reorderQuantity: 1000,
      unitCost: 2.50,
      totalValue: 2000.00,
      location: 'C1-D2',
      supplier: 'Advanced Components Inc.',
      lastRestocked: '2024-01-15',
      stockStatus: 'high' as const,
    },
    {
      id: '4',
      partNumber: 'BR-004',
      description: 'Ball bearings 608ZZ',
      category: 'Components',
      currentStock: 15,
      reservedStock: 10,
      availableStock: 5,
      reorderPoint: 25,
      reorderQuantity: 100,
      unitCost: 3.75,
      totalValue: 56.25,
      location: 'D3-E1',
      supplier: 'Steel Solutions LLC',
      lastRestocked: '2024-01-05',
      stockStatus: 'critical' as const,
    },
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.stockStatus === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStockStats = () => {
    const critical = inventoryItems.filter(item => item.stockStatus === 'critical').length;
    const low = inventoryItems.filter(item => item.stockStatus === 'low').length;
    const adequate = inventoryItems.filter(item => item.stockStatus === 'adequate').length;
    const high = inventoryItems.filter(item => item.stockStatus === 'high').length;
    const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
    
    return { critical, low, adequate, high, totalValue };
  };

  const { critical, low, adequate, high, totalValue } = getStockStats();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor stock levels and manage inventory across all locations
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
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
            placeholder="Search inventory..."
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
            <option value="all">All Items</option>
            <option value="critical">Critical</option>
            <option value="low">Low Stock</option>
            <option value="adequate">Adequate</option>
            <option value="high">High Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Items</dt>
                <dd className="text-lg font-medium text-gray-900">{inventoryItems.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Critical</dt>
                <dd className="text-lg font-medium text-gray-900">{critical}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingDown className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Low Stock</dt>
                <dd className="text-lg font-medium text-gray-900">{low}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">Adequate</dt>
                <dd className="text-lg font-medium text-gray-900">{adequate}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-8 w-8 text-purple-600" />
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

      {/* Inventory Items List */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredItems.map((item) => (
          <InventoryCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="mt-8 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No inventory items found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(item) => {
          console.log('Saving inventory item:', item);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};