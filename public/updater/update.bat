@echo off
setlocal
title update
powershell -command "Start-Sleep -s 3"
SET parent=%~dp0

FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
SET "sourcedir=%grandparent%" 
SET "keepfile=1.bat"
SET "keepdir=updater"
FOR /d %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepdir%" RD /S /Q "%%a"
FOR %%a IN ("%sourcedir%\*") DO IF /i NOT "%%~nxa"=="%keepfile%" DEL "%%a"

cd /d %~dp0
Call :UnZipFile "%grandparent%" "%~dp0files\update.zip"
exit /b

:UnZipFile <ExtractTo> <newzipfile>
set vbs="%temp%\_.vbs"

if exist %vbs% del /f /q %vbs%
>%vbs%  echo Set fso = CreateObject("Scripting.FileSystemObject")
>>%vbs% echo If NOT fso.FolderExists(%1) Then
>>%vbs% echo fso.CreateFolder(%1)
>>%vbs% echo End If
>>%vbs% echo set objShell = CreateObject("Shell.Application")
>>%vbs% echo set FilesInZip=objShell.NameSpace(%2).items
>>%vbs% echo objShell.NameSpace(%1).CopyHere(FilesInZip)
>>%vbs% echo Set fso = Nothing
>>%vbs% echo Set objShell = Nothing

cscript //nologo %vbs%
if exist %vbs% del /f /q %vbs%
start "windowTitle" "%grandparent%EL WAGYL App.exe"
del "%~dp0files\update.zip"
taskkill /F /FI "WindowTitle eq update"

