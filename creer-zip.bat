@echo off
echo Creation du ZIP RoadLearn...
powershell -command "Compress-Archive -Path 'C:\Users\kylec\OneDrive\Documents\rl\roadlearn-pwa\*' -DestinationPath 'C:\Users\kylec\OneDrive\Documents\rl\roadlearn-pwa.zip' -Force"
if %ERRORLEVEL% == 0 (
  echo.
  echo ZIP cree avec succes : roadlearn-pwa.zip
  echo Vous pouvez maintenant le deposer sur netlify.com/drop
) else (
  echo Erreur lors de la creation du ZIP.
)
pause
