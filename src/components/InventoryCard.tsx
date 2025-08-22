import React from 'react';
import { Package, MapPin, AlertTriangle, TrendingUp, TrendingDown, Building2 } from 'lucide-react';

interface InventoryItem {
  id: string;
  partNumber: string;
  description: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  unitCost: number;
  totalValue: number;
  location: string;
  supplier: string;
  lastRestocked: string;
  stockStatus: 'critical' | 'low' | 'adequate' | 'high';
}

interface InventoryCardProps {
  item: InventoryItem;
}

const statusColors = {
  critical: 'bg-red-100 text-red-800',
  low: 'bg-orange-100 text-orange-800',
  adequate: 'bg-green-100 text-green-800',
  high: 'bg-blue-100 text-blue-800',
};

const statusIcons = {
  critical: AlertTriangle,
  low: TrendingDown,
  adequate: TrendingUp,
  high: Package,
};

export const InventoryCard: React.FC<InventoryCardProps> = ({ item }) => {
  const StatusIcon = statusIcons[item.stockStatus];
  const stockPercentage = (item.currentStock / (item.reorderPoint * 2)) * 100;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">{item.partNumber}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[item.stockStatus]}`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {item.stockStatus}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
            
            <div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {item.location}
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-1" />
                {item.supplier}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Current Stock:</span>
                <span className="ml-1 font-medium">{item.currentStock}</span>
              </div>
              <div>
                <span className="text-gray-500">Available:</span>
                <span className="ml-1 font-medium">{item.availableStock}</span>
              </div>
              <div>
                <span className="text-gray-500">Reserved:</span>
                <span className="ml-1 font-medium">{item.reservedStock}</span>
              </div>
              <div>
                <span className="text-gray-500">Unit Cost:</span>
                <span className="ml-1 font-medium">${item.unitCost.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">Total Value:</span>
                <span className="ml-1 font-medium">${item.totalValue.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-500">Last Restocked:</span>
                <span className="ml-1 font-medium">{item.lastRestocked}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stock Level</span>
                <span className="font-medium">{item.currentStock} / {item.reorderPoint * 2}</span>
              </div>
              <div className="mt-1 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item.stockStatus === 'critical' ? 'bg-red-600' :
                    item.stockStatus === 'low' ? 'bg-orange-600' :
                    item.stockStatus === 'adequate' ? 'bg-green-600' :
                    'bg-blue-600'
                  }`}
                  style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                />
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Reorder point: {item.reorderPoint} | Reorder quantity: {item.reorderQuantity}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
            Adjust Stock
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Package className="h-4 w-4" />
          </button>
          {item.stockStatus === 'critical' || item.stockStatus === 'low' ? (
            <button className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors">
              Reorder
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};