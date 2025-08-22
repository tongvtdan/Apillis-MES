import React, { useState } from 'react';
import { Plus, Filter, Search, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { RFQCard } from '../components/RFQCard';
import { RFQModal } from '../components/RFQModal';

export const RFQs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const rfqs = [
    {
      id: 'RFQ-2024-001',
      title: 'Aerospace Components Manufacturing',
      customer: 'Acme Industries',
      description: 'Custom machined parts for aircraft engine assembly',
      status: 'pending_analysis' as const,
      priority: 'high' as const,
      createdDate: '2024-01-10',
      dueDate: '2024-01-25',
      estimatedValue: 45000,
      attachments: ['drawing_001.pdf', 'specifications.docx'],
      supplierMatches: 5,
      technicalRequirements: [
        'Material: Aluminum 6061-T6',
        'Tolerance: ±0.005"',
        'Surface finish: Ra 32',
        'Quantity: 100 pieces',
      ],
      bomItems: [
        { partNumber: 'AC-001', description: 'Main housing', quantity: 1 },
        { partNumber: 'AC-002', description: 'Mounting bracket', quantity: 2 },
      ],
    },
    {
      id: 'RFQ-2024-002',
      title: 'Steel Fabrication Project',
      customer: 'BuildCorp',
      description: 'Structural steel components for commercial building',
      status: 'supplier_selection' as const,
      priority: 'medium' as const,
      createdDate: '2024-01-08',
      dueDate: '2024-01-22',
      estimatedValue: 78000,
      attachments: ['structural_drawings.pdf'],
      supplierMatches: 3,
      technicalRequirements: [
        'Material: A36 Steel',
        'Welding: AWS D1.1',
        'Coating: Primer + Paint',
        'Delivery: Jobsite',
      ],
      bomItems: [
        { partNumber: 'SF-001', description: 'I-beam 12"', quantity: 20 },
        { partNumber: 'SF-002', description: 'Angle iron 4x4', quantity: 50 },
      ],
    },
    {
      id: 'RFQ-2024-003',
      title: 'Injection Molded Components',
      customer: 'TechCorp',
      description: 'Plastic housings for electronic devices',
      status: 'completed' as const,
      priority: 'low' as const,
      createdDate: '2024-01-05',
      dueDate: '2024-01-20',
      estimatedValue: 22000,
      attachments: ['housing_design.step', 'material_spec.pdf'],
      supplierMatches: 4,
      technicalRequirements: [
        'Material: ABS plastic',
        'Color: Black',
        'Finish: Textured',
        'Quantity: 1000 pieces',
      ],
      bomItems: [
        { partNumber: 'IM-001', description: 'Main housing', quantity: 1 },
        { partNumber: 'IM-002', description: 'End cap', quantity: 2 },
      ],
    },
  ];

  const filteredRFQs = rfqs.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || rfq.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStats = () => {
    const pending = rfqs.filter(rfq => rfq.status === 'pending_analysis').length;
    const inProgress = rfqs.filter(rfq => rfq.status === 'supplier_selection').length;
    const completed = rfqs.filter(rfq => rfq.status === 'completed').length;
    
    return { pending, inProgress, completed };
  };

  const { pending, inProgress, completed } = getStatusStats();

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">RFQs</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage request for quotes and supplier selections
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create RFQ
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
            placeholder="Search RFQs..."
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
            <option value="all">All RFQs</option>
            <option value="pending_analysis">Pending Analysis</option>
            <option value="supplier_selection">Supplier Selection</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* RFQ Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg shadow px-4 py-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total RFQs</dt>
                <dd className="text-lg font-medium text-gray-900">{rfqs.length}</dd>
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
      </div>

      {/* RFQ List */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredRFQs.map((rfq) => (
          <RFQCard key={rfq.id} rfq={rfq} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRFQs.length === 0 && (
        <div className="mt-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No RFQs found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      <RFQModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(rfq) => {
          console.log('Saving RFQ:', rfq);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};