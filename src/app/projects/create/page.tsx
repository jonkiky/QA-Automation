'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft,
  Save,
  X
} from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    owner: '',
    members: '',
    modelVersion: 'GPT-4',
    promptTemplateScript: '',
    promptTemplateCase: '',
    promptTemplateScenario: '',
    tokenLimit: '8000',
  });
  const [users, setUsers] = useState<Array<{email: string, role: string}>>([
    { email: 'john.doe@company.com', role: 'Admin' },
  ]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('Contributor');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Project owner is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Creating project:', formData);
      // Navigate to project detail or dashboard
      router.push('/dashboard');
    }, 1500);
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Test Project</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Initialize a new test project with configurations and team members
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Single column layout */}
            <div className="p-8 space-y-8">
              {/* Project Info Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Project Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="projectName"
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.projectName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="e.g., E-Commerce Platform"
                      />
                      {errors.projectName && (
                        <p className="mt-1 text-sm text-red-500">{errors.projectName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Brief description of the project scope and objectives..."
                      />
                    </div>
                  </div>
                </div>

                {/* Ownership Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Ownership & Team
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="owner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Project Owner <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={formData.owner}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.owner ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="e.g., john.doe@company.com"
                      />
                      {errors.owner && (
                        <p className="mt-1 text-sm text-red-500">{errors.owner}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="members" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Additional Members
                      </label>
                      <textarea
                        id="members"
                        name="members"
                        value={formData.members}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email addresses, separated by commas"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Team members will have contributor access by default
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Configuration Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    AI Configuration
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="modelVersion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Model Version
                      </label>
                      <input
                        type="text"
                        id="modelVersion"
                        name="modelVersion"
                        value={formData.modelVersion}
                        onChange={handleInputChange}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Global configuration (read-only)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="promptTemplateScript" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Prompt Template - Test Script
                        </label>
                        <textarea
                          id="promptTemplateScript"
                          name="promptTemplateScript"
                          value={formData.promptTemplateScript}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                          placeholder="Enter markdown prompt template for test script generation..."
                        />
                      </div>

                      <div>
                        <label htmlFor="promptTemplateCase" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Prompt Template - Test Case
                        </label>
                        <textarea
                          id="promptTemplateCase"
                          name="promptTemplateCase"
                          value={formData.promptTemplateCase}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                          placeholder="Enter markdown prompt template for test case generation..."
                        />
                      </div>

                      <div>
                        <label htmlFor="promptTemplateScenario" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Prompt Template - Test Scenarios
                        </label>
                        <textarea
                          id="promptTemplateScenario"
                          name="promptTemplateScenario"
                          value={formData.promptTemplateScenario}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                          placeholder="Enter markdown prompt template for test scenario generation..."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tokenLimit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Token Limit Override
                      </label>
                      <input
                        type="number"
                        id="tokenLimit"
                        name="tokenLimit"
                        value={formData.tokenLimit}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="8000"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Maximum tokens per AI generation request
                      </p>
                    </div>
                  </div>
                </div>

                {/* Access Control Section */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Access Control
                  </h2>
                  <div className="space-y-4">
                    {/* User List */}
                    <div className="border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Team Members & Permissions
                        </h3>
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        {users.map((user, index) => (
                          <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/30">
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.email}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Role: {user.role}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setUsers(users.filter((_, i) => i !== index))}
                              className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add User Form */}
                    <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Add Team Member
                      </h3>
                      <div className="flex gap-3">
                        <input
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="Email address"
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <select
                          value={newUserRole}
                          onChange={(e) => setNewUserRole(e.target.value)}
                          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Contributor">Contributor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            if (newUserEmail.trim()) {
                              setUsers([...users, { email: newUserEmail, role: newUserRole }]);
                              setNewUserEmail('');
                            }
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                        >
                          Add User
                        </button>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-8 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl">
              <div className="flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Creating...' : 'Create Project'}</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
