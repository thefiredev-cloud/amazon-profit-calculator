# Amazon Profit Calculator - Micro SaaS

A simple, profitable micro SaaS that helps Amazon FBA sellers calculate their real profit with accurate fee calculations.

## 🎯 The Problem
Amazon sellers don't know their real profit. They see revenue but miss hidden fees like referral fees, FBA fees, and storage costs. Our calculator provides instant, accurate profit breakdowns.

## 🚀 Live Demo
Visit [localhost:3000](http://localhost:3000) to see the calculator in action.

## 💡 Key Features

### ✅ Completed Features
- **Accurate Fee Calculation Engine** - Uses latest Amazon fee structure
- **Instant Profit Calculator** - 30-second profit breakdown
- **Beautiful Landing Page** - Conversion-optimized design
- **Form Validation** - Robust input validation with Zod
- **Responsive Design** - Works on all devices
- **Profit Analysis** - Visual indicators for profitability

### 📋 Fee Calculations Include:
- **Referral Fees** (8-20% by category)
- **FBA Fulfillment Fees** (size/weight-based)
- **Storage Fees** (monthly storage costs)
- **Total Fee Breakdown**
- **Net Profit Analysis**
- **Profit Margin Calculation**
- **Monthly Profit Projections**

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe (planned)
- **Deployment**: Vercel

## 🚀 Quick Start

1. **Clone and install**:
   ```bash
   git clone <repository>
   cd amazon-profit-calculator
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Stripe Configuration (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 💰 Business Model

### Pricing Tiers
- **Free**: 5 calculations/month
- **Pro ($15/month)**: Unlimited calculations, save products, export data

### Revenue Projections
- **Target Market**: 100k+ Amazon FBA sellers
- **Conversion Rate**: 2-3% free to paid
- **Monthly Revenue Goal**: $10k-50k
- **Build Time**: 8-12 hours

## 📊 Competitive Advantages

1. **Accuracy First**: Most accurate fee calculations available
2. **Speed**: 30-second profit analysis
3. **Simplicity**: No learning curve required
4. **Mobile-First**: Works perfectly on phones
5. **Seller-Focused**: Built by sellers, for sellers

## 📦 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page with landing/calculator
├── components/
│   ├── LandingPage.tsx     # Marketing landing page
│   └── ProfitCalculator.tsx # Main calculator component
└── lib/
    ├── amazon-fees.ts      # Fee calculation engine
    └── supabase.ts         # Database configuration
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for consistent styling
- Zod for runtime validation

## 📈 Next Steps

### Phase 1 (Completed)
- ✅ Core calculator functionality
- ✅ Landing page design
- ✅ Fee calculation engine
- ✅ Form validation

### Phase 2 (In Progress)
- [ ] Supabase database setup
- [ ] User authentication
- [ ] Save calculations feature
- [ ] User dashboard

### Phase 3 (Planned)
- [ ] Stripe payment integration
- [ ] Subscription management
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Export functionality

### Phase 4 (Future)
- [ ] Bulk calculator
- [ ] API access
- [ ] Mobile app
- [ ] Advanced analytics

## 🎯 Marketing Strategy

### Primary Channels
1. **SEO**: Target "Amazon FBA calculator" keywords
2. **Amazon Seller Forums**: Provide value, build trust
3. **YouTube**: Create tutorial videos
4. **Facebook Groups**: Join seller communities
5. **Content Marketing**: Blog about Amazon selling tips

### Key Messages
- "See your REAL Amazon profit in 30 seconds"
- "Stop guessing if your products are profitable"
- "Tired of hidden fees eating your margins?"

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎉 Success Metrics

- **User Acquisition**: 1000+ monthly active users
- **Conversion Rate**: 3%+ free to paid
- **Monthly Revenue**: $15k+ by month 6
- **User Retention**: 80%+ monthly retention

---

**Built with ❤️ for Amazon sellers who want to know their real numbers.**