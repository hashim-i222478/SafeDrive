@echo off
REM SafeDrive Setup Script for Windows
REM This script helps new developers set up the project quickly

echo 🚗 Setting up SafeDrive project...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18+ first.
    exit /b 1
)

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing pnpm...
    npm install -g pnpm
)

REM Install dependencies
echo 📦 Installing dependencies...
pnpm install

echo.
echo ✅ Setup complete!
echo.
echo 🔥 Next steps:
echo 1. Set up your Firebase project (see README.md)
echo 2. Replace android/app/google-services.json with your config
echo 3. Run 'pnpm start' to start Metro
echo 4. Run 'pnpm run android'
echo.
echo 📖 For detailed instructions, see README.md