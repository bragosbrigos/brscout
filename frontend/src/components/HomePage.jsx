import PlayerCard from './PlayerCard'

function HomePage({ players, darkMode, onAddPlayer, onEditPlayer, onDeletePlayer }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Todos os Jogadores</h2>
        <button
          onClick={onAddPlayer}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
        >
          + Adicionar Jogador
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map(player => (
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

export default HomePage
