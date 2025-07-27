# Script de déploiement sur GitHub Pages
Write-Host "🚀 Déploiement sur GitHub Pages..." -ForegroundColor Green

# Build de production
& .\build.ps1

# Créer une branche gh-pages si elle n'existe pas
git checkout -b gh-pages 2>$null
if ($LASTEXITCODE -ne 0) {
    git checkout gh-pages
}

# Copier les fichiers de dist vers la racine
Copy-Item "dist\*" . -Recurse -Force

# Commit et push
git add .
$date = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Deploy to GitHub Pages - $date"
git push origin gh-pages

# Retour sur main
git checkout main

Write-Host "✅ Déploiement terminé !" -ForegroundColor Green
Write-Host "🌐 Votre app sera disponible dans quelques minutes sur :" -ForegroundColor Cyan
Write-Host "   https://[votre-username].github.io/tennis-championship" -ForegroundColor Yellow
