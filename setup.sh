#!/bin/bash

# SafeDrive Setup Script
# This script helps new developers set up the project quickly

echo "🚗 Setting up SafeDrive project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18+ first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if running on macOS for iOS setup
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 macOS detected - setting up iOS dependencies..."
    cd ios
    
    # Install Bundler if not present
    if ! command -v bundle &> /dev/null; then
        echo "Installing Ruby Bundler..."
        gem install bundler
    fi
    
    # Install Ruby gems
    bundle install
    
    # Install CocoaPods dependencies
    bundle exec pod install
    
    cd ..
else
    echo "🤖 Non-macOS detected - skipping iOS setup"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🔥 Next steps:"
echo "1. Set up your Firebase project (see README.md)"
echo "2. Replace android/app/google-services.json with your config"
echo "3. Run 'pnpm start' to start Metro"
echo "4. Run 'pnpm run android' or 'pnpm run ios'"
echo ""
echo "📖 For detailed instructions, see README.md"