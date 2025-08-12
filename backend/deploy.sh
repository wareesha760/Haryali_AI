#!/bin/bash

echo "🚀 Kisaan Bot Backend - Vercel Deployment Script"
echo "================================================"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found. Make sure you're in the backend directory."
    exit 1
fi

echo "✅ Backend files found"
echo "📦 Installing dependencies..."

# Install dependencies
npm install

echo "🌐 Starting deployment..."

# Deploy to Vercel
vercel --prod

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set environment variables in Vercel dashboard:"
echo "   - MONGO_URI"
echo "   - JWT_SECRET"
echo "   - HF_TOKEN"
echo "2. Update your frontend API URLs"
echo "3. Test your endpoints"
echo ""
echo "🔗 Check VERCEL_DEPLOYMENT.md for detailed instructions"
