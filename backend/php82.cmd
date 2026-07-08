@echo off
setlocal

set "PHP82=D:\Projects\bin\php\php8.2.18\php.exe"

if not exist "%PHP82%" (
    echo PHP 8.2 not found at "%PHP82%".
    exit /b 1
)

if "%~1"=="" (
    "%PHP82%" -v
    exit /b %ERRORLEVEL%
)

"%PHP82%" %*
exit /b %ERRORLEVEL%
