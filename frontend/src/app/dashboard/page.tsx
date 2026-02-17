'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  TestTube,
  BarChart3,
  ChevronDown,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  User,
  LogOut,
  Settings
} from 'lucide-react';

// Mock data
const mockProjects = [
  { id: 'all', name: 'All Projects' },
  { id: 'p1', name: 'E-Commerce Platform' },
  { id: 'p2', name: 'Payment Gateway' },
  { id: 'p3', name: 'Mobile App Backend' },
];

const mockProjectsData = [
  {
    id: 'PROJ-001',
    name: 'E-Commerce Platform',
    product: 'Web',
    release: 'v2.5.0',
    owner: 'John Doe',
    coverage: 87,
    passRate: 94,
    lastExecution: '2 hours ago',
    status: 'active' as const,
    requirements: 45,
    testCases: 128,
    testScripts: 112,
  },
  {
    id: 'PROJ-002',
    name: 'Payment Gateway',
    product: 'API',
    release: 'v1.3.2',
    owner: 'Jane Smith',
    coverage: 92,
    passRate: 98,
    lastExecution: '1 day ago',
    status: 'active' as const,
    requirements: 32,
    testCases: 89,
    testScripts: 85,
  },
  {
    id: 'PROJ-003',
    name: 'Mobile App Backend',
    product: 'Mobile',
    release: 'v3.0.0',
    owner: 'Bob Johnson',
    coverage: 78,
    passRate: 89,
    lastExecution: '3 hours ago',
    status: 'active' as const,
    requirements: 58,
    testCases: 167,
    testScripts: 142,
  },
  {
    id: 'PROJ-004',
    name: 'Admin Dashboard',
    product: 'Web',
    release: 'v1.8.1',
    owner: 'Alice Brown',
    coverage: 85,
    passRate: 91,
    lastExecution: '5 hours ago',
    status: 'active' as const,
    requirements: 38,
    testCases: 102,
    testScripts: 95,
  },
  {
    id: 'PROJ-005',
    name: 'Analytics Engine',
    product: 'Backend',
    release: 'v2.1.0',
    owner: 'Charlie Davis',
    coverage: 95,
    passRate: 96,
    lastExecution: '30 min ago',
    status: 'active' as const,    requirements: 62,
    testCases: 215,
    testScripts: 198,  },
  {
    id: 'PROJ-006',
    name: 'Legacy System Migration',
    product: 'Infrastructure',
    release: 'v1.0.0',
    owner: 'Eve Wilson',
    coverage: 45,
    passRate: 72,
    lastExecution: '1 week ago',
    status: 'archived' as const,
    requirements: 18,
    testCases: 52,
    testScripts: 38,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ownerFilter, setOwnerFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('active');

  const metrics = [
    {
      title: 'Test Cases',
      value: '1,247',
      icon: TestTube,
      color: 'purple',
      link: '/test-cases',
    },
    {
      title: 'Projects',
      value: '12',
      icon: BarChart3,
      color: 'indigo',
      link: '/projects',
    },
  ];

  const filteredProjects = mockProjectsData.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOwner = ownerFilter === 'all' || project.owner === ownerFilter;
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesOwner && matchesStatus;
  });

  const getStatusBadge = (status: 'active' | 'archived') => {
    if (status === 'active') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
        Archived
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            
            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">QA Engineer</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@company.com</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Navigate to settings
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      // Handle logout
                      window.location.href = '/login';
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 rounded-b-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {metrics.map((metric) => {
            return (
              <a
                key={metric.title}
                href={metric.link}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Test Projects Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 flex items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Filters */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Create Project Button */}
              <a 
                href="/projects/create"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Create Project</span>
              </a>
            </div>
          </div>

          {/* Project Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Requirements
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Test Cases
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Test Scripts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {project.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {project.owner}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {project.requirements}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {project.testCases}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {project.testScripts}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(project.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/projects/${project.id}`)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => router.push('/projects/create')}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No projects found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
