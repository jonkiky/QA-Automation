'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function RequirementIngestionPage() {
  const router = useRouter();
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [acceptanceCriteria, setAcceptanceCriteria] = useState('');
  const [release, setRelease] = useState('');
  
  // Analysis state
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [showIssues, setShowIssues] = useState(true);
  
  // Mock analysis results
  const analysisResults = {
    functionalFlows: [
      'User navigates to shopping cart',
      'User selects items for checkout',
      'System validates inventory availability',
      'User proceeds to payment gateway'
    ],
    preconditions: [
      'User must be authenticated',
      'Shopping cart must contain at least one item',
      'Payment gateway must be operational'
    ],
    postconditions: [
      'Order is created in the system',
      'Inventory is reserved',
      'User receives order confirmation'
    ],
    businessRules: [
      'Minimum order value: $10',
      'Maximum items per order: 50',
      'Free shipping for orders over $50'
    ],
    dependencies: [
      'Payment Service API',
      'Inventory Management System',
      'Email Notification Service'
    ],
    authenticationRequirements: [
      'Valid user session token required',
      'User must have verified email address'
    ],
    validationRules: [
      'All items must be in stock',
      'Payment method must be valid',
      'Shipping address must be complete'
    ],
    constraints: [
      'Transaction timeout: 15 minutes',
      'Maximum retry attempts: 3',
      'Session must not be expired'
    ]
  };
  
  // Mock detected issues
  const detectedIssues = [
    {
      id: 1,
      type: 'Ambiguous Language',
      severity: 'warning',
      description: 'The term "checkout process" is not clearly defined. Does it include payment processing?',
      suggestion: 'Clarify whether checkout includes payment completion or just cart review.'
    },
    {
      id: 2,
      type: 'Missing Acceptance Criteria',
      severity: 'error',
      description: 'No acceptance criteria defined for error handling scenarios.',
      suggestion: 'Add acceptance criteria for payment failure, timeout, and invalid input cases.'
    },
    {
      id: 3,
      type: 'Logical Conflict',
      severity: 'warning',
      description: 'Requirement states "immediate processing" but also mentions "batch processing overnight".',
      suggestion: 'Clarify the timing requirements and processing strategy.'
    }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzed(true);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
    router.push('/projects/PROJ-001');
  };

  const handleSaveAndAnalyze = () => {
    if (!isAnalyzed) {
      handleAnalyze();
    } else {
      console.log('Saving analyzed requirement...');
      router.push('/projects/PROJ-001');
    }
  };

  const handleSubmitForClarification = () => {
    console.log('Submitting for clarification resolution...');
    router.push('/projects/PROJ-001');
  };

  const handleSaveAndGenerateTestCase = () => {
    console.log('Saving and generating test cases...');
    router.push('/test-cases/generate');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/projects/PROJ-001')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Ingest Requirement
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Input requirement data and initiate AI analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Steps Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {/* Step 1: Ingest Requirement */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-semibold">
                  1
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Ingest Requirement
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Current step
                  </div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
            </div>

            {/* Step 2: Generate Test Cases */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full font-semibold">
                  2
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Generate Test Cases
                  </div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
            </div>

            {/* Step 3: Generate Test Scripts */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full font-semibold">
                  3
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Generate Test Scripts
                  </div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
            </div>

            {/* Step 4: Executions */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full font-semibold">
                4
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Executions
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Section 1: Requirement Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Requirement Input
            </h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter requirement title"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed requirement description"
                  rows={6}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Acceptance Criteria */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Acceptance Criteria
                </label>
                <textarea
                  value={acceptanceCriteria}
                  onChange={(e) => setAcceptanceCriteria(e.target.value)}
                  placeholder="Enter acceptance criteria (one per line or structured format)"
                  rows={6}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Release */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Release
                </label>
                <input
                  type="text"
                  value={release}
                  onChange={(e) => setRelease(e.target.value)}
                  placeholder="Enter release (e.g., v2.5.0)"
                  className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Analyze Button */}
              {!isAnalyzed && (
                <div>
                  <button
                    onClick={handleAnalyze}
                    disabled={!title || isAnalyzing}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: AI Pre-Analysis Output */}
          {isAnalyzed && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Pre-Analysis Output
                </h2>
                {showAnalysis ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {showAnalysis && (
                <div className="px-6 pb-6 space-y-6">
                  {/* Functional Flows */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Functional Flows
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.functionalFlows.map((flow, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {flow}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Preconditions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Preconditions
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.preconditions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Postconditions */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Postconditions
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.postconditions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Rules */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Business Rules
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.businessRules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Dependencies */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Dependencies
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.dependencies.map((dep, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          {dep}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Authentication Requirements */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Authentication Requirements
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.authenticationRequirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Validation Rules */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Validation Rules
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.validationRules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Constraints */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Constraints
                    </h3>
                    <ul className="space-y-1">
                      {analysisResults.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 3: Detected Issues Panel */}
          {isAnalyzed && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowIssues(!showIssues)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Detected Issues
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded">
                    {detectedIssues.length} issues found
                  </span>
                </div>
                {showIssues ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {showIssues && (
                <div className="px-6 pb-6 space-y-4">
                  {detectedIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`p-4 rounded-lg border ${
                        issue.severity === 'error'
                          ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                          : 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            issue.severity === 'error'
                              ? 'text-red-600 dark:text-red-400'
                              : 'text-yellow-600 dark:text-yellow-400'
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3
                              className={`text-sm font-semibold ${
                                issue.severity === 'error'
                                  ? 'text-red-900 dark:text-red-300'
                                  : 'text-yellow-900 dark:text-yellow-300'
                              }`}
                            >
                              {issue.type}
                            </h3>
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded ${
                                issue.severity === 'error'
                                  ? 'bg-red-200 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                                  : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300'
                              }`}
                            >
                              {issue.severity}
                            </span>
                          </div>
                          <p
                            className={`text-sm mb-2 ${
                              issue.severity === 'error'
                                ? 'text-red-800 dark:text-red-300'
                                : 'text-yellow-800 dark:text-yellow-300'
                            }`}
                          >
                            {issue.description}
                          </p>
                          <p
                            className={`text-sm italic ${
                              issue.severity === 'error'
                                ? 'text-red-700 dark:text-red-400'
                                : 'text-yellow-700 dark:text-yellow-400'
                            }`}
                          >
                            Suggestion: {issue.suggestion}
                          </p>
                          <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                            Edit Requirement →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => router.push('/projects/PROJ-001')}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveDraft}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Save as Draft
            </button>
            {!isAnalyzed ? (
              <button
                onClick={handleSaveAndAnalyze}
                disabled={!title}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save & Analyze
              </button>
            ) : (
              <>
                <button
                  onClick={handleSubmitForClarification}
                  className="px-6 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Submit for Clarification Resolution
                </button>
                <button
                  onClick={handleSaveAndGenerateTestCase}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save & Generate Test Cases
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
