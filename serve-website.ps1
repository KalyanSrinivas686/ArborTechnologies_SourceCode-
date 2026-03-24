# Quick Fix - Serve Production Build
# Run this script to serve the working production build of your website

Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "Arbor Technologies - Website Quick Fix Script" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop any running Node processes
Write-Host "[1/4] Stopping existing Node processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Write-Host "✓ Node processes stopped" -ForegroundColor Green
Write-Host ""

# Step 2: Build production version
Write-Host "[2/4] Building production version..." -ForegroundColor Yellow
Write-Host "This may take a minute..." -ForegroundColor Gray
npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Production build completed successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Step 3: Check if http-server is installed
Write-Host "[3/4] Checking for http-server..." -ForegroundColor Yellow
$httpServerInstalled = Get-Command http-server -ErrorAction SilentlyContinue
if (-not $httpServerInstalled) {
    Write-Host "Installing http-server globally..." -ForegroundColor Gray
    npm install -g http-server
}
Write-Host "✓ http-server is ready" -ForegroundColor Green
Write-Host ""

# Step 4: Serve the website
Write-Host "[4/4] Starting web server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "  🚀 YOUR WEBSITE IS NOW RUNNING!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "  Local:   http://localhost:8080" -ForegroundColor Cyan
Write-Host "  Network: http://127.0.0.1:8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""

# Start the server
Set-Location -Path "dist/frontend/browser"
http-server -p 8080 -o
