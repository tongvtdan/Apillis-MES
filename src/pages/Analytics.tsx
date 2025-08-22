import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Clock, Users, Package, AlertTriangle } from 'lucide-react';
import { Chart } from '../components/Chart';
import { MetricCard } from '../components/MetricCard';

export const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const kpiData = [
    {
      title: 'Total Procurement Value',
      value: '$1.2M',
      change: '+15.3%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'green',
      description: 'Year-to-date procurement spending',
    },
    {
      title: 'Average Processing Time',
      value: '4.2 days',
      change: '-12.5%',
      trend: 'down' as const,
      icon: Clock,
      color: 'blue',
      description: 'From RFQ to PO approval',
    },
    {
      title: 'Supplier Performance',
      value: '94.2%',
      change: '+3.1%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'purple',
      description: 'On-time delivery rate',
    },
    {
      title: 'Cost Savings',
      value: '$185K',
      change: '+28.7%',
      trend: 'up' as const,
      icon: BarChart3,
      color: 'emerald',
      description: 'Through competitive bidding',
    },
    {
      title: 'Active Suppliers',
      value: '156',
      change: '+8.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'orange',
      description: 'Qualified and certified',
    },
    {
      title: 'Inventory Turnover',
      value: '6.8x',
      change: '+12.1%',
      trend: 'up' as const,
      icon: Package,
      color: 'teal',
      description: 'Annual inventory cycles',
    },
  ];

  const procurementVolumeData = [
    { name: 'Jan', value: 85000, savings: 12000 },
    { name: 'Feb', value: 92000, savings: 14500 },
    { name: 'Mar', value: 78000, savings: 11200 },
    { name: 'Apr', value: 105000, savings: 18200 },
    { name: 'May', value: 98000, savings: 15800 },
    { name: 'Jun', value: 112000, savings: 21500 },
    { name: 'Jul', value: 89000, savings: 13400 },
    { name: 'Aug', value: 125000, savings: 24800 },
    { name: 'Sep', value: 108000, savings: 19200 },
    { name: 'Oct', value: 135000, savings: 28500 },
    { name: 'Nov', value: 142000, savings: 31200 },
    { name: 'Dec', value: 158000, savings: 35800 },
  ];

  const supplierPerformanceData = [
    { name: 'Q1 2023', onTime: 89, quality: 92, cost: 88 },
    { name: 'Q2 2023', onTime: 91, quality: 94, cost: 90 },
    { name: 'Q3 2023', onTime: 87, quality: 89, cost: 86 },
    { name: 'Q4 2023', onTime: 93, quality: 96, cost: 92 },
    { name: 'Q1 2024', onTime: 95, quality: 97, cost: 94 },
  ];

  const categorySpendData = [
    { name: 'CNC Machining', value: 285000, percentage: 32.5 },
    { name: 'Steel Fabrication', value: 235000, percentage: 26.8 },
    { name: 'Injection Molding', value: 158000, percentage: 18.0 },
    { name: 'Assembly', value: 125000, percentage: 14.2 },
    { name: 'Quality Control', value: 74000, percentage: 8.5 },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="mt-2 text-sm text-gray-700">
            Comprehensive insights into procurement performance and trends
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Procurement Volume Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Procurement Volume & Savings
            </h3>
            <div className="h-80">
              <Chart 
                data={procurementVolumeData} 
                type="bar"
                dataKey="value"
                color="#2563eb"
              />
            </div>
          </div>
        </div>

        {/* Supplier Performance Chart */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Supplier Performance Trends
            </h3>
            <div className="h-80">
              <Chart 
                data={supplierPerformanceData} 
                type="line"
                dataKey="onTime"
                color="#059669"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Spend Analysis */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Spending by Category
          </h3>
          <div className="space-y-4">
            {categorySpendData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-4 text-sm font-medium text-gray-900">
                  ${category.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics Table */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Top Performing Suppliers
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    On-Time Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quality Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Orders
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Precision Manufacturing Co.', onTime: 98, quality: 97, cost: 94, orders: 24 },
                  { name: 'Advanced Components Inc.', onTime: 95, quality: 96, cost: 92, orders: 18 },
                  { name: 'Steel Solutions LLC', onTime: 92, quality: 94, cost: 89, orders: 15 },
                  { name: 'Quality Fasteners Ltd.', onTime: 94, quality: 95, cost: 91, orders: 12 },
                  { name: 'Innovative Plastics Co.', onTime: 89, quality: 92, cost: 88, orders: 9 },
                ].map((supplier, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {supplier.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{supplier.onTime}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${supplier.onTime}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{supplier.quality}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${supplier.quality}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="mr-2">{supplier.cost}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${supplier.cost}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {supplier.orders}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};