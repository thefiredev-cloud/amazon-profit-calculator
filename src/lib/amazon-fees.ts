/**
 * Amazon FBA Fee Calculation Engine
 * Based on current Amazon fee structure (2024)
 */

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface ProductData {
  price: number;
  category: string;
  dimensions: ProductDimensions;
  cogs: number;
  monthlyUnits: number;
}

export interface FeeBreakdown {
  referralFee: number;
  fbaFee: number;
  storageFee: number;
  totalFees: number;
  netProfit: number;
  profitMargin: number;
  monthlyProfit: number;
}

// Amazon referral fees by category (as percentages)
export const CATEGORY_FEES: Record<string, number> = {
  'Electronics': 0.08,
  'Computers': 0.08,
  'Cell Phones & Accessories': 0.08,
  'Home & Kitchen': 0.15,
  'Home & Garden': 0.15,
  'Clothing & Accessories': 0.17,
  'Shoes': 0.15,
  'Sports & Outdoors': 0.15,
  'Toys & Games': 0.15,
  'Baby Products': 0.15,
  'Health & Personal Care': 0.15,
  'Beauty & Personal Care': 0.15,
  'Grocery & Gourmet Food': 0.15,
  'Books': 0.15,
  'Music': 0.15,
  'Video Games': 0.15,
  'Software': 0.15,
  'Automotive': 0.12,
  'Tools & Home Improvement': 0.15,
  'Jewelry': 0.20,
  'Watches': 0.16,
  'Luggage & Travel Gear': 0.15,
  'Industrial & Scientific': 0.12,
  'Pet Supplies': 0.15,
  'Office Products': 0.15,
  'Everything Else': 0.15,
};

// FBA fulfillment fees by size tier
interface FBAFeeTier {
  name: string;
  maxWeight: number;
  maxLength: number;
  maxWidth: number;
  maxHeight: number;
  baseFee: number;
  perPoundFee: number;
}

export const FBA_SIZE_TIERS: FBAFeeTier[] = [
  {
    name: 'Small Standard',
    maxWeight: 1.0,
    maxLength: 15,
    maxWidth: 12,
    maxHeight: 0.75,
    baseFee: 3.22,
    perPoundFee: 0.0,
  },
  {
    name: 'Large Standard',
    maxWeight: 1.0,
    maxLength: 18,
    maxWidth: 14,
    maxHeight: 8,
    baseFee: 4.75,
    perPoundFee: 0.0,
  },
  {
    name: 'Large Standard (1+ lb)',
    maxWeight: 20,
    maxLength: 18,
    maxWidth: 14,
    maxHeight: 8,
    baseFee: 4.75,
    perPoundFee: 0.96,
  },
  {
    name: 'Large Bulky',
    maxWeight: 50,
    maxLength: 59,
    maxWidth: 33,
    maxHeight: 33,
    baseFee: 9.73,
    perPoundFee: 0.83,
  },
  {
    name: 'Extra-Large 0-70 lb',
    maxWeight: 70,
    maxLength: 108,
    maxWidth: 33,
    maxHeight: 33,
    baseFee: 19.05,
    perPoundFee: 0.83,
  },
  {
    name: 'Extra-Large 70+ lb',
    maxWeight: 150,
    maxLength: 108,
    maxWidth: 33,
    maxHeight: 33,
    baseFee: 89.98,
    perPoundFee: 0.83,
  },
];

/**
 * Calculate the volume of a product in cubic inches
 */
function calculateVolume(dimensions: ProductDimensions): number {
  return dimensions.length * dimensions.width * dimensions.height;
}

/**
 * Determine which FBA size tier a product belongs to
 */
function determineSizeTier(dimensions: ProductDimensions): FBAFeeTier {
  const { length, width, height, weight } = dimensions;
  
  for (const tier of FBA_SIZE_TIERS) {
    if (
      weight <= tier.maxWeight &&
      length <= tier.maxLength &&
      width <= tier.maxWidth &&
      height <= tier.maxHeight
    ) {
      return tier;
    }
  }
  
  // If it doesn't fit any tier, use the largest one
  return FBA_SIZE_TIERS[FBA_SIZE_TIERS.length - 1];
}

/**
 * Calculate FBA fulfillment fee
 */
function calculateFBAFee(dimensions: ProductDimensions): number {
  const tier = determineSizeTier(dimensions);
  const additionalWeight = Math.max(0, dimensions.weight - 1);
  
  return tier.baseFee + (additionalWeight * tier.perPoundFee);
}

/**
 * Calculate monthly storage fee
 */
function calculateStorageFee(dimensions: ProductDimensions, monthlyUnits: number): number {
  const volume = calculateVolume(dimensions);
  const cubicFeet = volume / 1728; // Convert cubic inches to cubic feet
  
  // Standard storage rates (varies by season)
  const storageRatePerCubicFoot = 0.87; // Average rate
  
  return cubicFeet * storageRatePerCubicFoot * monthlyUnits;
}

/**
 * Get referral fee rate for a category
 */
function getCategoryFee(category: string): number {
  return CATEGORY_FEES[category] || CATEGORY_FEES['Everything Else'];
}

/**
 * Main function to calculate all Amazon fees and profit
 */
export function calculateProfitBreakdown(product: ProductData): FeeBreakdown {
  // Calculate individual fees
  const referralFee = product.price * getCategoryFee(product.category);
  const fbaFee = calculateFBAFee(product.dimensions);
  const storageFee = calculateStorageFee(product.dimensions, product.monthlyUnits);
  
  // Calculate totals
  const totalFees = referralFee + fbaFee + (storageFee / product.monthlyUnits);
  const netProfit = product.price - product.cogs - totalFees;
  const profitMargin = (netProfit / product.price) * 100;
  const monthlyProfit = netProfit * product.monthlyUnits;
  
  return {
    referralFee,
    fbaFee,
    storageFee: storageFee / product.monthlyUnits, // Per unit storage fee
    totalFees,
    netProfit,
    profitMargin,
    monthlyProfit,
  };
}

/**
 * Check if a product is profitable based on common thresholds
 */
export function isProfitable(breakdown: FeeBreakdown): {
  isProfit: boolean;
  verdict: string;
  color: 'green' | 'yellow' | 'red';
} {
  if (breakdown.netProfit <= 0) {
    return {
      isProfit: false,
      verdict: 'Losing Money',
      color: 'red',
    };
  }
  
  if (breakdown.profitMargin < 15) {
    return {
      isProfit: true,
      verdict: 'Low Margin',
      color: 'yellow',
    };
  }
  
  return {
    isProfit: true,
    verdict: 'Good Profit',
    color: 'green',
  };
}

/**
 * Get all available categories for dropdown
 */
export function getCategories(): string[] {
  return Object.keys(CATEGORY_FEES).sort();
}