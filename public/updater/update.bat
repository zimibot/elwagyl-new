@echo off
setlocal
title update
SET parent=%~dp0
FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
echo %grandparent%
@REM SET "sourcedir=%grandparent%" 
@REM SET "keepfile=icon.ico"
@REM SET "keepdir=updater"
@REM FOR /d %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepdir%" RD /S /Q "%%a"
@REM FOR %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepfile%" DEL /f /q /s "%%a"2>NUL
@REM powershell -windowstyle hidden -nologo -noprofile -command "& { $shell = New-Object -COM Shell.Application; $target = $shell.NameSpace('%grandparent%'); $zip = $shell.NameSpace('%~dp0files\update.zip'); $target.CopyHere($zip.Items(), 16); }"
@REM powershell -command "Start-Sleep -s 2"
@REM CALL shortcut.bat
@REM Start "ELWAGYL RUN" "%grandparent%EL WAGYL App.exe"
@REM taskkill /F /FI "WindowTitle eq update"

