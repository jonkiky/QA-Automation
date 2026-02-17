'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  ArrowLeft,
  FileText,
  TestTube,
  FolderTree,
  Code,
  Play,
  GitBranch,
  Settings as SettingsIcon,
  BarChart3,
  Search,
  Plus,
  Eye,
  RefreshCw,
  Archive,
  AlertCircle,
} from 'lucide-react';

// Mock project data
const mockProject = {
  id: 'PROJ-001',
  name: 'E-Commerce Platform',
  owner: 'John Doe',
  status: 'active' as const,
  description: 'Comprehensive test automation for the e-commerce platform',
  createdDate: '2024-01-15',
  lastModified: '2024-02-10',
};

const mockRequirements = [
  {
    id: 'REQ-001',
    title: 'User Authentication Flow',
    release: 'v2.5.0',
    status: 'Approved',
    linkedTestCases: 8,
    coverageStatus: 'Complete',
    version: 'v1.2',
    lastModified: '2024-02-10',
    owner: 'Alice Smith',
  },
  {
    id: 'REQ-002',
    title: 'Shopping Cart Functionality',
    release: 'v2.5.0',
    status: 'Test Cases Generated',
    linkedTestCases: 12,
    coverageStatus: 'Complete',
    version: 'v1.0',
    lastModified: '2024-02-08',
    owner: 'Bob Johnson',
  },
  {
    id: 'REQ-003',
    title: 'Payment Processing',
    release: 'v2.6.0',
    status: 'Scenarios Generated',
    linkedTestCases: 5,
    coverageStatus: 'Partial',
    version: 'v1.1',
    lastModified: '2024-02-05',
    owner: 'Charlie Davis',
  },
  {
    id: 'REQ-004',
    title: 'Order History and Tracking',
    release: 'v2.6.0',
    status: 'Ready for Scenario Generation',
    linkedTestCases: 0,
    coverageStatus: 'Not Generated',
    version: 'v1.0',
    lastModified: '2024-02-03',
    owner: 'Diana Wilson',
  },
  {
    id: 'REQ-005',
    title: 'Product Search and Filters',
    release: 'v2.5.0',
    status: 'Clarification Required',
    linkedTestCases: 0,
    coverageStatus: 'Not Generated',
    version: 'v1.0',
    lastModified: '2024-01-28',
    owner: 'Eve Martinez',
  },
];

type TabType = 'requirements' | 'test-cases' | 'executions' | 'settings';

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('requirements');
  const [searchQuery, setSearchQuery] = useState('');
  const [releaseFilter, setReleaseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: 'active' | 'archived') => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400">
        Archived
      </span>
    );
  };

  const tabs = [
    { id: 'requirements' as TabType, label: 'Requirements', icon: FileText },
    { id: 'test-cases' as TabType, label: 'Test Cases', icon: TestTube },
    { id: 'executions' as TabType, label: 'Executions', icon: Play },
    { id: 'settings' as TabType, label: 'Settings', icon: SettingsIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requirements':
        const filteredRequirements = mockRequirements.filter(req => {
          const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               req.id.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesRelease = releaseFilter === 'all' || req.release === releaseFilter;
          const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
          return matchesSearch && matchesRelease && matchesStatus;
        });

        const getStatusBadge = (status: string) => {
          const badges: Record<string, { bg: string; text: string; icon?: boolean }> = {
            'Draft': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-800 dark:text-gray-300' },
            'Clarification Required': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400', icon: true },
            'Ready for Scenario Generation': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400' },
            'Scenarios Generated': { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-800 dark:text-indigo-400' },
            'Test Cases Generated': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-400' },
            'Approved': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400' },
            'Archived': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400' },
          };
          const badge = badges[status] || badges['Draft'];
          return (
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
              {badge.icon && <AlertCircle className="w-3 h-3" />}
              {status}
            </span>
          );
        };

        const getCoverageBadge = (coverage: string) => {
          const badges: Record<string, { bg: string; text: string }> = {
            'Complete': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400' },
            'Partial': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400' },
            'Not Generated': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400' },
          };
          const badge = badges[coverage] || badges['Not Generated'];
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
              {coverage}
            </span>
          );
        };

        return (
          <div className="p-6 space-y-6">
            {/* Header with Filters */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Requirements</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search requirements..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Release Filter */}
                <select
                  value={releaseFilter}
                  onChange={(e) => setReleaseFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Releases</option>
                  <option value="v2.5.0">v2.5.0</option>
                  <option value="v2.6.0">v2.6.0</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Clarification Required">Clarification Required</option>
                  <option value="Ready for Scenario Generation">Ready</option>
                  <option value="Test Cases Generated">Cases Generated</option>
                  <option value="Approved">Approved</option>
                </select>

                {/* Ingest Requirement Button */}
                <button
                  onClick={() => router.push('/requirements/ingest')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors ml-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ingest Requirement</span>
                </button>
              </div>
            </div>

            {/* Requirements Table */}
            <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Release
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Linked Test Cases
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Coverage Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRequirements.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        No requirements found
                      </td>
                    </tr>
                  ) : (
                    filteredRequirements.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4">
                          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline text-left">
                            {req.title}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {req.release}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                            {req.linkedTestCases}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getCoverageBadge(req.coverageStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {req.lastModified}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {req.owner}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                              title="View"
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </button>
                            <button
                              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                              title="Archive"
                            >
                              <Archive className="w-3 h-3" />
                              Archive
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'test-cases':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Test Cases</h2>
            <p className="text-gray-600 dark:text-gray-400">Test cases list and details will be displayed here.</p>
          </div>
        );
      case 'executions':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Executions</h2>
            <p className="text-gray-600 dark:text-gray-400">Test execution history and results will be displayed here.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Settings</h2>
            <p className="text-gray-600 dark:text-gray-400">Project configuration and settings will be displayed here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {mockProject.name}
                  </h1>
                  {getStatusBadge(mockProject.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-mono">{mockProject.id}</span>
                  <span>•</span>
                  <span>Owner: {mockProject.owner}</span>
                  <span>•</span>
                  <span>Created: {mockProject.createdDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
