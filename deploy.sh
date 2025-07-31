#!/bin/bash

# Amazon Profit Calculator Deployment Script
echo "🚀 Amazon Profit Calculator Deployment"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if build is successful
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Check environment variables
echo "🔍 Checking environment variables..."

if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found. Copying from .env.example..."
    cp .env.example .env.local
    echo "📝 Please edit .env.local with your actual values:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - STRIPE keys (for payments)"
fi

# Production checklist
echo ""
echo "📋 Pre-deployment Checklist:"
echo "============================"
echo "1. ✅ Dependencies installed"
echo "2. ✅ Build successful"
echo "3. [ ] Environment variables configured (.env.local)"
echo "4. [ ] Supabase project created and schema deployed"
echo "5. [ ] Stripe account connected (for payments)"
echo "6. [ ] Domain configured (if using custom domain)"

echo ""
echo "🔄 Next Steps:"
echo "=============="
echo "1. Set up Supabase:"
echo "   - Create a new project at https://supabase.com"
echo "   - Run the SQL from supabase-schema.sql in the SQL editor"
echo "   - Copy your project URL and anon key to .env.local"
echo ""
echo "2. Deploy to Vercel:"
echo "   - npm install -g vercel"
echo "   - vercel login"
echo "   - vercel --prod"
echo ""
echo "3. Set up Stripe (for payments):"
echo "   - Create account at https://stripe.com"
echo "   - Get your publishable and secret keys"
echo "   - Add them to your environment variables"

echo ""
echo "🎉 Ready for deployment!"
echo "Run 'npm run dev' to test locally first."