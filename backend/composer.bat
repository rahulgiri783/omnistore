@echo off
setlocal

set "PHP82=D:\Projects\bin\php\php8.2.18\php.exe"
set "COMPOSER_HOME=C:\composer"

if not exist "%PHP82%" (
    echo PHP 8.2 not found at "%PHP82%".
    exit /b 1
)

if not exist "%COMPOSER_HOME%\composer.phar" (
    echo Composer phar not found at "%COMPOSER_HOME%\composer.phar".
    exit /b 1
)

set "PATH=D:\Projects\bin\php\php8.2.18;%PATH%"
"%PHP82%" "%COMPOSER_HOME%\composer.phar" %*
exit /b %ERRORLEVEL%
