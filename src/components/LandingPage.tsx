'use client';

import { CheckCircle, Calculator, TrendingUp, Shield, Clock, Users } from 'lucide-react';
import { useState } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Stop{' '}
            <span className="relative whitespace-nowrap text-blue-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70"
                preserveAspectRatio="none"
              >
                <path d="m203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.540-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">guessing</span>
            </span>{' '}
            your Amazon profit
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Get instant, accurate profit calculations for your Amazon FBA products. 
            Stop losing money to hidden fees you didn't know about.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900 text-lg px-8 py-3"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Profit Now
            </button>
            <button className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 text-lg px-8 py-3">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="text-center">
            <p className="text-base font-semibold text-slate-600">
              Trusted by Amazon sellers worldwide
            </p>
            <div className="mt-8 flex justify-center items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-2xl font-bold text-slate-900">1,000+</span>
                <span className="text-slate-600">sellers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <span className="text-2xl font-bold text-slate-900">50,000+</span>
                <span className="text-slate-600">calculations</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <span className="text-2xl font-bold text-slate-900">$2M+</span>
                <span className="text-slate-600">profit identified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              The Hidden Amazon Fees That Kill Your Profit
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Most sellers think they're profitable until they discover these hidden costs eating their margins
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Referral Fees',
                description: 'Varies by category from 8% to 20%. Most sellers use wrong rates.',
                impact: 'Can destroy 15%+ of your revenue',
              },
              {
                title: 'FBA Fees',
                description: 'Complex size and weight calculations that change frequently.',
                impact: '$3-$90 per unit depending on size',
              },
              {
                title: 'Storage Fees',
                description: 'Monthly storage costs that pile up, especially for slow movers.',
                impact: 'Can eat 20% of profit on slow items',
              },
            ].map((fee, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{fee.title}</h3>
                <p className="text-slate-600 mb-4">{fee.description}</p>
                <div className="text-red-600 font-medium text-sm">{fee.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Get Your Real Profit in 30 Seconds
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Our calculator uses the latest Amazon fee structure to give you accurate profit calculations instantly.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Accurate fee calculations using latest Amazon rates',
                  'Instant profit breakdown with visual indicators',
                  'Monthly profit projections',
                  'Profitable vs unprofitable verdicts',
                  'Save and compare multiple products',
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
                <div className="text-center">
                  <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Try it right now
                  </h3>
                  <p className="text-slate-600 mb-6">
                    See exactly how much profit you're really making
                  </p>
                  <button
                    onClick={onGetStarted}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                  >
                    Calculate My Profit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Everything You Need to Maximize Profit
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Calculator className="h-8 w-8" />,
                title: 'Instant Calculations',
                description: 'Get profit breakdown in under 30 seconds with our optimized calculator.',
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Always Accurate',
                description: 'We update our fee structure regularly to match Amazon\'s latest rates.',
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: 'Save Time',
                description: 'No more manual calculations or spreadsheet errors. Just instant results.',
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: 'Profit Optimization',
                description: 'Identify which products are actually profitable and which are losing money.',
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: 'Seller-Focused',
                description: 'Built by sellers, for sellers. We understand your pain points.',
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: 'Easy to Use',
                description: 'Simple interface that gets out of your way. No learning curve required.',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-900">Free</h3>
                <p className="mt-2 text-slate-600">Perfect for trying us out</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$0</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <button className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium py-3 px-4 rounded-lg transition-colors">
                  Get Started Free
                </button>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  '5 calculations per month',
                  'Basic profit breakdown',
                  'Fee calculations',
                  'Email support',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                Most Popular
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Pro</h3>
                <p className="mt-2 text-blue-100">For serious sellers</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$15</span>
                  <span className="text-blue-100">/month</span>
                </div>
                <button
                  onClick={onGetStarted}
                  className="mt-6 w-full bg-white hover:bg-slate-100 text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Start Pro Trial
                </button>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  'Unlimited calculations',
                  'Save & compare products',
                  'Profit history & analytics',
                  'Export to CSV',
                  'Priority support',
                  'Advanced metrics',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-white mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to see your real profit?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of sellers who stopped guessing and started knowing their numbers
          </p>
          <div className="mt-8">
            <button
              onClick={onGetStarted}
              className="bg-white hover:bg-slate-100 text-blue-600 font-medium py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}