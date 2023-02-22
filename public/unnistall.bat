@echo off
if "%1"=="runas" (
 taskkill /IM "EL WAGYL App.exe"
 TIMEOUT /T 2
 del "%USERPROFILE%\Desktop\EL WAGYL App.lnk"
 reg delete "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\ELWAGYL" /f
 @RD /S /Q "C:\elwagyl"
 Msg * "Elwagyl Uninstall Success" 
 exit

) else (
  powershell Start -File "cmd '/K %~f0 runas'" -Verb RunAs
  exit
)

