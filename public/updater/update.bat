@echo off
setlocal
title update
set "temp_dir=%TEMP%"
SET "keepfile=icon.ico"
SET "keepdir=updater"

SET "sourcedir=C:\ELWAGYL" 
SET "TargetPath=C:\ELWAGYL\EL WAGYL App.exe"
IF EXIST "%sourcedir%" (
    FOR /d %%A IN ("%sourcedir%\*") DO RD /S /Q "%%A"
    FOR %%A IN ("%sourcedir%\*") DO DEL /F /Q "%%A"
    powershell  -WindowStyle Hidden -Command "& { $shell = New-Object -COM Shell.Application; $target = $shell.NameSpace('%sourcedir%'); $zip = $shell.NameSpace('%temp_dir%\updater\files\update.zip'); $target.CopyHere($zip.Items(), 16);}"
    START "" "%TargetPath%"
    del "%temp_dir%\updater\files\update.zip"
) 
