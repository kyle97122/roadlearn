@echo off
echo Lancement de RoadLearn sur http://localhost:3000
echo Appuie sur Ctrl+C pour arreter le serveur.
echo.
start "" "http://localhost:3000"
npx serve -l 3000 .
pause
