@echo off
SETLOCAL
title download

for /f "skip=1 tokens=3 delims= " %%a in (
    'reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\ELWAGYL" /v echo NewVersion'
) do (
   set "NewVersion=%%~a"
) 

SET parent=%~dp0
FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
SET "sourcedir=%grandparent%" 
SET "keepfile=1.bat"
SET "keepdir=update_app"
echo "START DOWNLOAD FILES"

set URL=http://157.245.49.164:8080/update/elwagylUpdate/elwagyl-v-{%NewVersion%}.zip
set FileName=elwagyl.zip
Call :Download %URL% %FileName%
Start "" %FileName% & Exit
::*********************************************************************************
:Download <URL> <FILE>
powershell -Command "invoke-WebRequest %URL% -Outfile %FileName%"
@REM Powershell.exe -command "(New-Object System.Net.WebClient).DownloadFile('%1','%2')"
echo "DONE"
FOR /d %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepdir%" RD /S /Q "%%a"
FOR %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepfile%" DEL "%%a"
echo "START UPDATE"
powershell Start -File update.bat -Verb RunAs
taskkill /F /FI "WindowTitle eq download"

::*********************************************************************************