# PowerShell script to start a docker container for a local development database
# Run this script after starting Docker Desktop

$ErrorActionPreference = "Stop"

# Load .env file
if (Test-Path .env) {
    Get-Content .env | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim().Trim('"').Trim("'")
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
} else {
    Write-Host "Error: .env file not found" -ForegroundColor Red
    exit 1
}

$DATABASE_URL = $env:DATABASE_URL
if (-not $DATABASE_URL) {
    Write-Host "Error: DATABASE_URL not found in .env file" -ForegroundColor Red
    exit 1
}

# Parse DATABASE_URL: postgresql://postgres:password@localhost:5432/start-app
if ($DATABASE_URL -match 'postgresql://([^:]+):([^@]+)@([^:]+):(\d+)/(.+)') {
    $DB_USER = $matches[1]
    $DB_PASSWORD = $matches[2]
    $DB_HOST = $matches[3]
    $DB_PORT = $matches[4]
    $DB_NAME = $matches[5]
} else {
    Write-Host "Error: Invalid DATABASE_URL format" -ForegroundColor Red
    exit 1
}

$DB_CONTAINER_NAME = "$DB_NAME-postgres"

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "Error: Docker daemon is not running. Please start Docker Desktop and try again." -ForegroundColor Red
    exit 1
}

# Check if port is already in use
$portInUse = Get-NetTCPConnection -LocalPort $DB_PORT -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "Port $DB_PORT is already in use." -ForegroundColor Yellow
    exit 1
}

# Check if container already exists and is running
$existingContainer = docker ps -a --filter "name=$DB_CONTAINER_NAME" --format "{{.Names}}" 2>$null
if ($existingContainer -eq $DB_CONTAINER_NAME) {
    $runningContainer = docker ps --filter "name=$DB_CONTAINER_NAME" --format "{{.Names}}" 2>$null
    if ($runningContainer -eq $DB_CONTAINER_NAME) {
        Write-Host "Database container '$DB_CONTAINER_NAME' is already running" -ForegroundColor Green
        exit 0
    } else {
        Write-Host "Starting existing database container '$DB_CONTAINER_NAME'..." -ForegroundColor Yellow
        docker start $DB_CONTAINER_NAME | Out-Null
        Write-Host "Database container '$DB_CONTAINER_NAME' started successfully" -ForegroundColor Green
        exit 0
    }
}

# Check if using default password
if ($DB_PASSWORD -eq "password") {
    $response = Read-Host "You are using the default database password. Should we generate a random password for you? [y/N]"
    if ($response -match '^[Yy]$') {
        # Generate a random URL-safe password
        $randomBytes = New-Object byte[] 12
        [System.Security.Cryptography.RandomNumberGenerator]::Fill($randomBytes)
        $DB_PASSWORD = [Convert]::ToBase64String($randomBytes) -replace '[+/]', '-'
        
        # Update .env file
        $envContent = Get-Content .env
        $envContent = $envContent -replace ":$DB_PASSWORD@", ":$DB_PASSWORD@"
        $envContent = $envContent -replace ":password@", ":$DB_PASSWORD@"
        $envContent | Set-Content .env
        Write-Host "Updated .env file with new password" -ForegroundColor Yellow
    } else {
        Write-Host "Please change the default password in the .env file and try again" -ForegroundColor Red
        exit 1
    }
}

# Create and start the container
Write-Host "Creating database container '$DB_CONTAINER_NAME'..." -ForegroundColor Yellow
docker run -d `
    --name $DB_CONTAINER_NAME `
    -e POSTGRES_USER=$DB_USER `
    -e POSTGRES_PASSWORD=$DB_PASSWORD `
    -e POSTGRES_DB=$DB_NAME `
    -p "${DB_PORT}:5432" `
    postgres:latest

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database container '$DB_CONTAINER_NAME' was successfully created" -ForegroundColor Green
    Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    Write-Host "Database is ready!" -ForegroundColor Green
} else {
    Write-Host "Failed to create database container" -ForegroundColor Red
    exit 1
}

