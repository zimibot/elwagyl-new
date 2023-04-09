@echo off
setlocal
SET parent=%~dp0
Set "ShortcutName=EL WAGYL App"
FOR %%a IN ("%parent:~0,-1%") DO SET grandparent=%%~dpa
Set "TargetPath=%grandparent%\EL WAGYL App.exe"
Set "IconLocation=%grandparent%\icon.ico"
IF EXIST "%USERPROFILE%\Desktop\EL WAGYL App.lnk" (
  del "%USERPROFILE%\Desktop\EL WAGYL App.lnk"
   Call :Create_Shortcut "%ShortcutName%" "%TargetPath%" "%IconLocation%"
    EXIT
    :Create_Shortcut
    Set "VBS_Shortcut=%temp%\%~n0.vbs"
    >"%VBS_Shortcut%" (
        echo    Call Create_Shortcut("%~1","%~2","%~3"^)
        echo    Sub Create_Shortcut(ShortcutName,TargetPath,IconLocation^)
        echo        Dim objShell,DesktopPath,objShortCut
        echo        Set objShell = CreateObject("WScript.Shell"^)
        echo        DesktopPath = objShell.SpecialFolders("Desktop"^)
        echo        Set objShortCut = objShell.CreateShortcut(DesktopPath ^& "\" ^& ShortcutName ^& ".lnk"^)
        echo        objShortCut.TargetPath = chr(34^) ^& TargetPath ^& chr(34^)
        echo        objShortCut.IconLocation="%~3"
        echo        objShortCut.Save
        echo    End Sub
    )
    cscript //nologo "%VBS_Shortcut%" "%~1" "%~2" "%~3"
    If Exist "%VBS_Shortcut%" Del "%VBS_Shortcut%" 
) ELSE (
  Call :Create_Shortcut "%ShortcutName%" "%TargetPath%" "%IconLocation%"
    EXIT
    :Create_Shortcut
    Set "VBS_Shortcut=%temp%\%~n0.vbs"
    >"%VBS_Shortcut%" (
        echo    Call Create_Shortcut("%~1","%~2","%~3"^)
        echo    Sub Create_Shortcut(ShortcutName,TargetPath,IconLocation^)
        echo        Dim objShell,DesktopPath,objShortCut
        echo        Set objShell = CreateObject("WScript.Shell"^)
        echo        DesktopPath = objShell.SpecialFolders("Desktop"^)
        echo        Set objShortCut = objShell.CreateShortcut(DesktopPath ^& "\" ^& ShortcutName ^& ".lnk"^)
        echo        objShortCut.TargetPath = chr(34^) ^& TargetPath ^& chr(34^)
        echo        objShortCut.IconLocation="%~3"
        echo        objShortCut.Save
        echo    End Sub
    )
    cscript //nologo "%VBS_Shortcut%" "%~1" "%~2" "%~3"
    If Exist "%VBS_Shortcut%" Del "%VBS_Shortcut%"     
)

