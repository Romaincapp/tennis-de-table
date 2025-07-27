# Guide Utilisateur - Tennis Championship Manager

## Table des matières
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Configuration initiale](#configuration-initiale)
4. [Gestion des joueurs](#gestion-des-joueurs)
5. [Organisation des divisions](#organisation-des-divisions)
6. [Planification des matchs](#planification-des-matchs)
7. [Saisie des résultats](#saisie-des-résultats)
8. [Consultation des classements](#consultation-des-classements)
9. [Export et impression](#export-et-impression)
10. [Dépannage](#dépannage)

## Introduction

Tennis Championship Manager est une application web complète pour organiser et gérer des championnats de tennis de table. Elle permet de :
- Gérer les inscriptions des joueurs
- Organiser les divisions
- Planifier automatiquement les matchs
- Saisir et valider les résultats
- Générer les classements en temps réel
- Exporter les données

## Installation

### Option 1 : Utilisation en ligne
Accédez directement à l'application via votre navigateur web.

### Option 2 : Installation locale
1. Téléchargez les fichiers du projet
2. Ouvrez un terminal dans le dossier du projet
3. Lancez un serveur local :
   ```bash
   python -m http.server 8000
   ```
4. Ouvrez votre navigateur sur `http://localhost:8000`

### Option 3 : Installation PWA
1. Ouvrez l'application dans votre navigateur
2. Cliquez sur l'icône d'installation (dans la barre d'adresse)
3. L'application sera installée comme une app native

## Configuration initiale

### Premier lancement
1. Définissez le nom du championnat
2. Configurez le nombre de divisions
3. Définissez les dates du championnat
4. Ajustez les paramètres de match si nécessaire

### Paramètres avancés
- Format des matchs (nombre de sets, points par set)
- Nombre maximum de matchs par joueur et par date
- Couleurs des divisions
- Options d'export

## Gestion des joueurs

### Inscription d'un joueur
1. Cliquez sur "Gestion des joueurs"
2. Cliquez sur "Nouveau joueur"
3. Remplissez les informations :
   - Nom complet
   - Email (optionnel)
   - Téléphone (optionnel)
   - Niveau estimé
4. Validez l'inscription

### Import en masse
1. Préparez un fichier CSV avec les colonnes : nom, email, téléphone, niveau
2. Cliquez sur "Importer des joueurs"
3. Sélectionnez votre fichier CSV
4. Vérifiez les données importées
5. Validez l'import

### Modification d'un joueur
1. Trouvez le joueur dans la liste
2. Cliquez sur l'icône de modification
3. Modifiez les informations
4. Sauvegardez les changements

## Organisation des divisions

### Répartition automatique
1. Allez dans "Gestion des divisions"
2. Cliquez sur "Répartition automatique"
3. Les joueurs sont répartis selon leur niveau

### Répartition manuelle
1. Glissez-déposez les joueurs entre les divisions
2. Équilibrez les effectifs
3. Sauvegardez la répartition

### Transferts en cours de championnat
- Possibilité de changer un joueur de division
- Historique des transferts conservé

## Planification des matchs

### Génération automatique
1. Sélectionnez une date
2. Cliquez sur "Générer les matchs"
3. L'algorithme crée les confrontations optimales
4. Validation automatique des contraintes

### Contraintes respectées
- Maximum 4 matchs par joueur et par date
- Éviter les répétitions de confrontations
- Équilibrage du nombre de matchs

### Gestion des absences
1. Marquez un joueur comme absent
2. Ses matchs sont automatiquement reportés
3. Possibilité de trouver un remplaçant

## Saisie des résultats

### Format des scores
- Saisissez les scores au format "11-7, 11-9" ou "11-9, 8-11, 11-6"
- Validation automatique des scores
- Détection des erreurs de saisie

### Interface rapide
1. Sélectionnez le match à renseigner
2. Saisissez le résultat
3. Validation immédiate
4. Mise à jour automatique des classements

### Corrections
- Possibilité de modifier un résultat déjà saisi
- Historique des modifications conservé
- Recalcul automatique des classements

## Consultation des classements

### Classements par division
- Tri par nombre de victoires, puis différence de sets
- Mise à jour en temps réel
- Historique par date

### Statistiques individuelles
- Nombre de matchs joués/gagnés/perdus
- Ratio de sets gagnés/perdus
- Évolution du classement

### Filtres et tri
- Par division
- Par date
- Par joueur

## Export et impression

### Export PDF
1. Sélectionnez les données à exporter
2. Choisissez le format (classements, statistiques, etc.)
3. Générez le PDF
4. Téléchargez ou imprimez

### Export CSV/JSON
- Export des données pour analyse externe
- Compatible avec Excel et autres outils

### Impression optimisée
- CSS dédié pour l'impression
- Mise en page adaptée
- Économie d'encre

## Dépannage

### Problèmes courants

**L'application ne se charge pas**
- Vérifiez votre connexion internet
- Videz le cache du navigateur
- Essayez en navigation privée

**Les données ont disparu**
- Vérifiez que localStorage est activé
- Importez une sauvegarde récente
- Contactez le support

**Problème de performance**
- Fermez les autres onglets
- Redémarrez le navigateur
- Vérifiez les ressources système

### Sauvegarde et restauration

**Sauvegarde automatique**
- Sauvegarde automatique toutes les 5 minutes
- Stockage local sécurisé
- Historique des 10 dernières sauvegardes

**Sauvegarde manuelle**
1. Allez dans "Paramètres"
2. Cliquez sur "Exporter les données"
3. Sauvegardez le fichier généré

**Restauration**
1. Allez dans "Paramètres"
2. Cliquez sur "Importer les données"
3. Sélectionnez votre fichier de sauvegarde

### Support technique

Pour toute question ou problème :
- Consultez la FAQ en ligne
- Contactez l'équipe de développement
- Signalez les bugs sur GitHub
