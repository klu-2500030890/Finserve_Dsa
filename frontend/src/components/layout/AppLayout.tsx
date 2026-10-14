import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';
import { GlobalSearchModal } from './GlobalSearchModal';
import { DemoTourBanner } from './DemoTourBanner';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const AppLayout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#05070e] text-slate-100 overflow-hidden font-sans">
      {/* Global Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopNavbar onOpenSearch={() => setIsSearchOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>

      {/* Search & Tour Modals */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DemoTourBanner />
    </div>
  );
};
