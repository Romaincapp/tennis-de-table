# Script de démarrage du serveur de développement pour Windows
Write-Host "🚀 Démarrage du serveur de développement..." -ForegroundColor Green
Write-Host "📍 L'application sera disponible sur http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Choisissez votre serveur :" -ForegroundColor Yellow
Write-Host "1) Python (recommandé)"
Write-Host "2) Node.js (http-server)"
Write-Host "3) PHP"
Write-Host ""

$choice = Read-Host "Votre choix (1-3)"

switch ($choice) {
    "1" {
        Write-Host "Démarrage avec Python..." -ForegroundColor Green
        python -m http.server 8000
    }
    "2" {
        Write-Host "Démarrage avec Node.js..." -ForegroundColor Green
        npx http-server -p 8000 -c-1
    }
    "3" {
        Write-Host "Démarrage avec PHP..." -ForegroundColor Green
        php -S localhost:8000
    }
    default {
        Write-Host "Choix invalide" -ForegroundColor Red
        exit 1
    }
}
