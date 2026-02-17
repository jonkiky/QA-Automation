'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Edit, Trash2, Check, X, Camera, Code } from 'lucide-react';

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

export default function GenerateTestCasesPage() {
  const router = useRouter();
  
  const [showRequirementSummary, setShowRequirementSummary] = useState(true);
  const [showScenarios, setShowScenarios] = useState(true);
  const [showAddScenario, setShowAddScenario] = useState(false);
  const [showTestCases, setShowTestCases] = useState(true);
  const [showAddTestCase, setShowAddTestCase] = useState(false);
  const [editingScenarioId, setEditingScenarioId] = useState<string | null>(null);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  
  // Add scenario form state
  const [newScenarioTitle, setNewScenarioTitle] = useState('');
  const [newScenarioDescription, setNewScenarioDescription] = useState('');

  // Add test case form state
  const [newTestCaseTitle, setNewTestCaseTitle] = useState('');
  const [newTestCasePreconditions, setNewTestCasePreconditions] = useState('');
  const [newTestCaseSteps, setNewTestCaseSteps] = useState<TestStep[]>([{ id: 'step-1', action: '', takeSnapshot: false }]);
  const [newTestCaseExpectedResults, setNewTestCaseExpectedResults] = useState('');
  const [newTestCasePostconditions, setNewTestCasePostconditions] = useState('');
  
  // Edit scenario state
  const [scenarioEditForm, setScenarioEditForm] = useState({
    preconditions: '',
    description: '',
    expectedOutcome: ''
  });

  // Edit test case state
  const [testCaseEditForm, setTestCaseEditForm] = useState({
    title: '',
    preconditions: '',
    steps: [] as TestStep[],
    expectedResults: '',
    postconditions: '',
  });
  
  // Mock requirement data
  const requirement = {
    id: 'REQ-001',
    title: 'User Checkout Process',
    description: 'Users should be able to complete checkout process with various payment methods and receive confirmation.',
    acceptanceCriteria: [
      'User can add items to cart',
      'User can select payment method',
      'User receives order confirmation',
      'Inventory is updated after successful checkout'
    ],
    flows: [
      'User navigates to shopping cart',
      'User selects items for checkout',
      'System validates inventory availability',
      'User proceeds to payment gateway',
      'System processes payment',
      'System sends confirmation email'
    ],
    businessRules: [
      'Minimum order value: $10',
      'Maximum items per order: 50',
      'Free shipping for orders over $50'
    ],
    constraints: [
      'Transaction timeout: 15 minutes',
      'Maximum retry attempts: 3',
      'Session must not be expired'
    ]
  };


  // Mock scenarios
  const [scenarios, setScenarios] = useState([
    {
      id: 'SCN-001',
      title: 'Successful checkout with credit card',
      type: 'Happy Path',
      requirementId: 'REQ-001',
      preconditions: 'User is logged in, cart has items, credit card is valid',
      description: 'User completes checkout process using a valid credit card and receives order confirmation',
      expectedOutcome: 'Order is created, payment is processed, confirmation email is sent',
      expanded: false
    },
    {
      id: 'SCN-002',
      title: 'Checkout fails due to insufficient inventory',
      type: 'Negative',
      requirementId: 'REQ-001',
      preconditions: 'User is logged in, cart has items, one item is out of stock',
      description: 'User attempts checkout but system detects insufficient inventory for one item',
      expectedOutcome: 'Error message displayed, checkout is blocked, inventory alert sent',
      expanded: false
    },
    {
      id: 'SCN-003',
      title: 'Checkout with session timeout',
      type: 'Edge Case',
      requirementId: 'REQ-001',
      preconditions: 'User is logged in, cart has items, session is about to expire',
      description: 'User takes longer than 15 minutes to complete checkout and session expires',
      expectedOutcome: 'Session timeout warning, user redirected to login, cart preserved',
      expanded: false
    },
    {
      id: 'SCN-004',
      title: 'Unauthorized access to checkout',
      type: 'Authorization',
      requirementId: 'REQ-001',
      preconditions: 'User is not logged in, cart has items',
      description: 'Anonymous user attempts to access checkout without authentication',
      expectedOutcome: 'User redirected to login page, cart preserved for post-login',
      expanded: false
    }
  ]);

  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 'TC-001',
      scenarioId: 'SCN-001',
      requirementId: 'REQ-001',
      title: 'Successful checkout with valid credit card',
      preconditions: 'User is logged in, cart has items, credit card is valid',
      steps: [
        { id: 'step-1', action: 'Navigate to shopping cart', takeSnapshot: false },
        { id: 'step-2', action: 'Click "Proceed to Checkout" button', takeSnapshot: false },
        { id: 'step-3', action: 'Select credit card as payment method', takeSnapshot: false },
        { id: 'step-4', action: 'Enter credit card details', takeSnapshot: false },
        { id: 'step-5', action: 'Click "Complete Purchase" button', takeSnapshot: true },
      ],
      expectedResults: 'Order is created, payment confirmation displayed, confirmation email sent',
      postconditions: 'Order record exists, inventory is updated, user receives confirmation',
      metadata: {
        generatedAt: '2024-02-13 10:30 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1450,
      },
      expanded: false,
    },
    {
      id: 'TC-002',
      scenarioId: 'SCN-002',
      requirementId: 'REQ-001',
      title: 'Checkout blocked due to out of stock item',
      preconditions: 'User is logged in, cart contains at least one out-of-stock item',
      steps: [
        { id: 'step-1', action: 'Navigate to shopping cart', takeSnapshot: false },
        { id: 'step-2', action: 'Click "Proceed to Checkout" button', takeSnapshot: true },
      ],
      expectedResults: 'Error message: "One or more items are out of stock", checkout is prevented',
      postconditions: 'User remains on cart page, inventory alert sent to admin',
      metadata: {
        generatedAt: '2024-02-13 10:31 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1280,
      },
      expanded: false,
    },
    {
      id: 'TC-003',
      scenarioId: 'SCN-003',
      requirementId: 'REQ-001',
      title: 'Session timeout during checkout',
      preconditions: 'User is logged in, session will expire in 1 minute',
      steps: [
        { id: 'step-1', action: 'Navigate to shopping cart', takeSnapshot: false },
        { id: 'step-2', action: 'Click "Proceed to Checkout" button', takeSnapshot: false },
        { id: 'step-3', action: 'Wait for session timeout (>15 minutes)', takeSnapshot: false },
        { id: 'step-4', action: 'Attempt to complete checkout', takeSnapshot: true },
      ],
      expectedResults: 'Session timeout warning displayed, user redirected to login page',
      postconditions: 'Cart is preserved, user can continue after re-login',
      metadata: {
        generatedAt: '2024-02-13 10:32 AM',
        modelVersion: 'GPT-4',
        promptVersion: 'v2.1',
        tokenUsage: 1320,
      },
      expanded: false,
    },
  ]);

  const toggleScenarioExpansion = (scenarioId: string) => {
    // If editing, cancel edit mode first
    if (editingScenarioId === scenarioId) {
      setEditingScenarioId(null);
    }
    setScenarios(scenarios.map(s => 
      s.id === scenarioId ? { ...s, expanded: !s.expanded } : s
    ));
  };

  const handleAddScenario = () => {
    setShowAddScenario(!showAddScenario);
    setNewScenarioTitle('');
    setNewScenarioDescription('');
  };

  const handleSaveNewScenario = () => {
    if (newScenarioTitle && newScenarioDescription) {
      const newScenario = {
        id: `SCN-${String(scenarios.length + 1).padStart(3, '0')}`,
        title: newScenarioTitle,
        type: 'Happy Path',
        requirementId: 'REQ-001',
        preconditions: 'To be defined',
        description: newScenarioDescription,
        expectedOutcome: 'To be defined',
        expanded: false
      };
      setScenarios([...scenarios, newScenario]);
      setShowAddScenario(false);
      setNewScenarioTitle('');
      setNewScenarioDescription('');
    }
  };

  const handleEditScenario = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setScenarioEditForm({
        preconditions: scenario.preconditions,
        description: scenario.description,
        expectedOutcome: scenario.expectedOutcome
      });
      setEditingScenarioId(scenarioId);
      // Expand the scenario if not already expanded
      if (!scenario.expanded) {
        toggleScenarioExpansion(scenarioId);
      }
    }
  };

  const handleSaveScenarioEdit = (scenarioId: string) => {
    setScenarios(scenarios.map(s => 
      s.id === scenarioId 
        ? { 
            ...s, 
            preconditions: scenarioEditForm.preconditions,
            description: scenarioEditForm.description,
            expectedOutcome: scenarioEditForm.expectedOutcome
          } 
        : s
    ));
    setEditingScenarioId(null);
  };

  const handleCancelScenarioEdit = () => {
    setEditingScenarioId(null);
  };

  // Test Case handlers
  const toggleTestCaseExpansion = (caseId: string) => {
    if (editingCaseId === caseId) {
      setEditingCaseId(null);
    }
    setTestCases(testCases.map(tc =>
      tc.id === caseId ? { ...tc, expanded: !tc.expanded } : tc
    ));
  };

  const handleEditTestCase = (testCase: TestCase) => {
    setEditingCaseId(testCase.id);
    setTestCaseEditForm({
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

  const handleSaveTestCaseEdit = () => {
    if (!editingCaseId) return;

    setTestCases(testCases.map(tc =>
      tc.id === editingCaseId
        ? {
            ...tc,
            title: testCaseEditForm.title,
            preconditions: testCaseEditForm.preconditions,
            steps: testCaseEditForm.steps,
            expectedResults: testCaseEditForm.expectedResults,
            postconditions: testCaseEditForm.postconditions,
          }
        : tc
    ));
    setEditingCaseId(null);
  };

  const handleCancelTestCaseEdit = () => {
    setEditingCaseId(null);
  };

  const handleAddStep = () => {
    const newStep: TestStep = {
      id: `step-${testCaseEditForm.steps.length + 1}`,
      action: '',
      takeSnapshot: false,
    };
    setTestCaseEditForm({
      ...testCaseEditForm,
      steps: [...testCaseEditForm.steps, newStep],
    });
  };

  const handleRemoveStep = (stepId: string) => {
    setTestCaseEditForm({
      ...testCaseEditForm,
      steps: testCaseEditForm.steps.filter(s => s.id !== stepId),
    });
  };

  const handleStepChange = (stepId: string, field: 'action' | 'takeSnapshot', value: string | boolean) => {
    setTestCaseEditForm({
      ...testCaseEditForm,
      steps: testCaseEditForm.steps.map(s =>
        s.id === stepId ? { ...s, [field]: value } : s
      ),
    });
  };

  const handleAddTestCase = () => {
    setShowAddTestCase(!showAddTestCase);
    setNewTestCaseTitle('');
    setNewTestCasePreconditions('');
    setNewTestCaseSteps([{ id: 'step-1', action: '', takeSnapshot: false }]);
    setNewTestCaseExpectedResults('');
    setNewTestCasePostconditions('');
  };

  const handleSaveNewTestCase = () => {
    if (newTestCaseTitle.trim() && newTestCaseSteps.some(s => s.action.trim())) {
      const newCase: TestCase = {
        id: `TC-${String(testCases.length + 1).padStart(3, '0')}`,
        scenarioId: scenarios.length > 0 ? scenarios[0].id : 'SCN-001',
        requirementId: requirement.id,
        title: newTestCaseTitle,
        preconditions: newTestCasePreconditions,
        steps: newTestCaseSteps.filter(s => s.action.trim()),
        expectedResults: newTestCaseExpectedResults,
        postconditions: newTestCasePostconditions,
        metadata: {
          generatedAt: new Date().toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
          modelVersion: 'Manual',
          promptVersion: 'N/A',
          tokenUsage: 0,
        },
        expanded: false,
      };
      setTestCases([...testCases, newCase]);
      setShowAddTestCase(false);
      setNewTestCaseTitle('');
      setNewTestCasePreconditions('');
      setNewTestCaseSteps([{ id: 'step-1', action: '', takeSnapshot: false }]);
      setNewTestCaseExpectedResults('');
      setNewTestCasePostconditions('');
    }
  };

  const handleNewTestCaseStepChange = (stepId: string, field: 'action' | 'takeSnapshot', value: string | boolean) => {
    setNewTestCaseSteps(newTestCaseSteps.map(s =>
      s.id === stepId ? { ...s, [field]: value } : s
    ));
  };

  const handleAddNewTestCaseStep = () => {
    const newStep: TestStep = {
      id: `step-${newTestCaseSteps.length + 1}`,
      action: '',
      takeSnapshot: false,
    };
    setNewTestCaseSteps([...newTestCaseSteps, newStep]);
  };

  const handleRemoveNewTestCaseStep = (stepId: string) => {
    setNewTestCaseSteps(newTestCaseSteps.filter(s => s.id !== stepId));
  };

  const getScenarioTypeBadge = (type: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      'Happy Path': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-800 dark:text-green-400' },
      'Negative': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-800 dark:text-red-400' },
      'Edge Case': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-800 dark:text-yellow-400' },
      'Boundary': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-800 dark:text-orange-400' },
      'Authorization': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-800 dark:text-purple-400' },
      'Validation': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-800 dark:text-blue-400' },
    };
    const badge = badges[type] || badges['Happy Path'];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {type}
      </span>
    );
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
                  Generate Test Cases
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {requirement.id} - {requirement.title}
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
                <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-semibold">
                  ✓
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Ingest Requirement
                  </div>
                </div>
              </div>
              <div className="flex-1 h-0.5 bg-blue-600 mx-4"></div>
            </div>

            {/* Step 2: Generate Test Cases */}
            <div className="flex items-center flex-1">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-semibold">
                  2
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Generate Test Cases
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Current step
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
          {/* Section 1: Requirement Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setShowRequirementSummary(!showRequirementSummary)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Requirement Summary
              </h2>
              {showRequirementSummary ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {showRequirementSummary && (
              <div className="px-6 pb-6 space-y-4">
                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {requirement.description}
                  </p>
                </div>

                {/* Acceptance Criteria */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Acceptance Criteria
                  </h3>
                  <ul className="space-y-1">
                    {requirement.acceptanceCriteria.map((criteria, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        {criteria}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Extracted Flows */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Extracted Flows
                  </h3>
                  <ul className="space-y-1">
                    {requirement.flows.map((flow, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">{index + 1}.</span>
                        {flow}
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
                    {requirement.businessRules.map((rule, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
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
                    {requirement.constraints.map((constraint, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                        <span className="text-orange-600 dark:text-orange-400">•</span>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Test Scenarios */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Test Scenarios
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {scenarios.length} scenarios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleAddScenario}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Scenario
                  </button>
                  <button 
                    onClick={() => {
                      // Scroll to test cases section
                      setShowTestCases(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Generate Test Cases
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Add Scenario Panel */}
              {showAddScenario && (
                <div className="border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/10 p-4 space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Add New Scenario
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Scenario Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newScenarioTitle}
                      onChange={(e) => setNewScenarioTitle(e.target.value)}
                      placeholder="Enter scenario title"
                      className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newScenarioDescription}
                      onChange={(e) => setNewScenarioDescription(e.target.value)}
                      placeholder="Describe the test scenario"
                      rows={4}
                      className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handleAddScenario}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNewScenario}
                      disabled={!newScenarioTitle || !newScenarioDescription}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Save Scenario
                    </button>
                  </div>
                </div>
              )}

              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  {/* Scenario Header */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <button
                        onClick={() => toggleScenarioExpansion(scenario.id)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {scenario.expanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">
                            {scenario.id}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {scenario.title}
                          </span>
                          {getScenarioTypeBadge(scenario.type)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditScenario(scenario.id)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {scenario.expanded && (
                    <div className="px-4 py-4 space-y-3 bg-white dark:bg-gray-800">
                      {editingScenarioId === scenario.id ? (
                        // Edit Mode
                        <>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                              Preconditions
                            </h4>
                            <textarea
                              value={scenarioEditForm.preconditions}
                              onChange={(e) => setScenarioEditForm({ ...scenarioEditForm, preconditions: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                              Scenario Description
                            </h4>
                            <textarea
                              value={scenarioEditForm.description}
                              onChange={(e) => setScenarioEditForm({ ...scenarioEditForm, description: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                              Expected Outcome
                            </h4>
                            <textarea
                              value={scenarioEditForm.expectedOutcome}
                              onChange={(e) => setScenarioEditForm({ ...scenarioEditForm, expectedOutcome: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              onClick={handleCancelScenarioEdit}
                              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveScenarioEdit(scenario.id)}
                              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </>
                      ) : (
                        // View Mode
                        <>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                              Preconditions
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {scenario.preconditions}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                              Scenario Description
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {scenario.description}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                              Expected Outcome
                            </h4>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {scenario.expectedOutcome}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Generated Test Cases */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Generated Test Cases
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {testCases.length} test cases
                  </span>
                </div>
                <button 
                  onClick={handleAddTestCase}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Test Case
                </button>
              </div>
            </div>

            {showTestCases && (
              <div className="p-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
                {/* Add Test Case Panel */}
                {showAddTestCase && (
                  <div className="border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/10 p-4 space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Add New Test Case
                    </h3>
                    
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={newTestCaseTitle}
                        onChange={(e) => setNewTestCaseTitle(e.target.value)}
                        placeholder="Enter test case title"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Preconditions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Preconditions
                      </label>
                      <textarea
                        value={newTestCasePreconditions}
                        onChange={(e) => setNewTestCasePreconditions(e.target.value)}
                        rows={2}
                        placeholder="Enter preconditions"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Test Steps */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Test Steps *
                        </label>
                        <button
                          onClick={handleAddNewTestCaseStep}
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                          Add Step
                        </button>
                      </div>
                      <div className="space-y-2">
                        {newTestCaseSteps.map((step, index) => (
                          <div key={step.id} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                              {index + 1}.
                            </span>
                            <input
                              type="text"
                              value={step.action}
                              onChange={(e) => handleNewTestCaseStepChange(step.id, 'action', e.target.value)}
                              placeholder="Enter step action"
                              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
                            />
                            <button
                              onClick={() => handleNewTestCaseStepChange(step.id, 'takeSnapshot', !step.takeSnapshot)}
                              className={`p-2 rounded ${
                                step.takeSnapshot
                                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }`}
                              title="Take snapshot"
                            >
                              <Camera className="w-4 h-4" />
                            </button>
                            {newTestCaseSteps.length > 1 && (
                              <button
                                onClick={() => handleRemoveNewTestCaseStep(step.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
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
                      <textarea
                        value={newTestCaseExpectedResults}
                        onChange={(e) => setNewTestCaseExpectedResults(e.target.value)}
                        rows={2}
                        placeholder="Enter expected results"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Postconditions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Postconditions
                      </label>
                      <textarea
                        value={newTestCasePostconditions}
                        onChange={(e) => setNewTestCasePostconditions(e.target.value)}
                        rows={2}
                        placeholder="Enter postconditions"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={handleAddTestCase}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveNewTestCase}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

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
                          </div>
                          {editingCaseId === testCase.id ? (
                            <input
                              type="text"
                              value={testCaseEditForm.title}
                              onChange={(e) => setTestCaseEditForm({ ...testCaseEditForm, title: e.target.value })}
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
                              onClick={handleSaveTestCaseEdit}
                              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelTestCaseEdit}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditTestCase(testCase)}
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
                          onClick={() => toggleTestCaseExpansion(testCase.id)}
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
                              value={testCaseEditForm.preconditions}
                              onChange={(e) => setTestCaseEditForm({ ...testCaseEditForm, preconditions: e.target.value })}
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
                            {(editingCaseId === testCase.id ? testCaseEditForm.steps : testCase.steps).map((step, index) => (
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
                              value={testCaseEditForm.expectedResults}
                              onChange={(e) => setTestCaseEditForm({ ...testCaseEditForm, expectedResults: e.target.value })}
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
                              value={testCaseEditForm.postconditions}
                              onChange={(e) => setTestCaseEditForm({ ...testCaseEditForm, postconditions: e.target.value })}
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
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => router.push('/projects/PROJ-001')}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Save
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Generate Scripts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
