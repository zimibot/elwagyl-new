@echo off

REM Get the current date and time
SET TIMESTAMP=%DATE%_%TIME%
SET TIMESTAMP=%TIMESTAMP:/=-%
SET TIMESTAMP=%TIMESTAMP::=-%

REM Get the current user's home directory
SET USER_DIR=%USERPROFILE%

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -am "%USERNAME%_%TIMESTAMP%"
"C:\Program Files\Git\bin\git.exe" push origin main
