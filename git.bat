@echo off

REM Get the current date and time
SET TIMESTAMP=%DATE%_%TIME%
SET TIMESTAMP=%TIMESTAMP:/=-%
SET TIMESTAMP=%TIMESTAMP::=-%

REM Get the current user's home directory
SET USER_DIR=%USERPROFILE%
SET PROGRAM_FILES=%ProgramFiles%
echo %PROGRAM_FILES%
"%PROGRAM_FILES%\Git\bin\git.exe" add .
"%PROGRAM_FILES%\Git\bin\git.exe" commit -am "%USERNAME%_%TIMESTAMP%"
"%PROGRAM_FILES%\Git\bin\git.exe" push origin main
