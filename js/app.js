// Application principale - Tennis Championship Manager

// Import de la configuration
import CONFIG from './config.js';

class TennisChampionshipApp {
    constructor() {
        this.currentPage = 'welcome';
        this.init();
    }

    init() {
        console.log('🏓 Tennis Championship Manager v' + CONFIG.version);
        console.log('Initialisation de l\'application...');
        
        this.setupEventListeners();
        this.loadInitialData();
        this.showPage('welcome');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.target.dataset.page;
                this.showPage(page);
            });
        });

        // Actions rapides
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleAction(action);
            });
        });

        // Gestion des joueurs
        const addPlayerBtn = document.getElementById('add-player');
        if (addPlayerBtn) {
            addPlayerBtn.addEventListener('click', () => {
                this.showAddPlayerModal();
            });
        }
    }

    showPage(pageId) {
        // Masquer toutes les pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Désactiver tous les boutons de navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Afficher la page demandée
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Activer le bouton de navigation correspondant
        const navBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (navBtn) {
            navBtn.classList.add('active');
        }

        // Charger les données spécifiques à la page
        this.loadPageData(pageId);
    }

    loadPageData(pageId) {
        switch(pageId) {
            case 'players':
                this.loadPlayersData();
                break;
            case 'divisions':
                this.loadDivisionsData();
                break;
            case 'matches':
                this.loadMatchesData();
                break;
            case 'results':
                this.loadResultsData();
                break;
            case 'rankings':
                this.loadRankingsData();
                break;
            case 'stats':
                this.loadStatsData();
                break;
        }
    }

    handleAction(action) {
        switch(action) {
            case 'setup':
                this.startSetup();
                break;
            case 'demo':
                this.loadDemoData();
                break;
            default:
                console.log('Action non reconnue:', action);
        }
    }

    startSetup() {
        alert('🚀 Configuration initiale - Fonctionnalité en cours de développement');
        // TODO: Implémenter l'assistant de configuration
    }

    loadDemoData() {
        console.log('📊 Chargement des données d\'exemple...');
        
        // Charger les données d'exemple depuis le fichier JSON
        fetch('data/sample-data.json')
            .then(response => response.json())
            .then(data => {
                // Stocker les données dans localStorage
                localStorage.setItem('tt-championship-players', JSON.stringify(data.players));
                localStorage.setItem('tt-championship-matches', JSON.stringify(data.matches));
                localStorage.setItem('tt-championship-results', JSON.stringify(data.results));
                localStorage.setItem('tt-championship-settings', JSON.stringify(data.settings));
                
                this.showNotification('✅ Données d\'exemple chargées avec succès!', 'success');
                
                // Rediriger vers la page des joueurs
                setTimeout(() => {
                    this.showPage('players');
                }, 1000);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données d\'exemple:', error);
                this.showNotification('❌ Erreur lors du chargement des données', 'error');
            });
    }

    loadInitialData() {
        // Vérifier s'il y a des données existantes
        const players = this.getStoredData('players');
        const settings = this.getStoredData('settings');
        
        if (players && players.length > 0) {
            console.log(`📊 ${players.length} joueur(s) trouvé(s) en mémoire`);
        }
        
        if (settings) {
            console.log('⚙️ Configuration trouvée en mémoire');
        }
    }

    getStoredData(key) {
        try {
            const data = localStorage.getItem(`tt-championship-${key}`);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Erreur lors de la lecture des données ${key}:`, error);
            return null;
        }
    }

    setStoredData(key, data) {
        try {
            localStorage.setItem(`tt-championship-${key}`, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Erreur lors de la sauvegarde des données ${key}:`, error);
            return false;
        }
    }

    loadPlayersData() {
        console.log('📋 Chargement des joueurs...');
        const players = this.getStoredData('players') || [];
        const playersList = document.getElementById('players-list');
        
        if (players.length === 0) {
            playersList.innerHTML = '<p class="empty-state">Aucun joueur inscrit. Commencez par ajouter des joueurs !</p>';
        } else {
            playersList.innerHTML = this.renderPlayersList(players);
        }
    }

    renderPlayersList(players) {
        return `
            <div class="players-grid">
                ${players.map(player => `
                    <div class="player-card">
                        <h4>${player.name}</h4>
                        <p>Niveau: ${player.level}</p>
                        <p>Division: ${player.division}</p>
                        <p>Email: ${player.email || 'Non renseigné'}</p>
                        <div class="player-actions">
                            <button class="btn btn-secondary btn-sm" onclick="app.editPlayer('${player.id}')">✏️ Modifier</button>
                            <button class="btn btn-error btn-sm" onclick="app.deletePlayer('${player.id}')">🗑️ Supprimer</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    loadDivisionsData() {
        console.log('🏆 Chargement des divisions...');
        const players = this.getStoredData('players') || [];
        
        // Grouper les joueurs par division
        const divisions = {
            elite: players.filter(p => p.division === 'elite'),
            honneur: players.filter(p => p.division === 'honneur'),
            promotion: players.filter(p => p.division === 'promotion')
        };

        // Mettre à jour chaque division
        Object.keys(divisions).forEach(divisionId => {
            const divisionElement = document.querySelector(`.division[data-division="${divisionId}"] .division-players`);
            if (divisionElement) {
                if (divisions[divisionId].length === 0) {
                    divisionElement.innerHTML = '<p class="empty-state">Aucun joueur dans cette division</p>';
                } else {
                    divisionElement.innerHTML = divisions[divisionId]
                        .map(player => `<div class="division-player">${player.name} (${player.level})</div>`)
                        .join('');
                }
            }
        });
    }

    loadMatchesData() {
        console.log('🏓 Chargement des matchs...');
        // TODO: Implémenter le chargement des matchs
    }

    loadResultsData() {
        console.log('📊 Chargement des résultats...');
        // TODO: Implémenter le chargement des résultats
    }

    loadRankingsData() {
        console.log('🏆 Chargement des classements...');
        // TODO: Implémenter le chargement des classements
    }

    loadStatsData() {
        console.log('📈 Chargement des statistiques...');
        // TODO: Implémenter le chargement des statistiques
    }

    showAddPlayerModal() {
        // TODO: Implémenter le modal d'ajout de joueur
        alert('➕ Ajout de joueur - Fonctionnalité en cours de développement');
    }

    editPlayer(playerId) {
        // TODO: Implémenter l'édition de joueur
        alert(`✏️ Modification du joueur ${playerId} - Fonctionnalité en cours de développement`);
    }

    deletePlayer(playerId) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
            const players = this.getStoredData('players') || [];
            const updatedPlayers = players.filter(p => p.id !== playerId);
            this.setStoredData('players', updatedPlayers);
            this.loadPlayersData();
            this.showNotification('✅ Joueur supprimé avec succès!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Ajouter les styles inline pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Styles pour les animations des notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .players-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1rem;
    }
    .player-card {
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
    }
    .player-card h4 {
        margin-bottom: 0.5rem;
        color: #1976d2;
    }
    .player-card p {
        margin-bottom: 0.25rem;
        font-size: 0.9rem;
    }
    .player-actions {
        margin-top: 1rem;
        display: flex;
        gap: 0.5rem;
    }
    .btn-sm {
        padding: 0.5rem 0.75rem;
        font-size: 0.8rem;
    }
    .division-player {
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        background: #f5f5f5;
        border-radius: 4px;
        border-left: 3px solid #1976d2;
    }
`;
document.head.appendChild(notificationStyles);

// Initialiser l'application
const app = new TennisChampionshipApp();

// Exposer l'app globalement pour les événements inline
window.app = app;

console.log('🏓 Application Tennis Championship Manager initialisée!');
