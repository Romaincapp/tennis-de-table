# API Documentation - Tennis Championship Manager

## Table des matières
1. [Introduction](#introduction)
2. [Architecture](#architecture)
3. [Modules principaux](#modules-principaux)
4. [API LocalStorage](#api-localstorage)
5. [Événements](#événements)
6. [Configuration](#configuration)

## Introduction

Cette documentation décrit l'API interne de Tennis Championship Manager. L'application utilise une architecture modulaire basée sur ES6 modules.

## Architecture

```
js/
├── app.js              // Point d'entrée principal
├── config.js           // Configuration globale
├── sw.js              // Service Worker
├── modules/           // Modules métier
│   ├── players.js     // Gestion des joueurs
│   ├── divisions.js   // Gestion des divisions
│   ├── matches.js     // Gestion des matchs
│   ├── results.js     // Gestion des résultats
│   ├── rankings.js    // Calcul des classements
│   ├── statistics.js  // Statistiques
│   ├── backup.js      // Sauvegarde
│   ├── export.js      // Export de données
│   ├── ui.js          // Interface utilisateur
│   └── notifications.js // Notifications
└── utils/             // Utilitaires
    ├── helpers.js     // Fonctions utilitaires
    ├── validators.js  // Validation des données
    ├── storage.js     // Gestion du stockage
    ├── pdf-generator.js // Génération PDF
    └── qr-generator.js  // Génération QR codes
```

## Modules principaux

### Players Module (`modules/players.js`)

#### `Player` Class
```javascript
class Player {
  constructor(data) {
    this.id = data.id || generateId();
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.level = data.level;
    this.division = data.division;
    this.registrationDate = data.registrationDate || new Date();
    this.status = data.status || 'active';
  }
}
```

#### Methods
- `getAllPlayers()` - Récupère tous les joueurs
- `getPlayerById(id)` - Récupère un joueur par ID
- `addPlayer(playerData)` - Ajoute un nouveau joueur
- `updatePlayer(id, data)` - Met à jour un joueur
- `deletePlayer(id)` - Supprime un joueur
- `getPlayersByDivision(division)` - Récupère les joueurs d'une division
- `importPlayers(csvData)` - Import en masse depuis CSV

### Divisions Module (`modules/divisions.js`)

#### Methods
- `getDivisions()` - Récupère la configuration des divisions
- `redistributePlayers()` - Redistribution automatique
- `movePlayerToDivision(playerId, newDivision)` - Transfert de joueur
- `getDivisionStats(division)` - Statistiques d'une division

### Matches Module (`modules/matches.js`)

#### `Match` Class
```javascript
class Match {
  constructor(data) {
    this.id = data.id || generateId();
    this.date = data.date;
    this.division = data.division;
    this.player1 = data.player1;
    this.player2 = data.player2;
    this.status = data.status || 'scheduled'; // scheduled, completed, cancelled
    this.result = data.result || null;
  }
}
```

#### Methods
- `generateMatches(date, division)` - Génère les matchs pour une date
- `getMatchesByDate(date)` - Récupère les matchs d'une date
- `getMatchesByPlayer(playerId)` - Récupère les matchs d'un joueur
- `updateMatchStatus(matchId, status)` - Met à jour le statut d'un match

### Results Module (`modules/results.js`)

#### `Result` Class
```javascript
class Result {
  constructor(data) {
    this.matchId = data.matchId;
    this.winner = data.winner;
    this.loser = data.loser;
    this.sets = data.sets; // Array of set scores
    this.timestamp = data.timestamp || new Date();
  }
}
```

#### Methods
- `addResult(matchId, resultData)` - Ajoute un résultat
- `updateResult(matchId, resultData)` - Met à jour un résultat
- `validateScore(score)` - Valide un score de set
- `getResultsByPlayer(playerId)` - Récupère les résultats d'un joueur

### Rankings Module (`modules/rankings.js`)

#### Methods
- `calculateRankings(division, date)` - Calcule le classement
- `getRankingHistory(playerId)` - Historique d'un joueur
- `getTopPlayers(division, count)` - Top joueurs d'une division

### Statistics Module (`modules/statistics.js`)

#### Methods
- `getPlayerStats(playerId)` - Statistiques d'un joueur
- `getDivisionStats(division)` - Statistiques d'une division
- `getGlobalStats()` - Statistiques globales
- `getMatchStats(matchId)` - Statistiques d'un match

## API LocalStorage

### Storage Keys
```javascript
const STORAGE_KEYS = {
  PLAYERS: 'tt-championship-players',
  MATCHES: 'tt-championship-matches',
  RESULTS: 'tt-championship-results',
  SETTINGS: 'tt-championship-settings',
  BACKUPS: 'tt-championship-backups'
};
```

### Storage Utils (`utils/storage.js`)

#### Methods
- `save(key, data)` - Sauvegarde des données
- `load(key)` - Chargement des données
- `remove(key)` - Suppression des données
- `clear()` - Effacement complet
- `getStorageSize()` - Taille utilisée
- `backup()` - Création d'une sauvegarde
- `restore(backupData)` - Restauration

## Événements

### Custom Events

L'application utilise un système d'événements personnalisés :

```javascript
// Événements joueurs
document.dispatchEvent(new CustomEvent('playerAdded', { detail: player }));
document.dispatchEvent(new CustomEvent('playerUpdated', { detail: player }));
document.dispatchEvent(new CustomEvent('playerDeleted', { detail: playerId }));

// Événements matchs
document.dispatchEvent(new CustomEvent('matchScheduled', { detail: match }));
document.dispatchEvent(new CustomEvent('resultAdded', { detail: result }));

// Événements UI
document.dispatchEvent(new CustomEvent('rankingsUpdated', { detail: rankings }));
```

### Event Listeners

```javascript
// Écoute des événements
document.addEventListener('playerAdded', (event) => {
  const player = event.detail;
  // Traitement...
});
```

## Configuration

### CONFIG Object (`config.js`)

```javascript
const CONFIG = {
  championship: {
    name: String,
    dates: Number,
    divisions: Array,
    maxMatchesPerDay: Number,
    matchFormat: {
      setsToWin: Number,
      pointsPerSet: Number,
      minDifference: Number
    }
  },
  storage: {
    prefix: String,
    backupInterval: Number,
    maxBackups: Number
  },
  ui: {
    theme: String,
    language: String,
    dateFormat: String,
    animations: Boolean
  }
};
```

### Methods
- `getConfig(key)` - Récupère une valeur de config
- `setConfig(key, value)` - Définit une valeur de config
- `resetConfig()` - Remet la config par défaut

## Exemples d'utilisation

### Ajouter un joueur
```javascript
import { addPlayer } from './modules/players.js';

const newPlayer = {
  name: 'Jean Dupont',
  email: 'jean.dupont@email.com',
  level: 1400,
  division: 'honneur'
};

addPlayer(newPlayer);
```

### Générer des matchs
```javascript
import { generateMatches } from './modules/matches.js';

const matches = generateMatches('2025-02-01', 'elite');
console.log(`${matches.length} matchs générés`);
```

### Ajouter un résultat
```javascript
import { addResult } from './modules/results.js';

const result = {
  matchId: 'match-123',
  winner: 'player-1',
  loser: 'player-2',
  sets: [
    { player1: 11, player2: 7 },
    { player1: 11, player2: 9 }
  ]
};

addResult(result.matchId, result);
```

## Tests

### Structure des tests
```
tests/
├── unit/
│   ├── players.test.js
│   ├── matches.test.js
│   └── results.test.js
├── integration/
│   └── full-workflow.test.js
└── e2e/
    └── user-scenarios.test.js
```

### Commandes de test
```bash
# Tests unitaires
npm test

# Tests avec couverture
npm run test:coverage

# Tests E2E
npm run test:e2e
```
