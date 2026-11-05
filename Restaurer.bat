@echo off
setlocal
title vPC - Restauration
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\restore.ps1" %*
echo.
pause
