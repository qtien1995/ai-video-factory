$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

Write-Host ""
Write-Host "=== AI VIDEO FACTORY BOOTSTRAP ===" -ForegroundColor Cyan
Write-Host "Workspace: $Root"
Write-Host ""

function Require-Command {
    param(
        [string]$Name,
        [string]$HelpText
    )

    $cmd = Get-Command $Name -ErrorAction SilentlyContinue
    if (-not $cmd) {
        Write-Host "THIEU: $Name" -ForegroundColor Red
        Write-Host $HelpText
        exit 1
    }

    Write-Host "OK: $Name -> $($cmd.Source)" -ForegroundColor Green
}

Require-Command "node" "Hay cai Node.js LTS truoc, sau do chay lai bootstrap.ps1."
Require-Command "npm" "npm thuong duoc cai kem Node.js. Hay cai Node.js LTS truoc."

$git = Get-Command git -ErrorAction SilentlyContinue
if ($git) {
    Write-Host "OK: git -> $($git.Source)" -ForegroundColor Green
} else {
    Write-Host "CANH BAO: Khong tim thay git." -ForegroundColor Yellow
}

$folders = @(
    "projects",
    "prompts",
    "research",
    "creative-library",
    "rules",
    "assets\images",
    "assets\videos",
    "assets\audio",
    "scripts"
)

foreach ($folder in $folders) {
    $path = Join-Path $Root $folder
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path | Out-Null
    }
}

# 1. Cai dependency cho Core
$CoreDir = Join-Path $Root "core"
if (Test-Path $CoreDir) {
    Write-Host ""
    Write-Host "Dang cai dat dependencies cho Core..." -ForegroundColor Cyan
    Push-Location $CoreDir
    try {
        npm install
    }
    finally {
        Pop-Location
    }
}

# 2. Cai dependency cho Remotion Engine
$EngineDir = Join-Path $Root "engines\remotion"
if (Test-Path $EngineDir) {
    Write-Host ""
    Write-Host "Dang cai dat dependencies cho Remotion Engine..." -ForegroundColor Cyan
    Push-Location $EngineDir
    try {
        npm install
    }
    finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "HOAN TAT BOOTSTRAP WORKSPACE." -ForegroundColor Green
Write-Host ""
Write-Host "Cac lenh thao tac nhanh:"
Write-Host "1. Mo Remotion Studio:     npm run studio"
Write-Host "2. Chay Factory CLI:       npm run factory -- status --project <id>"
Write-Host "3. Kiem tra Type & Lint:   npm run typecheck"
Write-Host "4. Chay Unit Tests:        npm run test"
Write-Host "========================================" -ForegroundColor Green
