'use client';

import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import ProfitCalculator from '@/components/ProfitCalculator';

export default function Home() {
  const [showCalculator, setShowCalculator] = useState(false);

  if (showCalculator) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => setShowCalculator(false)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to homepage
          </button>
        </div>
        <ProfitCalculator />
      </main>
    );
  }

  return <LandingPage onGetStarted={() => setShowCalculator(true)} />;
}
