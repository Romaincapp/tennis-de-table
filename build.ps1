# Script de build pour la production
Write-Host "🔨 Build de production..." -ForegroundColor Green

# Créer le dossier dist s'il n'existe pas
if (-not (Test-Path "dist")) {
    New-Item -ItemType Directory -Path "dist"
}

# Copier les fichiers HTML
Copy-Item "index.html" "dist\"

# Copier et concaténer les CSS
Get-Content "css\*.css" | Set-Content "dist\styles.min.css"

# Copier et concaténer les JS
$jsFiles = @()
$jsFiles += Get-Content "js\*.js"
$jsFiles += Get-Content "js\modules\*.js"
$jsFiles += Get-Content "js\utils\*.js"
$jsFiles | Set-Content "dist\app.min.js"

# Copier les assets
if (Test-Path "assets") {
    Copy-Item "assets" "dist\" -Recurse -Force
}
Copy-Item "manifest.json" "dist\"
if (Test-Path "data") {
    Copy-Item "data" "dist\" -Recurse -Force
}

Write-Host "✅ Build terminé dans le dossier dist/" -ForegroundColor Green
