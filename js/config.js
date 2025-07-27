// Configuration globale de l'application
const CONFIG = {
  // Paramètres du championnat
  championship: {
    name: 'Championnat Tennis de Table 2025',
    dates: 4, // Nombre de dates
    divisions: [
      { id: 'elite', name: 'Division Élite', color: '#FFD700' },
      { id: 'honneur', name: 'Division Honneur', color: '#C0C0C0' },
      { id: 'promotion', name: 'Division Promotion', color: '#CD7F32' }
    ],
    maxMatchesPerDay: 4,
    matchFormat: {
      setsToWin: 2,
      pointsPerSet: 11,
      minDifference: 2
    }
  },

  // Paramètres de stockage
  storage: {
    prefix: 'tt-championship-',
    backupInterval: 300000, // 5 minutes
    maxBackups: 10
  },

  // Paramètres UI
  ui: {
    theme: 'light', // 'light' ou 'dark'
    language: 'fr',
    dateFormat: 'DD/MM/YYYY',
    animations: true
  },

  // Paramètres d'export
  export: {
    pdfOptions: {
      orientation: 'portrait',
      format: 'A4',
      margin: 10
    }
  },

  // Version de l'application
  version: '1.0.0'
};

export default CONFIG;
