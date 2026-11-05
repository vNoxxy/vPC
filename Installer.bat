@echo off
setlocal
title vPC - Installation
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\install.ps1" %*
echo.
pause
