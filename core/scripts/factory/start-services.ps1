# ==============================================================================
# AI VIDEO FACTORY V3 - AUTO SERVICE LAUNCHER
# Khoi dong tu dong CIT Voice Studio (VieNeu-TTS AI :8001)
# ==============================================================================

$CitUrl = "http://127.0.0.1:8001"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   AI VIDEO FACTORY V3 - AUTO SERVICE LAUNCHER   " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# KIEM TRA CIT VOICE STUDIO (:8001)
Write-Host "Kiem tra CIT Voice Studio (VieNeu-TTS :8001)..." -ForegroundColor Yellow
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
        "$env:LOCALAPPDATA\Programs\CIT Voice Studio\CIT-Voice-Studio.exe",
        "$env:LOCALAPPDATA\Programs\CIT Voice Studio\CIT Voice Studio.exe",
        "$env:ProgramFiles\CIT Voice Studio\CIT-Voice-Studio.exe",
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
