import type {
  Customer,
  Account,
  Transaction,
  FraudEvent,
  FinancialDocument,
  Analyst,
  InvestigationCase,
  AlgorithmResponse,
  DashboardStats,
  AuditLog,
  UserRole
} from '../types';

const API_BASE = 'http://localhost:8088/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}: ${res.statusText}`;
    try {
      const errData = await res.json();
      if (errData && errData.message) errorMsg = errData.message;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }
  return res.json();
}

export const api = {
  // Auth & Roles
  async getRoles() {
    return handleResponse<any[]>(await fetch(`${API_BASE}/auth/roles`));
  },
  async login(role: UserRole, username?: string) {
    return handleResponse<any>(await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, username: username || role })
    }));
  },

  // Dashboard & Analytics
  async getDashboardStats(): Promise<DashboardStats> {
    return handleResponse<DashboardStats>(await fetch(`${API_BASE}/analytics/dashboard-stats`));
  },
  async getAuditLogs(): Promise<AuditLog[]> {
    return handleResponse<AuditLog[]>(await fetch(`${API_BASE}/analytics/audit-logs`));
  },

  // Customers
  async getCustomers(search?: string): Promise<Customer[]> {
    const url = search ? `${API_BASE}/customers?search=${encodeURIComponent(search)}` : `${API_BASE}/customers`;
    return handleResponse<Customer[]>(await fetch(url));
  },
  async getCustomer(id: number): Promise<Customer> {
    return handleResponse<Customer>(await fetch(`${API_BASE}/customers/${id}`));
  },
  async createCustomer(cust: Partial<Customer>): Promise<Customer> {
    return handleResponse<Customer>(await fetch(`${API_BASE}/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cust)
    }));
  },

  // Accounts
  async getAccounts(customerId?: number): Promise<Account[]> {
    const url = customerId ? `${API_BASE}/accounts?customerId=${customerId}` : `${API_BASE}/accounts`;
    return handleResponse<Account[]>(await fetch(url));
  },
  async createAccount(acc: Partial<Account>): Promise<Account> {
    return handleResponse<Account>(await fetch(`${API_BASE}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(acc)
    }));
  },

  // Transactions
  async getTransactions(search?: string): Promise<Transaction[]> {
    const url = search ? `${API_BASE}/transactions?search=${encodeURIComponent(search)}` : `${API_BASE}/transactions`;
    return handleResponse<Transaction[]>(await fetch(url));
  },
  async getRecentTransactions(): Promise<Transaction[]> {
    return handleResponse<Transaction[]>(await fetch(`${API_BASE}/transactions/recent`));
  },
  async getHighRiskTransactions(): Promise<Transaction[]> {
    return handleResponse<Transaction[]>(await fetch(`${API_BASE}/transactions/high-risk`));
  },
  async getTransaction(id: number): Promise<Transaction> {
    return handleResponse<Transaction>(await fetch(`${API_BASE}/transactions/${id}`));
  },
  async processTransaction(req: any): Promise<Transaction> {
    return handleResponse<Transaction>(await fetch(`${API_BASE}/transactions/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    }));
  },
  async sendOtp(phone: string, customerId?: number) {
    return handleResponse<any>(await fetch(`${API_BASE}/transactions/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, customerId })
    }));
  },
  async verifyOtp(phone: string, otp: string, customerId?: number) {
    return handleResponse<any>(await fetch(`${API_BASE}/transactions/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp, customerId })
    }));
  },
  async updateTransactionStatus(id: number, status: string, role: string, note?: string): Promise<Transaction> {
    return handleResponse<Transaction>(await fetch(`${API_BASE}/transactions/${id}/status?status=${status}&role=${role}&note=${encodeURIComponent(note || '')}`, {
      method: 'PATCH'
    }));
  },

  // Fraud Events
  async getFraudEvents(): Promise<FraudEvent[]> {
    return handleResponse<FraudEvent[]>(await fetch(`${API_BASE}/fraud-events`));
  },
  async updateFraudStatus(id: number, status: string): Promise<FraudEvent> {
    return handleResponse<FraudEvent>(await fetch(`${API_BASE}/fraud-events/${id}/status?status=${status}`, {
      method: 'PATCH'
    }));
  },

  // Documents
  async getDocuments(search?: string): Promise<FinancialDocument[]> {
    const url = search ? `${API_BASE}/documents?search=${encodeURIComponent(search)}` : `${API_BASE}/documents`;
    return handleResponse<FinancialDocument[]>(await fetch(url));
  },
  async createDocument(doc: Partial<FinancialDocument>): Promise<FinancialDocument> {
    return handleResponse<FinancialDocument>(await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc)
    }));
  },

  // Investigations
  async getInvestigationCases(): Promise<InvestigationCase[]> {
    return handleResponse<InvestigationCase[]>(await fetch(`${API_BASE}/investigations`));
  },
  async getAnalysts(): Promise<Analyst[]> {
    return handleResponse<Analyst[]>(await fetch(`${API_BASE}/investigations/analysts`));
  },
  async updateCase(id: number, req: any): Promise<InvestigationCase> {
    return handleResponse<InvestigationCase>(await fetch(`${API_BASE}/investigations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req)
    }));
  },

  // DSA Algorithm Runner Endpoints
  async runDsaAlgorithm(algoEndpoint: string, requestPayload: any): Promise<AlgorithmResponse> {
    return handleResponse<AlgorithmResponse>(await fetch(`${API_BASE}/dsa/${algoEndpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestPayload || {})
    }));
  },

  async getRecentExecutions(): Promise<any[]> {
    return handleResponse<any[]>(await fetch(`${API_BASE}/dsa/executions`));
  }
};
