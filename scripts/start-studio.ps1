$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$Project = Join-Path $Root "engines\remotion"

if (-not (Test-Path $Project)) {
    Write-Host "Khong tim thay Remotion engine: $Project" -ForegroundColor Red
    Write-Host "Hay chay bootstrap.ps1 truoc."
    exit 1
}

Set-Location $Project
Write-Host "Khoi dong Remotion Studio tai engines/remotion..." -ForegroundColor Green
npx remotion studio --no-open
