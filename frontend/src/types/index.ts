export type UserRole = 'ADMINISTRATOR' | 'MANAGER' | 'USER';

export interface UserSession {
  authenticated: boolean;
  role: UserRole;
  username: string;
  token: string;
  expiresIn: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  address?: string;
  panNumber?: string;
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore?: number;
  kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED' | string;
  accounts?: Account[];
  createdAt?: string;
}

export interface Account {
  id: number;
  customerId?: number;
  customer?: Customer;
  accountNumber: string;
  accountType: 'SAVINGS' | 'CURRENT' | 'CHECKING' | 'WEALTH_MANAGEMENT' | 'ESCROW' | 'CORPORATE' | 'NOSTRO' | 'VOSTRO' | string;
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'SUSPENDED' | 'UNDER_INVESTIGATION' | string;
  createdAt?: string;
}

export interface Transaction {
  id: number;
  transactionId?: string;
  accountId?: number;
  customerId?: number;
  sourceAccountNumber?: string;
  destinationAccountNumber?: string;
  amount: number;
  currency?: string;
  transactionType?: 'TRANSFER' | 'PAYMENT' | 'WITHDRAWAL' | 'DEPOSIT' | 'SETTLEMENT' | 'FX_CONVERSION' | string;
  paymentCode?: string;
  description?: string;
  timestamp: string;
  location?: string;
  status: 'COMPLETED' | 'PENDING_OTP' | 'ESCALATED_MANAGER' | 'BLOCKED_FRAUD' | 'REJECTED' | 'FLAGGED' | string;
  riskScore: number;
  otpVerified?: boolean;
  verifiedPhone?: string;
  flaggedByDsa?: string;
  detectedFraudPatterns?: string | string[];
}

export interface FraudEvent {
  id: number;
  transactionId?: number;
  pattern?: string;
  patternType?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  detectedBy?: string;
  detectedAlgorithm?: string;
  confidenceScore?: number;
  details?: string;
  description?: string;
  status: 'DETECTED' | 'UNDER_INVESTIGATION' | 'RESOLVED_BLOCKED' | 'RESOLVED' | 'ESCALATED' | 'FALSE_POSITIVE' | string;
  timestamp?: string;
  createdAt?: string;
}

export interface FinancialDocument {
  id: number;
  customerId?: number;
  title: string;
  documentType: 'AUDIT_REPORT' | 'LOAN_AGREEMENT' | 'SWIFT_TRANSCRIPT' | 'SWIFT_SLIP' | 'KYC_RECORD' | 'AUDIT_TRANSCRIPT' | 'COMPLIANCE_FILING' | 'RISK_ASSESSMENT' | string;
  content: string;
  indexedKeywords?: string;
  category?: string;
  uploadedAt?: string;
  createdAt?: string;
}

export interface Analyst {
  id: number;
  name: string;
  email: string;
  specialization?: 'AML_FRAUD' | 'CYBER_FORENSICS' | 'HIGH_FREQUENCY_FLOW' | 'COMPLIANCE' | 'GRAPH_ALGORITHMS' | string;
  availability?: boolean;
  role: UserRole;
}

export interface InvestigationCase {
  id: number;
  caseNumber?: string;
  title: string;
  summary?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  status: 'OPEN' | 'ASSIGNED' | 'UNDER_REVIEW' | 'IN_PROGRESS' | 'RESOLVED_RECOVERED' | 'ESCALATED_LEGAL' | 'CLOSED' | string;
  assignedAnalystId?: number;
  assignedAnalystName?: string;
  assignedAnalyst?: Analyst;
  transactionId?: number;
  notes?: string;
  openedAt?: string;
  createdAt?: string;
}

export interface AlgorithmStep {
  stepNumber: number;
  type?: string;
  description: string;
  activeIndices?: number[];
  highlightNodes?: string[];
  highlightEdges?: string[];
  arrayState?: any;
  matrixState?: any;
  graphState?: any;
  stateMap?: Record<string, any>;
}

export interface AlgorithmResponse {
  algorithm?: string;
  algorithmName?: string;
  module?: string;
  category?: string;
  description?: string;
  financialUseCase?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  input?: any;
  result?: any;
  resultData?: any;
  complexity?: Record<string, string>;
  totalSteps?: number;
  steps: AlgorithmStep[];
  executionTimeMs: number;
  executionTimeNs?: number;
  memoryUsedKb?: number;
  status?: string;
  message?: string;
  timestamp?: number;
}

export interface DashboardStats {
  totalCustomers: number;
  activeAccounts?: number;
  totalAccounts?: number;
  totalTransactions: number;
  fraudPatternsDetected?: number;
  totalFraudEvents?: number;
  documentsIndexed?: number;
  totalDocuments?: number;
  algorithmsExecuted?: number;
  totalAlgorithmsExecuted?: number;
  totalVolumeInr?: number;
  fraudRatePercent?: number;
  volumeByHour?: Array<{ time: string; volume: number; txnCount: number }>;
  dsaExecutionDistribution?: Array<{ name: string; value: number; color: string }>;
  riskDistribution?: Array<{ name: string; count: number; fill: string }>;
}

export interface AuditLog {
  id: number;
  action: string;
  performedBy: string;
  role: string;
  details: string;
  status: string;
  timestamp: string;
}

export interface AlgorithmExecution {
  id?: number;
  algorithmName: string;
  category: string;
  executionTimeMs: number;
  status: string;
  inputSummary: string;
  executedAt: string;
}
