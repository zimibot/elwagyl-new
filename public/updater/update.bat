@echo off
setlocal
title update
SET parent=%~dp0
FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
SET "sourcedir=%grandparent%" 
SET "keepfile=icon.ico"
SET "keepdir=updater"
FOR /d %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepdir%" RD /S /Q "%%a"
FOR %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepfile%" DEL /f /q /s "%%a"2>NUL
echo %ERRORLEVEL%
if %ERRORLEVEL% neq 0 goto ProcessError
 powershell -windowstyle hidden -command "& { $shell = New-Object -COM Shell.Application; $target = $shell.NameSpace('%grandparent%'); $zip = $shell.NameSpace('%~dp0files\update.zip'); $target.CopyHere($zip.Items(), 16);}"
 CALL run-exe.bat
 CALL shortcut.bat
exit /b 0
:ProcessError
  echo "ERROR"
exit /b 1


