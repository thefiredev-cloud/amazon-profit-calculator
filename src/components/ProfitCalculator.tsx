'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calculator, DollarSign, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateProfitBreakdown, isProfitable, getCategories, type FeeBreakdown } from '@/lib/amazon-fees';

// Form validation schema
const calculatorSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  price: z.number().min(0.01, 'Price must be greater than $0'),
  category: z.string().min(1, 'Category is required'),
  weight: z.number().min(0.01, 'Weight must be greater than 0'),
  length: z.number().min(0.1, 'Length must be greater than 0'),
  width: z.number().min(0.1, 'Width must be greater than 0'),
  height: z.number().min(0.1, 'Height must be greater than 0'),
  cogs: z.number().min(0, 'Cost of goods must be $0 or greater'),
  monthlyUnits: z.number().int().min(1, 'Monthly units must be at least 1'),
});

type CalculatorFormData = z.infer<typeof calculatorSchema>;

export default function ProfitCalculator() {
  const [results, setResults] = useState<FeeBreakdown | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      productName: '',
      price: 0,
      category: '',
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      cogs: 0,
      monthlyUnits: 1,
    },
  });

  const onSubmit = async (data: CalculatorFormData) => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const breakdown = calculateProfitBreakdown({
      price: data.price,
      category: data.category,
      dimensions: {
        length: data.length,
        width: data.width,
        height: data.height,
        weight: data.weight,
      },
      cogs: data.cogs,
      monthlyUnits: data.monthlyUnits,
    });
    
    setResults(breakdown);
    setIsCalculating(false);
  };

  const categories = getCategories();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Amazon Profit Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Calculate your real Amazon FBA profit with accurate fee calculations. 
          Stop guessing if your products are profitable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Package className="h-5 w-5 mr-2 text-blue-600" />
            Product Information
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                {...register('productName')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Wireless Bluetooth Headphones"
              />
              {errors.productName && (
                <p className="text-red-600 text-sm mt-1">{errors.productName.message}</p>
              )}
            </div>

            {/* Price and COGS */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="29.99"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost of Goods ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register('cogs', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="12.50"
                />
                {errors.cogs && (
                  <p className="text-red-600 text-sm mt-1">{errors.cogs.message}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                {...register('category')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimensions (inches)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  step="0.1"
                  {...register('length', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Length"
                />
                <input
                  type="number"
                  step="0.1"
                  {...register('width', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Width"
                />
                <input
                  type="number"
                  step="0.1"
                  {...register('height', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Height"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mt-1">
                <span>Length</span>
                <span>Width</span>
                <span>Height</span>
              </div>
              {(errors.length || errors.width || errors.height) && (
                <p className="text-red-600 text-sm mt-1">All dimensions are required</p>
              )}
            </div>

            {/* Weight and Monthly Units */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('weight', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1.5"
                />
                {errors.weight && (
                  <p className="text-red-600 text-sm mt-1">{errors.weight.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Units Sold
                </label>
                <input
                  type="number"
                  {...register('monthlyUnits', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                />
                {errors.monthlyUnits && (
                  <p className="text-red-600 text-sm mt-1">{errors.monthlyUnits.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Profit
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-600" />
            Profit Breakdown
          </h2>
          
          {results ? <ProfitResults results={results} /> : <ProfitPlaceholder />}
        </div>
      </div>
    </div>
  );
}

function ProfitResults({ results }: { results: FeeBreakdown }) {
  const profitStatus = isProfitable(results);
  
  return (
    <div className="space-y-4">
      {/* Verdict */}
      <div className={`p-4 rounded-lg border-2 ${
        profitStatus.color === 'green' ? 'bg-green-50 border-green-200' :
        profitStatus.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
        'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center">
          {profitStatus.isProfit ? (
            <TrendingUp className={`h-5 w-5 mr-2 ${
              profitStatus.color === 'green' ? 'text-green-600' : 'text-yellow-600'
            }`} />
          ) : (
            <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
          )}
          <span className={`font-semibold ${
            profitStatus.color === 'green' ? 'text-green-800' :
            profitStatus.color === 'yellow' ? 'text-yellow-800' :
            'text-red-800'
          }`}>
            {profitStatus.verdict}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Net Profit per Unit</div>
          <div className={`text-lg font-semibold ${
            results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${results.netProfit.toFixed(2)}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Profit Margin</div>
          <div className={`text-lg font-semibold ${
            results.profitMargin >= 15 ? 'text-green-600' : 
            results.profitMargin >= 0 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {results.profitMargin.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900">Fee Breakdown</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Referral Fee:</span>
            <span className="font-medium">${results.referralFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">FBA Fee:</span>
            <span className="font-medium">${results.fbaFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Storage Fee:</span>
            <span className="font-medium">${results.storageFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-1 font-semibold">
            <span>Total Fees:</span>
            <span>${results.totalFees.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Monthly Projection */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="text-sm text-blue-600 font-medium">Monthly Profit Projection</div>
        <div className={`text-xl font-bold ${
          results.monthlyProfit >= 0 ? 'text-blue-800' : 'text-red-600'
        }`}>
          ${results.monthlyProfit.toFixed(2)}
        </div>
      </div>

      {/* Save Button */}
      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
        Save This Calculation
      </button>
    </div>
  );
}

function ProfitPlaceholder() {
  return (
    <div className="text-center text-gray-500 py-12">
      <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p>Enter product details to see your profit breakdown</p>
    </div>
  );
}