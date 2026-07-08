@echo off
setlocal

call "%~dp0php82.cmd" "%~dp0artisan" %*
exit /b %ERRORLEVEL%
