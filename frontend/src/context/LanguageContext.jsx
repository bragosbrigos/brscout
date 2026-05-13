import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    nav: {
      home: 'Home',
      teams: 'Teams',
      nations: 'Nations',
      search: 'Search',
      edit: 'Edit'
    },
    home: {
      title: 'High-Level Scouting',
      subtitle: 'Complete database of the Brazilian championship. Analyze players by team, nationality or use advanced filters.',
      explore: 'Explore Players',
      viewTeams: 'View by Teams',
      league: 'Brasileirão Série A 2024 - Data not updated',
      stats: {
        players: 'Players',
        clubs: 'Clubs',
        avgRating: 'Avg Rating',
        topScorer: 'Top Scorer',
        topAssists: 'Top Assists',
        goals: 'goals',
        assists: 'assists'
      },
      highlights: 'Round Highlights',
      viewAll: 'View all →'
    },
    teams: {
      title: 'Brasileirão Clubs',
      subtitle: 'Select a team to view the squad',
      addPlayer: 'Add Player',
      squad: 'Squad',
      players: 'players',
      athlete: 'athletes',
      confirmDelete: 'Are you sure you want to remove this player?'
    },
    nations: {
      title: 'Nationalities',
      subtitle: 'Filter players by country of origin',
      all: 'All'
    },
    search: {
      title: 'Advanced Search',
      subtitle: 'Find players using multiple filters',
      searchPlaceholder: 'Search by name...',
      filters: {
        team: 'Team',
        allTeams: 'All Teams',
        position: 'Position',
        allPositions: 'All Positions',
        nation: 'Nation',
        allNations: 'All Nations',
        rating: 'Rating',
        age: 'Age',
        min: 'min',
        max: 'max'
      },
      search: 'Search',
      clear: 'Clear Filters',
      results: 'results',
      noResults: 'No players found with these filters.'
    },
    edit: {
      title: 'Player Management',
      subtitle: 'Add, edit and remove players from the database',
      addPlayer: 'Add Player',
      editPlayer: 'Edit Player',
      deletePlayer: 'Delete Player',
      save: 'Save',
      cancel: 'Cancel',
      confirmDelete: 'Are you sure you want to delete this player?',
      form: {
        name: 'Name',
        team: 'Team',
        position: 'Position',
        nationality: 'Nationality',
        age: 'Age',
        number: 'Number',
        rating: 'Rating',
        goals: 'Goals',
        assists: 'Assists'
      }
    },
    player: {
      details: 'Player Details',
      close: 'Close',
      info: {
        name: 'Name',
        team: 'Team',
        position: 'Position',
        nationality: 'Nationality',
        age: 'Age',
        number: 'Shirt Number',
        rating: 'Rating',
        goals: 'Goals',
        assists: 'Assists'
      }
    },
    common: {
      years: 'years',
      edit: 'Edit',
      delete: 'Delete'
    }
  },
  pt: {
    nav: {
      home: 'Home',
      teams: 'Times',
      nations: 'Nacionalidades',
      search: 'Pesquisar',
      edit: 'Editar'
    },
    home: {
      title: 'Scouting de Alto Nível',
      subtitle: 'Base de dados completa do campeonato brasileiro. Analise jogadores por time, nacionalidade ou utilize filtros avançados.',
      explore: 'Explorar Jogadores',
      viewTeams: 'Ver por Times',
      league: 'Brasileirão Série A 2024 - Dados não atualizados',
      stats: {
        players: 'Jogadores',
        clubs: 'Clubes',
        avgRating: 'Média Rating',
        topScorer: 'Artilheiro',
        topAssists: 'Mais Assist.',
        goals: 'gols',
        assists: 'assist.'
      },
      highlights: 'Destaques da Rodada',
      viewAll: 'Ver todos →'
    },
    teams: {
      title: 'Clubes do Brasileirão',
      subtitle: 'Selecione um time para ver o elenco',
      addPlayer: 'Adicionar Jogador',
      squad: 'Elenco',
      players: 'jogadores',
      athlete: 'atletas',
      confirmDelete: 'Tem certeza que deseja remover este jogador?'
    },
    nations: {
      title: 'Nacionalidades',
      subtitle: 'Filtre jogadores por país de origem',
      all: 'Todos'
    },
    search: {
      title: 'Pesquisa Avançada',
      subtitle: 'Encontre jogadores usando múltiplos filtros',
      searchPlaceholder: 'Buscar por nome...',
      filters: {
        team: 'Time',
        allTeams: 'Todos Times',
        position: 'Posição',
        allPositions: 'Todas Posições',
        nation: 'Nacionalidade',
        allNations: 'Todas Nacionalidades',
        rating: 'Rating',
        age: 'Idade',
        min: 'mín',
        max: 'máx'
      },
      search: 'Pesquisar',
      clear: 'Limpar Filtros',
      results: 'resultados',
      noResults: 'Nenhum jogador encontrado com estes filtros.'
    },
    edit: {
      title: 'Gestão de Jogadores',
      subtitle: 'Adicione, edite e remova jogadores do banco de dados',
      addPlayer: 'Adicionar Jogador',
      editPlayer: 'Editar Jogador',
      deletePlayer: 'Remover Jogador',
      save: 'Salvar',
      cancel: 'Cancelar',
      confirmDelete: 'Tem certeza que deseja remover este jogador?',
      form: {
        name: 'Nome',
        team: 'Time',
        position: 'Posição',
        nationality: 'Nacionalidade',
        age: 'Idade',
        number: 'Camisa',
        rating: 'Rating',
        goals: 'Gols',
        assists: 'Assistências'
      }
    },
    player: {
      details: 'Detalhes do Jogador',
      close: 'Fechar',
      info: {
        name: 'Nome',
        team: 'Time',
        position: 'Posição',
        nationality: 'Nacionalidade',
        age: 'Idade',
        number: 'Camisa',
        rating: 'Rating',
        goals: 'Gols',
        assists: 'Assistências'
      }
    },
    common: {
      years: 'anos',
      edit: 'Editar',
      delete: 'Remover'
    }
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('brscout-language');
    return saved || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('brscout-language', language);
  }, [language]);

  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
