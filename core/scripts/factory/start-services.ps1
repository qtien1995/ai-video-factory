# ==============================================================================
# AI VIDEO FACTORY V2 - AUTO SERVICE LAUNCHER
# Khoi dong tu dong FlowKit Backend, Google Flow Tab va CIT Voice Studio
# ==============================================================================

$Root = "D:\AI\VIDEO AI"
$CitUrl = "http://127.0.0.1:8001"
$FlowUrl = "http://127.0.0.1:8100/health"
$GoogleFlowUrl = "https://flow.google.com/"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   AI VIDEO FACTORY V2 - AUTO SERVICE LAUNCHER   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# 1. FLOWKIT BACKEND (:8100)
Write-Host "[1/3] Kiem tra FlowKit Backend (:8100)..." -ForegroundColor Yellow
$flowOnline = $false
try {
    $res = Invoke-RestMethod -Uri $FlowUrl -TimeoutSec 2 -ErrorAction Stop
    $flowOnline = $true
} catch {
    $flowOnline = $false
}

if ($flowOnline) {
    Write-Host "  -> FlowKit Backend da chay san sang." -ForegroundColor Green
} else {
    Write-Host "  -> Dang khoi dong FlowKit Backend tren cong 8100..." -ForegroundColor Cyan
    $pythonExe = "$Root\.tools\flowkit\venv\Scripts\python.exe"
    $flowDir = "$Root\.tools\flowkit"
    if (Test-Path $pythonExe) {
        Start-Process -FilePath $pythonExe -ArgumentList "-m agent.main" -WorkingDirectory $flowDir -WindowStyle Minimized
        Start-Sleep -Seconds 3
        Write-Host "  -> FlowKit Backend da duoc khoi dong!" -ForegroundColor Green
    } else {
        Write-Host "  -> [ERROR] Khong tim thay Python tai $pythonExe" -ForegroundColor Red
    }
}

# 2. GOOGLE FLOW TAB (CHROME)
Write-Host "`n[2/3] Mo Google Flow tren trinh duyet..." -ForegroundColor Yellow
try {
    Start-Process $GoogleFlowUrl
    Write-Host "  -> Da mo $GoogleFlowUrl (Extension FlowKit se tu dong ket noi)." -ForegroundColor Green
} catch {
    Write-Host "  -> [WARN] Khong the mo trinh duyet tu dong." -ForegroundColor Yellow
}

# 3. CIT VOICE STUDIO (:8001)
Write-Host "`n[3/3] Kiem tra CIT Voice Studio (:8001)..." -ForegroundColor Yellow
$citOnline = $false
try {
    $res = Invoke-RestMethod -Uri $CitUrl -TimeoutSec 2 -ErrorAction Stop
    $citOnline = $true
} catch {
    $citOnline = $false
}

if ($citOnline) {
    Write-Host "  -> CIT Voice Studio da online san sang tai $CitUrl." -ForegroundColor Green
} else {
    Write-Host "  -> Dang tim kiem ung dung CIT Voice Studio..." -ForegroundColor Cyan
    $citExeCandidates = @(
        "$env:LOCALAPPDATA\Programs\CIT Voice Studio\CIT Voice Studio.exe",
        "$env:ProgramFiles\CIT Voice Studio\CIT Voice Studio.exe",
        "D:\AI\CIT-Voice-Studio-v1.0.3-win-x86_64.exe"
    )

    $startedCit = $false
    foreach ($exe in $citExeCandidates) {
        if (Test-Path $exe) {
            Write-Host "  -> Tim thay ung dung tai: $exe" -ForegroundColor Cyan
            Write-Host "  -> Dang mo CIT Voice Studio..." -ForegroundColor Cyan
            try {
                Start-Process -FilePath $exe
                $startedCit = $true
                break
            } catch {
                Write-Host "  -> Khong the khoi chay $($exe): $_" -ForegroundColor Yellow
            }
        }
    }

    if (-not $startedCit) {
        Write-Host "  -> [HUONG DAN] Vui long nhap dup chuot mo bieu tuong 'CIT Voice Studio' tren man hinh Desktop de bat server :8001." -ForegroundColor Yellow
    } else {
        Write-Host "  -> Da gui lenh khoi chay CIT Voice Studio. Vui long doi 5-10 giay de server khoi tao xong." -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   HOAN TAT! He thong da san sang san xuat video  " -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
