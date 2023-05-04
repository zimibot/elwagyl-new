@echo off
FOR /F "tokens=1-3 delims=/ " %%A IN ('DATE /T') DO (
    SET DAY=%%A
    SET MONTH=%%B
    SET YEAR=%%C
)
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -am 'funtsu_%DAY%_%MONTH%_%YEAR%'
"C:\Program Files\Git\bin\git.exe" push origin main
