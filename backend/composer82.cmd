@echo off
setlocal

call "%~dp0php82.cmd" "C:\composer\composer.phar" %*
exit /b %ERRORLEVEL%
