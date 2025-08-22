import React, { useState } from 'react';
import { Plus, Filter, Search, Settings, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { ProductionCard } from '../components/ProductionCard';
import { ProductionModal } from '../components/ProductionModal';

export const Production: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const productionJobs = [
    {
      id: 'PROD-2024-001',
      poId: 'PO-2024-001',
      title: 'Aerospace Components Manufacturing',
      description: 'Custom machined parts for aircraft engine assembly',
      vendor: 'Precision Manufacturing Co.',
      status: 'planning' as const,
      priority: 'high' as const,
      startDate: '2024-01-15',
      estimatedCompletion: '2024-02-10',
      actualCompletion: null,
      progress: 15,
      milestones: [
        { id: '1', name: 'Material Procurement', status: 'completed', date: '2024-01-12' },
        { id: '2', name: 'Setup & Tooling', status: 'in_progress', date: '2024-01-15' },
        { id: '3', name: 'Machining', status: 'pending', date: '2024-01-20' },
        { id: '4', name: 'Quality Control', status: 'pending', date: '2024-02-05' },
        { id: '5', name: 'Final Assembly', status: 'pending', date: '2024-02-08' },
      ],
      qualityMetrics: {
        defectRate: 0,
        reworkRate: 0,
        passRate: 0,
      },
      items: [
        { partNumber: 'AC-001', description: 'Main housing', quantity: 100, completed: 10 },
        { partNumber: 'AC-002', description: 'Mounting bracket', quantity: 200, completed: 25 },
      ],
    },
    {
      id: 'PROD-2024-002',
      poId: 'PO-2024-002',
      title: 'Steel Fabrication Project',
      description: 'Structural steel components for commercial building',
      vendor: 'Steel Solutions LLC',
      status: 'in_progress' as const,
      priority: 'medium' as const,
      startDate: '2024-01-10',
      estimatedCompletion: '2024-02-18',
      actualCompletion: null,
      progress: 65,
      milestones: [
        { id: '1', name: 'Material Procurement', status: 'completed', date: '2024-01-08' },
        { id: '2', name: 'Cutting & Shaping', status: 'completed', date: '2024-01-12' },
        { id: '3', name: 'Welding', status: 'in_progress', date: '2024-01-15' },
        { id: '4', name: 'Surface Treatment', status: 'pending', date: '2024-02-10' },
        { id: '5', name: 'Final Inspection', status: 'pending', date: '2024-02-15' },
      ],
      qualityMetrics: {
        defectRate: 2.1,
        reworkRate: 1.5,
        passRate: 97.9,
      },
      items: [
        { partNumber: 'SF-001', description: 'I-beam 12"', quantity: 20, completed: 14 },
        { partNumber: 'SF-002', description: 'Angle iron 4x4', quantity: 50, completed: 30 },
      ],
    },
    {
      id: 'PROD-2024-003',
      poId: 'PO-2024-003',
      title: 'Injection Molded Components',
      description: 'Plastic housings for electronic devices',
      vendor: 'Advanced Components Inc.',
      status: 'completed' as const,
      priority: 'low' as const,
      startDate: '2024-01-05',
      estimatedCompletion: '2024-01-22',
      actualCompletion: '2024-01-20',
      progress: 100,
      milestones: [
        { id: '1', name: 'Tooling Setup', status: 'completed', date: '2024-01-05' },
        { id: '2', name: 'Trial Production', status: 'completed', date: '2024-01-08' },
        { id: '3', name: 'Full Production', status: 'completed', date: '2024-01-10' },
        { id: '4', name: 'Quality Testing', status: 'completed', date: '2024-01-18' },
        { id: '5', name: 'Packaging', status: 'completed', date: '2024-01-20' },
      ],
      qualityMetrics: {
        defectRate: 0.8,
        reworkRate: 0.3,
        passRate: 99.2,
      },
      items: [
        { partNumber: 'IM-001', description: 'Main housing', quantity: 1000, completed: 1000 },
        { partNumber: 'IM-002', description: 'End cap', quantity: 2000, completed: 2000 },
      ],
    },
  ];

  const filteredJobs = productionJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || job.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getProductionStats = () => {
    const planning = productionJobs.filter(job => job.status === 'planning').length;
    const inProgress = productionJobs.filter(job => job.status === 'in_progress').length;
    const completed = productionJobs.filter(job => job.status === 'completed').length;
    const onTime = productionJobs.filter(job => 
      job.actualCompletion && job.actualCompletion <= job.estimatedCompletion
    ).length;
    const totalJobs = productionJobs.length;
    const onTimePercentage = totalJobs > 0 ? Math.round((onTime / totalJobs) * 100) : 0;
    
    return { planning, inProgress, completed, onTimePercentage };
  };

  const { planning, inProgress, completed, onTimePercentage } = getProductionStats();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Production</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track production progress and monitor manufacturing milestones
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Job
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
            placeholder="Search production jobs..."
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
            <option value="all">All Jobs</option>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Production Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Settings className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                <dd className="text-lg font-medium text-gray-900">{productionJobs.length}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                <dd className="text-lg font-medium text-gray-900">{inProgress}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Completed</dt>
                <dd className="text-lg font-medium text-gray-900">{completed}</dd>
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
                <dt className="text-sm font-medium text-gray-500 truncate">On-Time Rate</dt>
                <dd className="text-lg font-medium text-gray-900">{onTimePercentage}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Production Jobs List */}
      <div className="mt-8 grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <ProductionCard key={job.id} job={job} />
        ))}
      </div>

      {/* Empty State */}
      {filteredJobs.length === 0 && (
        <div className="mt-8 text-center">
          <Settings className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No production jobs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <ProductionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(job) => {
          console.log('Saving production job:', job);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};