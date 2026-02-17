'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronUp, Edit, Trash2, Plus, Check, X, Camera, Code } from 'lucide-react';

interface TestStep {
  id: string;
  action: string;
  takeSnapshot: boolean;
}

interface TestCase {
  id: string;
  scenarioId: string;
  requirementId: string;
  title: string;
  preconditions: string;
  steps: TestStep[];
  expectedResults: string;
  postconditions: string;
  metadata: {
    generatedAt: string;
    modelVersion: string;
    promptVersion: string;
    tokenUsage: number;
  };
  expanded: boolean;
}

export default function TestCaseReviewPage() {
  const router = useRouter();

  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'TC-001',
      scenarioId: 'SCN-001',
      requirementId: 'REQ-001',
      title: 'User Login - Valid Credentials',
      preconditions: 'User account exists with valid credentials',
      steps: [
        { id: 'step-1', action: 'Navigate to login page', takeSnapshot: false },
        { id: 'step-2', action: 'Enter valid username', takeSnapshot: false },
        { id: 'step-3', action: 'Enter valid password', takeSnapshot: false },
        { id: 'step-4', action: 'Click login button', takeSnapshot: true },
      ],
      expectedResults: 'User successfully logged in and redirected to dashboard',
      postconditions: 'User session is active',
      metadata: {
        generatedAt: '2024-02-13 10:30 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1250,
      },
      expanded: false,
    },
    {
      id: 'TC-002',
      scenarioId: 'SCN-002',
      requirementId: 'REQ-001',
      title: 'User Login - Invalid Credentials',
      preconditions: 'Login page is accessible',
      steps: [
        { id: 'step-1', action: 'Navigate to login page', takeSnapshot: false },
        { id: 'step-2', action: 'Enter invalid username', takeSnapshot: false },
        { id: 'step-3', action: 'Enter invalid password', takeSnapshot: false },
        { id: 'step-4', action: 'Click login button', takeSnapshot: true },
      ],
      expectedResults: 'Error message displayed: "Invalid credentials"',
      postconditions: 'User remains on login page',
      metadata: {
        generatedAt: '2024-02-13 10:31 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1180,
      },
      expanded: false,
    },
    {
      id: 'TC-003',
      scenarioId: 'SCN-003',
      requirementId: 'REQ-001',
      title: 'User Login - Empty Fields',
      preconditions: 'Login page is accessible',
      steps: [
        { id: 'step-1', action: 'Navigate to login page', takeSnapshot: false },
        { id: 'step-2', action: 'Leave username field empty', takeSnapshot: false },
        { id: 'step-3', action: 'Leave password field empty', takeSnapshot: false },
        { id: 'step-4', action: 'Click login button', takeSnapshot: true },
      ],
      expectedResults: 'Validation error displayed: "Username and password are required"',
      postconditions: 'User remains on login page',
      metadata: {
        generatedAt: '2024-02-13 10:32 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1100,
      },
      expanded: false,
    },
  ]);

  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    preconditions: '',
    steps: [] as TestStep[],
    expectedResults: '',
    postconditions: '',
  });
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  const toggleExpansion = (caseId: string) => {
    if (editingCaseId === caseId) {
      setEditingCaseId(null);
    }
    setTestCases(testCases.map(tc =>
      tc.id === caseId ? { ...tc, expanded: !tc.expanded } : tc
    ));
  };

  const handleEdit = (testCase: TestCase) => {
    setEditingCaseId(testCase.id);
    setEditForm({
      title: testCase.title,
      preconditions: testCase.preconditions,
      steps: [...testCase.steps],
      expectedResults: testCase.expectedResults,
      postconditions: testCase.postconditions,
    });
    if (!testCase.expanded) {
      setTestCases(testCases.map(tc =>
        tc.id === testCase.id ? { ...tc, expanded: true } : tc
      ));
    }
  };

  const handleSaveEdit = () => {
    if (!editingCaseId) return;

    setTestCases(testCases.map(tc =>
      tc.id === editingCaseId
        ? {
            ...tc,
            title: editForm.title,
            preconditions: editForm.preconditions,
            steps: editForm.steps,
            expectedResults: editForm.expectedResults,
            postconditions: editForm.postconditions,
          }
        : tc
    ));
    setEditingCaseId(null);
  };

  const handleCancelEdit = () => {
    setEditingCaseId(null);
  };

  const handleAddStep = () => {
    const newStep: TestStep = {
      id: `step-${editForm.steps.length + 1}`,
      action: '',
      takeSnapshot: false,
    };
    setEditForm({
      ...editForm,
      steps: [...editForm.steps, newStep],
    });
  };

  const handleRemoveStep = (stepId: string) => {
    setEditForm({
      ...editForm,
      steps: editForm.steps.filter(s => s.id !== stepId),
    });
  };

  const handleStepChange = (stepId: string, field: 'action' | 'takeSnapshot', value: string | boolean) => {
    setEditForm({
      ...editForm,
      steps: editForm.steps.map(s =>
        s.id === stepId ? { ...s, [field]: value } : s
      ),
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="px-8 py-4">
          <button
            onClick={() => router.push('/test-cases/generate')}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Scenarios
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Review Test Cases
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                REQ-001: User Authentication System
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Stepper */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Step 1 - Complete */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                <Check className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Ingest Requirement</div>
              </div>
            </div>
            <div className="flex-1 h-0.5 bg-green-500 mx-4"></div>

            {/* Step 2 - Complete */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                <Check className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Generate Test Cases</div>
              </div>
            </div>
            <div className="flex-1 h-0.5 bg-blue-500 mx-4"></div>

            {/* Step 3 - Current */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white">
                <span className="text-sm font-medium">3</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">Generate Test Scripts</div>
              </div>
            </div>
            <div className="flex-1 h-0.5 bg-gray-300 dark:bg-gray-700 mx-4"></div>

            {/* Step 4 - Pending */}
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                <span className="text-sm font-medium">4</span>
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Executions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-8 py-6">
        {/* Test Cases List */}
        <div className="space-y-4">
          {testCases.map((testCase) => (
            <div
              key={testCase.id}
              className="border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
            >
              {/* Card Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {testCase.id}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        → {testCase.scenarioId}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        → {testCase.requirementId}
                      </span>
                    </div>
                    {editingCaseId === testCase.id ? (
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {testCase.title}
                      </h3>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {editingCaseId === testCase.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(testCase)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => router.push('/scripts/generate')}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                        title="Generate Scripts"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => toggleExpansion(testCase.id)}
                    className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
                  >
                    {testCase.expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {testCase.expanded && (
                <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-4">
                  {/* Preconditions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preconditions
                    </label>
                    {editingCaseId === testCase.id ? (
                      <textarea
                        value={editForm.preconditions}
                        onChange={(e) => setEditForm({ ...editForm, preconditions: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testCase.preconditions}</p>
                    )}
                  </div>

                  {/* Steps */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Test Steps
                      </label>
                      {editingCaseId === testCase.id && (
                        <button
                          onClick={handleAddStep}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                          Add Step
                        </button>
                      )}
                    </div>
                    <div className="space-y-2">
                      {(editingCaseId === testCase.id ? editForm.steps : testCase.steps).map((step, index) => (
                        <div key={step.id} className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                            {index + 1}.
                          </span>
                          {editingCaseId === testCase.id ? (
                            <>
                              <input
                                type="text"
                                value={step.action}
                                onChange={(e) => handleStepChange(step.id, 'action', e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                                placeholder="Enter step action"
                              />
                              <button
                                onClick={() => handleStepChange(step.id, 'takeSnapshot', !step.takeSnapshot)}
                                className={`p-2 rounded ${
                                  step.takeSnapshot
                                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                                title="Take snapshot"
                              >
                                <Camera className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveStep(step.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <span className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                                {step.action}
                              </span>
                              {step.takeSnapshot && (
                                <Camera className="w-4 h-4 text-blue-600" title="Snapshot" />
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Results */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Expected Results
                    </label>
                    {editingCaseId === testCase.id ? (
                      <textarea
                        value={editForm.expectedResults}
                        onChange={(e) => setEditForm({ ...editForm, expectedResults: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testCase.expectedResults}</p>
                    )}
                  </div>

                  {/* Postconditions */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Postconditions
                    </label>
                    {editingCaseId === testCase.id ? (
                      <textarea
                        value={editForm.postconditions}
                        onChange={(e) => setEditForm({ ...editForm, postconditions: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testCase.postconditions}</p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Generation Metadata
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Generated:</span>
                        <span className="ml-2 text-gray-900 dark:text-gray-100">{testCase.metadata.generatedAt}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Model:</span>
                        <span className="ml-2 text-gray-900 dark:text-gray-100">{testCase.metadata.modelVersion}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Prompt:</span>
                        <span className="ml-2 text-gray-900 dark:text-gray-100">{testCase.metadata.promptVersion}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Tokens:</span>
                        <span className="ml-2 text-gray-900 dark:text-gray-100">{testCase.metadata.tokenUsage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push('/projects/PROJ-001')}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Save Draft
            </button>
            <button
              onClick={() => setShowRegenerateModal(true)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Regenerate Test Cases
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate Scripts
            </button>
          </div>
        </div>
      </footer>

      {/* Regenerate Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Regenerate Test Cases
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              This will create a new version. Downstream scripts may become outdated.
            </p>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3">
                <input type="radio" name="regenerate" defaultChecked className="w-4 h-4" />
                <span className="text-sm text-gray-900 dark:text-gray-100">Full regenerate</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="regenerate" className="w-4 h-4" />
                <span className="text-sm text-gray-900 dark:text-gray-100">Regenerate missing coverage only</span>
              </label>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowRegenerateModal(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowRegenerateModal(false);
                  // Handle regeneration logic
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
