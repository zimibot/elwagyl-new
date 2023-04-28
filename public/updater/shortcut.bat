@echo off
setlocal
SET parent=%~dp0
FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
set "ShortcutName=EL WAGYL App"
set "TargetPath=%grandparent%EL WAGYL App.exe"
set "IconLocation=%grandparent%icon.ico"

set "DesktopPath=%USERPROFILE%\Desktop"
set "ShortcutFile=%DesktopPath%\%ShortcutName%.lnk"

if exist "%ShortcutFile%" del "%ShortcutFile%"

set "VBScriptFile=%temp%\CreateShortcut.vbs"

>"%VBScriptFile%" (
    echo Set oWS = WScript.CreateObject^("WScript.Shell"^)
    echo sLinkFile = "%ShortcutFile%"
    echo Set oLink = oWS.CreateShortcut(sLinkFile)
    echo oLink.TargetPath = "%TargetPath%"
    echo oLink.IconLocation = "%IconLocation%"
    echo oLink.Save
)

cscript //nologo "%VBScriptFile%"

if exist "%VBScriptFile%" del "%VBScriptFile%"