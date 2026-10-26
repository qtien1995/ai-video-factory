@echo off
chcp 65001 > nul
title AI Video Factory — Khởi động Services
echo ==================================================
echo   AI VIDEO FACTORY V3 — KHỞI ĐỘNG CÁC DỊCH VỤ
echo ==================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0core\scripts\factory\start-services.ps1"
echo.
pause
