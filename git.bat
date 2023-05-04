@echo off
FOR /F "tokens=1-3 delims=:." %%A IN ("%TIME%") DO (
    SET HOUR=%%A
    SET MINUTE=%%B
    SET SECOND=%%C
)

"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -am 'funtsu%HOUR%%MINUTE%%SECOND%'
"C:\Program Files\Git\bin\git.exe" push origin main
