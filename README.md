# 🏓 Tennis Championship Manager

Application web complète pour la gestion de championnats de tennis de table.

## 🚀 Démarrage rapide

### Installation locale
```bash
# Cloner le repository
git clone https://github.com/[username]/tennis-championship.git
cd tennis-championship

# Lancer un serveur local (Python)
python -m http.server 8000
# ou avec Node.js
npx http-server -p 8000

# Ouvrir dans le navigateur
open http://localhost:8000
```

### Déploiement sur GitHub Pages
```bash
# Créer une branche gh-pages
git checkout -b gh-pages

# Pousser sur GitHub
git push origin gh-pages

# L'app sera disponible sur : https://[username].github.io/tennis-championship
```

## 📋 Fonctionnalités

### Gestion des joueurs
- ✅ Inscription/modification/suppression
- ✅ Import/export CSV/JSON
- ✅ Profils avec statistiques détaillées
- ✅ Système de remplaçants

### Gestion des divisions
- ✅ 3 divisions configurables
- ✅ Répartition automatique ou manuelle
- ✅ Transferts entre divisions

### Planification des matchs
- ✅ Génération automatique par date
- ✅ Limite de 4 matchs/joueur/jour
- ✅ Format 2 sets gagnants jusqu'à 11 points
- ✅ Gestion des absences et reports

### Saisie des résultats
- ✅ Interface rapide (format "11-7, 11-9")
- ✅ Validation automatique des scores
- ✅ Historique complet avec détails des sets
- ✅ Corrections possibles

### Classements et statistiques
- ✅ Classements par division et par date
- ✅ Statistiques individuelles détaillées
- ✅ Évolution dans le temps
- ✅ Export PDF

## 🛠️ Technologies utilisées

- HTML5 / CSS3 / JavaScript ES6+
- LocalStorage pour la persistance
- Service Worker (PWA)
- Pas de dépendances externes

## 📱 Progressive Web App

L'application peut être installée sur mobile/desktop et fonctionne hors ligne.

## 🔧 Configuration

Modifier le fichier `js/config.js` pour personnaliser :
- Nombre de divisions
- Format des matchs
- Limites de matchs par jour
- Thème et couleurs

## 📊 Structure des données

Les données sont stockées dans localStorage avec backup automatique toutes les 5 minutes.

## 🤝 Contribution

Les contributions sont les bienvenues ! Voir [CONTRIBUTING.md](docs/CONTRIBUTING.md)

## 📄 Licence

MIT License - voir [LICENSE](LICENSE)
