import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DemoProvider } from './context/DemoContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

// Financial Data Pages
import { CustomersPage } from './pages/financial/CustomersPage';
import { AccountsPage } from './pages/financial/AccountsPage';
import { TransactionsPage } from './pages/financial/TransactionsPage';
import { TransactionDetailPage } from './pages/financial/TransactionDetailPage';
import { DocumentsPage } from './pages/financial/DocumentsPage';
import { FraudEventsPage } from './pages/financial/FraudEventsPage';
import { InvestigationCasesPage } from './pages/financial/InvestigationCasesPage';

// DSA Lab Pages
import { DsaLabPage } from './pages/dsa/DsaLabPage';
import { DsaModulePage } from './pages/dsa/DsaModulePage';

// Analytics Pages
import { NetworkExplorerPage } from './pages/analytics/NetworkExplorerPage';
import { AlgorithmPerformancePage } from './pages/analytics/AlgorithmPerformancePage';
import { StreamAnalyticsPage } from './pages/analytics/StreamAnalyticsPage';
import { ReportsPage } from './pages/analytics/ReportsPage';

// System Pages
import { WhyThisAlgorithmPage } from './pages/system/WhyThisAlgorithmPage';
import { AboutPage } from './pages/system/AboutPage';
import { SettingsPage } from './pages/system/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DemoProvider>
          <Routes>
            {/* Public Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Application Main Layout with Nested Protected Routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Financial Data Routes */}
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/transactions/:id" element={<TransactionDetailPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/fraud-events" element={<FraudEventsPage />} />
              <Route path="/investigations" element={<InvestigationCasesPage />} />

              {/* DSA Lab Routes */}
              <Route path="/dsa" element={<DsaLabPage />} />
              <Route path="/dsa/:moduleId" element={<DsaModulePage />} />

              {/* Analytics Routes */}
              <Route path="/network-explorer" element={<NetworkExplorerPage />} />
              <Route path="/performance" element={<AlgorithmPerformancePage />} />
              <Route path="/stream-analytics" element={<StreamAnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage />} />

              {/* System Routes */}
              <Route path="/why-this-algorithm" element={<WhyThisAlgorithmPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </DemoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
