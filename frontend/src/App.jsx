import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import HomeSection from './components/HomeSection';
import TeamsSection from './components/TeamsSection';
import NationsSection from './components/NationsSection';
import SearchSection from './components/SearchSection';
import EditSection from './components/EditSection';
import Footer from './components/Footer';
import PlayerModal from './components/PlayerModal';
import { api } from './utils/api';

function AppContent() {
  const { language, t, toggleLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState('home');
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Carregar jogadores do backend
  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getPlayers();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar jogadores:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm(t.edit.confirmDelete)) return;
    try {
      await api.deletePlayer(id);
      setPlayers(players.filter(p => p.id !== id));
      if (selectedPlayer && selectedPlayer.id === id) {
        setSelectedPlayer(null);
      }
    } catch (err) {
      alert('Erro ao remover jogador: ' + err.message);
    }
  };

  const handleSavePlayer = async (playerData) => {
    try {
      if (editingPlayer) {
        const updated = await api.updatePlayer(editingPlayer.id, playerData);
        setPlayers(players.map(p => p.id === updated.id ? updated : p));
        if (selectedPlayer && selectedPlayer.id === updated.id) {
          setSelectedPlayer(updated);
        }
      } else {
        const created = await api.addPlayer(playerData);
        setPlayers([...players, created]);
      }
      setShowEditModal(false);
      setEditingPlayer(null);
    } catch (err) {
      alert('Erro ao salvar jogador: ' + err.message);
    }
  };

  const handleEditClick = (player) => {
    setEditingPlayer(player);
    setShowEditModal(true);
  };

  const openPlayerModal = (player) => {
    setSelectedPlayer(player);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-br-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <i className="fa-solid fa-triangle-exclamation text-5xl text-red-500 mb-4"></i>
          <p className="text-xl mb-4">Erro ao carregar dados</p>
          <button onClick={loadPlayers} className="px-6 py-3 bg-br-green rounded-xl font-semibold">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-br-dark transition-colors">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        language={language}
        t={t}
        toggleLanguage={toggleLanguage}
      />
      
      {currentPage === 'home' && (
        <HomeSection 
          players={players} 
          setCurrentPage={setCurrentPage}
          t={t}
          onPlayerClick={openPlayerModal}
        />
      )}
      
      {currentPage === 'times' && (
        <TeamsSection 
          players={players} 
          setPlayers={setPlayers}
          t={t}
          onPlayerClick={openPlayerModal}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeletePlayer}
        />
      )}
      
      {currentPage === 'nacoes' && (
        <NationsSection 
          players={players}
          t={t}
          onPlayerClick={openPlayerModal}
        />
      )}
      
      {currentPage === 'pesquisa' && (
        <SearchSection 
          players={players}
          t={t}
          onPlayerClick={openPlayerModal}
        />
      )}
      
      {currentPage === 'editar' && (
        <EditSection
          players={players}
          setPlayers={setPlayers}
          t={t}
          onPlayerClick={openPlayerModal}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeletePlayer}
          onAddClick={() => { setEditingPlayer(null); setShowEditModal(true); }}
        />
      )}

      <Footer t={t} />

      {/* Modal de Detalhes do Jogador */}
      {selectedPlayer && (
        <PlayerModal 
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onEdit={handleEditClick}
          onDelete={handleDeletePlayer}
          t={t}
        />
      )}

      {/* Modal de Edição/Criação */}
      {showEditModal && (
        <EditSection
          players={players}
          setPlayers={setPlayers}
          t={t}
          editingPlayer={editingPlayer}
          onSave={handleSavePlayer}
          onCancel={() => { setShowEditModal(false); setEditingPlayer(null); }}
          isModalOnly={true}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
