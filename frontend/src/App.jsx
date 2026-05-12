import { useState, useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import TeamsPage from './components/TeamsPage'
import NationsPage from './components/NationsPage'
import SearchPage from './components/SearchPage'
import PlayerModal from './components/PlayerModal'
import { fetchPlayers, deletePlayer, savePlayer } from './utils/api'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [players, setPlayers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedNation, setSelectedNation] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    teamName: '',
    number: '',
    nation: '',
    position: '',
    age: ''
  })

  useEffect(() => {
    loadPlayers()
  }, [])

  const loadPlayers = async () => {
    try {
      const data = await fetchPlayers()
      setPlayers(data)
    } catch (error) {
      console.error('Error fetching players:', error)
    }
  }

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTeam = selectedTeam === '' || player.teamName.toLowerCase().includes(selectedTeam.toLowerCase())
    const matchesPosition = selectedPosition === '' || player.position.toLowerCase().includes(selectedPosition.toLowerCase())
    const matchesNation = selectedNation === '' || player.nation.toLowerCase().includes(selectedNation.toLowerCase())
    return matchesSearch && matchesTeam && matchesPosition && matchesNation
  })

  const teams = [...new Set(players.map(p => p.teamName))].filter(Boolean).sort()
  const positions = [...new Set(players.map(p => p.position))].filter(Boolean).sort()
  const nations = [...new Set(players.map(p => p.nation))].filter(Boolean).sort()

  const handleAddPlayer = () => {
    setEditingPlayer(null)
    setFormData({
      name: '',
      teamName: '',
      number: '',
      nation: '',
      position: '',
      age: ''
    })
    setShowModal(true)
  }

  const handleEditPlayer = (player) => {
    setEditingPlayer(player)
    setFormData({
      name: player.name,
      teamName: player.teamName,
      number: player.number,
      nation: player.nation,
      position: player.position,
      age: player.age || ''
    })
    setShowModal(true)
  }

  const handleDeletePlayer = async (id) => {
    try {
      await deletePlayer(id)
      loadPlayers()
    } catch (error) {
      console.error('Error deleting player:', error)
    }
  }

  const handleSubmit = async (data) => {
    try {
      await savePlayer(data, editingPlayer)
      setShowModal(false)
      loadPlayers()
    } catch (error) {
      console.error('Error saving player:', error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <HomePage 
            players={filteredPlayers}
            darkMode={darkMode}
            onAddPlayer={handleAddPlayer}
            onEditPlayer={handleEditPlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        )}

        {currentPage === 'teams' && (
          <TeamsPage 
            teams={teams}
            players={players}
            darkMode={darkMode}
          />
        )}

        {currentPage === 'nations' && (
          <NationsPage 
            nations={nations}
            players={players}
            darkMode={darkMode}
          />
        )}

        {currentPage === 'search' && (
          <SearchPage 
            filteredPlayers={filteredPlayers}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
            selectedNation={selectedNation}
            setSelectedNation={setSelectedNation}
            teams={teams}
            positions={positions}
            nations={nations}
            darkMode={darkMode}
            onEditPlayer={handleEditPlayer}
            onDeletePlayer={handleDeletePlayer}
          />
        )}
      </main>

      <PlayerModal 
        showModal={showModal}
        editingPlayer={editingPlayer}
        formData={formData}
        setFormData={setFormData}
        darkMode={darkMode}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default App
