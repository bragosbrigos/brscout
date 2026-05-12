import PlayerCard from './PlayerCard'

function SearchPage({ 
  filteredPlayers, 
  searchTerm, 
  setSearchTerm, 
  selectedTeam, 
  setSelectedTeam, 
  selectedPosition, 
  setSelectedPosition, 
  selectedNation, 
  setSelectedNation, 
  teams, 
  positions, 
  nations, 
  darkMode,
  onEditPlayer,
  onDeletePlayer 
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Pesquisa Avançada</h2>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg mb-6`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="">Todos os Times</option>
            {teams.map(team => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="">Todas as Posições</option>
            {positions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <select
            value={selectedNation}
            onChange={(e) => setSelectedNation(e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="">Todas as Nacionalidades</option>
            {nations.map(nation => (
              <option key={nation} value={nation}>{nation}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            darkMode={darkMode}
            onEdit={onEditPlayer}
            onDelete={onDeletePlayer}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchPage
