export type Project = {
  id: string;
  name: string;
  description: string;
  product: string;
  release: string;
  owner: string;
  status: 'active' | 'archived';
  coveragePercent: number;
  passRate: number;
  lastExecution?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Requirement = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  release: string;
  status: 'draft' | 'clarification-required' | 'ready' | 'scenarios-generated' | 'test-cases-generated' | 'approved' | 'archived';
  linkedTestCases: number;
  coverageStatus: 'not-generated' | 'partial' | 'complete';
  version: string;
  owner: string;
  lastModified: Date;
  createdAt: Date;
};

export type TestScenario = {
  id: string;
  requirementId: string;
  title: string;
  type: 'happy' | 'negative' | 'edge' | 'boundary' | 'authorization' | 'validation';
  description: string;
  preconditions: string[];
  expectedOutcome: string;
  status: 'draft' | 'approved';
  createdAt: Date;
};

export type TestCase = {
  id: string;
  scenarioId: string;
  requirementId: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  testType: 'ui' | 'api' | 'security' | 'performance';
  preconditions: string[];
  steps: TestStep[];
  expectedResults: string[];
  postconditions: string[];
  status: 'draft' | 'edited' | 'approved' | 'rejected';
  version: string;
  tags: string[];
  createdAt: Date;
};

export type TestStep = {
  stepNumber: number;
  action: string;
  expectedResult: string;
};

export type AutomationScript = {
  id: string;
  testCaseId: string;
  requirementId: string;
  framework: 'playwright';
  language: 'typescript' | 'python';
  code: string;
  status: 'draft' | 'validation-failed' | 'approved' | 'rejected';
  version: string;
  validationResults: ValidationResult[];
  createdAt: Date;
  approvedAt?: Date;
};

export type ValidationResult = {
  rule: string;
  status: 'passed' | 'failed' | 'warning';
  message: string;
};

export type Execution = {
  id: string;
  projectId: string;
  status: 'running' | 'passed' | 'failed' | 'cancelled' | 'partial';
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  triggeredBy: string;
};

export type ExecutionResult = {
  id: string;
  executionId: string;
  testCaseId: string;
  scriptVersion: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  retryCount: number;
  failureCategory?: 'assertion' | 'locator' | 'authentication' | 'environment' | 'timeout';
  logs: string[];
  screenshots: string[];
  stackTrace?: string;
};

export type DashboardMetrics = {
  automationRate: number;
  passRate: number;
  pendingApprovals: number;
  flakyTests: number;
  tokenUsage?: number;
};
