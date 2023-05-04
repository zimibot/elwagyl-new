@echo off
FOR /F "tokens=1-3 delims=/ " %%A IN ('DATE /T') DO (
    SET DAY=%%A
    SET MONTH=%%B
    SET YEAR=%%C
)

REM Add 2000 to the year if it's less than 100
IF %YEAR% LSS 100 SET YEAR=20%YEAR%

REM Get the current year
SET /A CURRENT_YEAR=%DATE:~10,4%

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -am 'funtsu_%DAY%_%MONTH%_%CURRENT_YEAR%'
"C:\Program Files\Git\bin\git.exe" push origin main
